using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using ERandevu_Domain.Interfaces;
using ERandevu_Infrastructure.Data;

namespace ERandevu_Infrastructure.Repositories
{//Dbset üzerinde genel CRUD operasyonlarýný tanýmlamak için repository
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected readonly ERandevu_Infrastructure.Data.AppDbContext _context;
        protected readonly DbSet<T> _dbSet;

        public GenericRepository(ERandevu_Infrastructure.Data.AppDbContext context)
        {
            _context = context;
            _dbSet = context.Set<T>();
        }

        public virtual async Task AddAsync(T entity)
        {
            await _dbSet.AddAsync(entity);
        }

        public virtual async Task AddRangeAsync(IEnumerable<T> entities)
        {
            await _dbSet.AddRangeAsync(entities);
        }

        public virtual async Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> expression)
        {
            return await _dbSet.Where(expression).ToListAsync();
        }

        public virtual async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public virtual async Task<T> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public virtual Task RemoveAsync(T entity)
        {
             _dbSet.Remove(entity);
             return Task.CompletedTask;
        }

        public virtual Task RemoveRangeAsync(IEnumerable<T> entities)
        {
             _dbSet.RemoveRange(entities);
             return Task.CompletedTask;
        }

        public virtual Task UpdateAsync(T entity)
        {
            _dbSet.Update(entity);
            return Task.CompletedTask;
        }
    }
}
