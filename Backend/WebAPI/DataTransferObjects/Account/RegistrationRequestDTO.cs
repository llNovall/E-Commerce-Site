using System.ComponentModel.DataAnnotations;

namespace WebAPI.DataTransferObjects.Account
{
    public class RegistrationRequestDTO
    {
        [Required]
        [MinLength(3)]
        public string? Username { get; set; }

        [Required]
        public string? Password { get; set; }

        [Required]
        public string? ConfirmPassword { get; set; }

        [Required]
        [EmailAddress]
        public string? Email { get; set; }
    }
}