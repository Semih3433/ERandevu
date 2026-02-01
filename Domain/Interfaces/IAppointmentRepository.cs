using ERandevu_Domain.Entities;

namespace ERandevu_Domain.Interfaces
{
    public interface IAppointmentRepository : IGenericRepository<Appointment>
    {
        // Custom queries for Apppointments
        Task<bool> IsOverlapAsync(int doctorId, DateTime date);
        Task<IEnumerable<Appointment>> GetByDoctorIdAsync(int doctorId);
        Task<IEnumerable<Appointment>> GetByPatientIdAsync(int patientId);
    }
}
