using ERandevu.Application.DTOs;

namespace ERandevu.Application.Interfaces
{
    public interface IAppointmentService
    {
        Task CreateAppointmentAsync(CreateAppointmentDto createAppointmentDto); // Randevu oluþturma
        Task CreateAppointmentByUserIdAsync(CreateAppointmentDto dto, int userId); //Kullanýcý ÝDSi ile randevu oluþturma
        Task<IEnumerable<ResultAppointmentDto>> GetAppointmentsAsync(); //Tüm randevular için (ADMÝN)
        Task<IEnumerable<ResultAppointmentDto>> GetDoctorAppointmentsAsync(int doctorId); //Doktor randevularý için
        Task<IEnumerable<ResultAppointmentDto>> GetPatientAppointmentsAsync(int patientId); //Hasta randevularý için
        Task<IEnumerable<ResultAppointmentDto>> GetAppointmentsByUserIdAsync(int userId); // Kullanýcý Ýdsine göre randevularý getirmek için
        Task CancelAppointmentAsync(int appointmentId, int patientId); // PatientId to verify ownership
        Task CancelAppointmentByUserIdAsync(int appointmentId, int userId); // Kullanýcý Ýdsi ile randevu iptali
        Task<IEnumerable<ResultAppointmentDto>> GetAppointmentsByDoctorUserIdAsync(int userId); // Doktor için kullanýcý ekraný
        Task CompleteAppointmentAsync(int appointmentId);// Doktorun randevuyu tamamlamasý durumu
        Task ApproveAppointmentAsync(int appointmentId);// Doktorun randevuyu onaylamasý durumu
    }
}
// Randevu servisi arayüzü
// Randevu oluþturma, iptal etme, tamamlama ve onaylama iþlemleri var Hasta doktor ve admin için gerekli iþ görevlerinin nasýl yapýlacðýný ayarladým