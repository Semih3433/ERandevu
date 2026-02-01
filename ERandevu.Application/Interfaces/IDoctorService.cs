using ERandevu.Application.DTOs;

namespace ERandevu.Application.Interfaces
{
    public interface IDoctorService
    {
         Task<DoctorCalendarDto> GetDoctorCalendarAsync(int doctorId, DateTime date);
         Task<List<TopDoctorDto>> GetTopDoctorsAsync();
         Task<IEnumerable<DoctorResponseDto>> GetByDepartmentAsync(int departmentId);
         Task<IEnumerable<DoctorResponseDto>> GetAllDoctorsAsync();
         Task DeleteDoctorAsync(int id);
    }
}

//Doktor için kullandýðým servisler tanýmlamalarý var burada  LÝsteleme  doktor takvimi departmana göre doktorlarý getirtme  silme felan
