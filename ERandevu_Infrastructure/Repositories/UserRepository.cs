using Microsoft.EntityFrameworkCore;
using ERandevu_Domain.Entities;
using ERandevu_Domain.Interfaces;
using ERandevu_Infrastructure.Data;

namespace ERandevu_Infrastructure.Repositories
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(ERandevu_Infrastructure.Data.AppDbContext context) : base(context)
        {
        }

        public async Task<User> GetByUsernameAsync(string username)
        {
            return await _dbSet.Include(u => u.Role).FirstOrDefaultAsync(u => u.Username == username && !u.IsDeleted);
        }
    }
}
