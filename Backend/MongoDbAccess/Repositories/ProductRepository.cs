using Domain.Context;
using Domain.Entities.Shop;
using Domain.Repositories.Shop;

namespace MongoDbAccess.Repositories
{
    public class ProductRepository : BaseRepository<Product>, IProductRepository
    {
        public ProductRepository(IMongoDbContext dbContext) : base(dbContext)
        {
        }
    }
}