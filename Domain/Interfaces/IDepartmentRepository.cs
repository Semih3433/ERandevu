using ERandevu_Domain.Entities;

namespace ERandevu_Domain.Interfaces
{
    public interface IDepartmentRepository : IGenericRepository<Department>
    {
        Task<Department> GetDepartmentWithDoctorsAsync(int id);
    }
}
