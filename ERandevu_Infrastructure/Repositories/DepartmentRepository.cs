using Microsoft.EntityFrameworkCore;
using ERandevu_Domain.Entities;
using ERandevu_Domain.Interfaces;
using ERandevu_Infrastructure.Data;

namespace ERandevu_Infrastructure.Repositories
{
    public class DepartmentRepository : GenericRepository<Department>, IDepartmentRepository
    {
        public DepartmentRepository(ERandevu_Infrastructure.Data.AppDbContext context) : base(context)
        {
        }

        public async Task<Department> GetDepartmentWithDoctorsAsync(int id)
        {
            return await _dbSet
                .Include(d => d.Doctors)
                .FirstOrDefaultAsync(d => d.Id == id);
        }
    }
}
