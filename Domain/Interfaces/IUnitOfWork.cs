using ERandevu_Domain.Entities; // for Role
using ERandevu_Domain.Interfaces; // for IRepository

namespace ERandevu_Domain.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IAppointmentRepository Appointments { get; }
        IDoctorRepository Doctors { get; }
        IDepartmentRepository Departments { get; }
        IPatientRepository Patients { get; }
        IUserRepository Users { get; }
        IGenericRepository<Role> Roles { get; }
        Task<int> CompleteAsync();
        Task BeginTransactionAsync();
        Task CommitTransactionAsync();
        Task RollbackTransactionAsync();
    }
}
