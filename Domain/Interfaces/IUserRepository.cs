using ERandevu_Domain.Entities;

namespace ERandevu_Domain.Interfaces
{
    public interface IUserRepository : IGenericRepository<User>
    {
        Task<User> GetByUsernameAsync(string username);
    }
}
