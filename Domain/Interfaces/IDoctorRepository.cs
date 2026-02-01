using ERandevu_Domain.Entities;

namespace ERandevu_Domain.Interfaces
{
    public interface IDoctorRepository : IGenericRepository<Doctor>
    {
        Task<IEnumerable<ERandevu_Domain.Models.TopDoctorResult>> GetTopDoctorsByAppointmentCountAsync(DateTime startDate);
        Task<IEnumerable<Doctor>> GetAllWithDetailsAsync();
    }
}
