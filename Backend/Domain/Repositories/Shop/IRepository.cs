using Domain.Entities.Shop;

namespace Domain.Repositories.Shop
{
    public interface IRepository<T> where T : BaseEntity
    {
        Task<T?> Get(string id);

        Task<List<T>> GetAll();

        Task<bool> Create(T entity);

        Task<bool> Update(T entity);

        Task<bool> Delete(string id);
    }
}