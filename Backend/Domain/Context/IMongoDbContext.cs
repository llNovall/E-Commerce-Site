using MongoDB.Driver;

namespace Domain.Context
{
    public interface IMongoDbContext
    {
        public IMongoCollection<T> GetCollection<T>(string collectionName);
    }
}