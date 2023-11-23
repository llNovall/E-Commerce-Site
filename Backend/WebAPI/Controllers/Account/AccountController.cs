using AutoMapper;
using Domain.Entities.Account;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebAPI.DataTransferObjects.Account;
using WebAPI.Utils.Configs;
using WebAPI.Utils.Extensions;

namespace WebAPI.Controllers.Account
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;
        private readonly JwtSetting _jwtKeySetting;

        private readonly ILogger<AccountController> _logger;

        public AccountController(UserManager<AppUser> userManager, IMapper mapper, IOptions<JwtSetting> options, ILogger<AccountController> logger)
        {
            _userManager = userManager;
            _mapper = mapper;
            _jwtKeySetting = options.Value;
            _logger = logger;
        }

        /// <summary>
        /// Registers user with provided data.
        /// </summary>
        /// <param name="requestDTO"></param>
        /// <returns></returns>
        [HttpPost("Register")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> RegisterUser([FromBody] RegistrationRequestDTO requestDTO)
        {
            _logger.LogInformation("Attempting to register user.");

            if (!ModelState.IsValid || string.IsNullOrEmpty(requestDTO.Password))
            {
                _logger.LogInformation("Failed to register user.");
                return BadRequest(ModelState.GetModalErrors());
            }

            AppUser? user = _mapper.Map<AppUser>(requestDTO);

            IdentityResult result = await _userManager.CreateAsync(user, requestDTO.Password);

            if (!result.Succeeded)
            {
                _logger.LogInformation("Failed to register user.");
                return BadRequest(result.Errors.Select(c => c.Description));
            }

            var r = await _userManager.AddClaimAsync(user, new Claim(ClaimTypes.Role, "member"));

            _logger.LogInformation("Successfully registered user.");
            return StatusCode(StatusCodes.Status201Created);
        }

        [HttpPost("Login")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(LoginResponseDTO))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> LoginUser([FromBody] LoginRequestDTO requestDTO)
        {
            _logger.LogInformation("Attempting to log in user.");

            if (requestDTO == null || !ModelState.IsValid || requestDTO?.Username == null || requestDTO?.Password == null)
            {
                return BadRequest();
            }

            AppUser? appUser = await _userManager.FindByNameAsync(requestDTO.Username);

            if (appUser == null)
            {
                _logger.LogInformation("Failed to log in user.");
                return BadRequest();
            }

            bool isLoginSuccessful = await _userManager.CheckPasswordAsync(appUser, requestDTO.Password);

            if (!isLoginSuccessful)
            {
                _logger.LogInformation("Failed to log in user.");
                return BadRequest();
            }

            if (_jwtKeySetting.Key == null)
            {
                _logger.LogInformation("Failed to log in user.");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            SymmetricSecurityKey secretKey = new(Encoding.UTF8.GetBytes(_jwtKeySetting.Key));

            SigningCredentials signingCredentials = new(secretKey, SecurityAlgorithms.HmacSha256);

            IList<Claim> claims = await _userManager.GetClaimsAsync(appUser);

            JwtSecurityToken token = new(
                issuer: _jwtKeySetting.Issuer,
                audience: _jwtKeySetting.Audience,
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: signingCredentials
            );

            string tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            return Ok(new LoginResponseDTO { Token = tokenString });
        }
    }
}