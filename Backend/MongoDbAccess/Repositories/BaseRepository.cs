using Domain.Context;
using Domain.Entities.Shop;
using Domain.Repositories.Shop;
using MongoDB.Driver;

namespace MongoDbAccess.Repositories
{
    public class BaseRepository<T> : IRepository<T> where T : BaseEntity
    {
        protected readonly IMongoDbContext _dbContext;
        protected readonly IMongoCollection<T> _collection;

        public BaseRepository(IMongoDbContext dbContext)
        {
            _dbContext = dbContext;
            _collection = _dbContext.GetCollection<T>(typeof(T).Name);
        }

        public async Task<bool> Create(T entity)
        {
            try
            {
                await _collection.InsertOneAsync(entity);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> CreateRange(List<T> entities)
        {
            try
            {
                await _collection.InsertManyAsync(entities, cancellationToken: CancellationToken.None);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> Delete(string id)
        {
            try
            {
                DeleteResult result = await _collection.DeleteOneAsync(c => c.Id == id);

                return result.IsAcknowledged;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<T?> Get(string id)
        {
            try
            {
                return await _collection.Find(c => c.Id == id).FirstOrDefaultAsync();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<List<T>> GetAll()
        {
            try
            {
                return await _collection.Find(_ => true).ToListAsync();
            }
            catch (Exception)
            {
                return new List<T>();
            }
        }

        public async Task<bool> Update(T entity)
        {
            try
            {
                ReplaceOneResult result = await _collection.ReplaceOneAsync(c => c.Id == entity.Id, entity);
                return result.IsAcknowledged;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}