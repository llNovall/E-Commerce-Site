using Domain.Entities.Shop;
using Domain.Repositories.Shop;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Shop
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        private ILogger<ProductsController> _logger;

        public ProductsController(IProductRepository productRepository, ILogger<ProductsController> logger)
        {
            if (logger == null) throw new ArgumentNullException(nameof(logger));
            if (productRepository == null) throw new ArgumentNullException(nameof(productRepository));

            _logger = logger;
            _productRepository = productRepository;
        }

        [HttpGet]
        [Route("/api/[controller]/GetProduct")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Product))]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(Product))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetProduct(string id)
        {
            _logger.LogInformation("Attempting to get product");

            if (string.IsNullOrWhiteSpace(id))
            {
                _logger.LogInformation("Failed to get product");
                return BadRequest();
            }

            Product? foundProduct = await _productRepository.Get(id);

            if (foundProduct == null)
            {
                _logger.LogInformation("Failed to get product");
                return NotFound(foundProduct);
            }

            _logger.LogInformation("Successfully found product.");
            return Ok(foundProduct);
        }

        [HttpGet]
        [Route("/api/[controller]/GetAllProducts")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<Product>))]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(List<Product>))]
        public async Task<IActionResult> GetAllProducts()
        {
            _logger.LogInformation("Attempting to get all product");

            List<Product> foundProducts = await _productRepository.GetAll();

            if (foundProducts.Count == 0)
            {
                _logger.LogInformation("Failed to get all products");
                return NotFound(foundProducts);
            }

            _logger.LogInformation("Successfully found all products.");

            return Ok(foundProducts);
        }
    }
}