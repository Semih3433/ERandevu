using ERandevu.Application.DTOs;

namespace ERandevu.Application.Interfaces
{
    public interface IAuthService
    {
        Task<string> LoginAsync(LoginDto loginDto);
        Task<string> LoginPatientAsync(LoginDto loginDto);
        Task<string> LoginDoctorAsync(LoginDto loginDto);
        Task RegisterPatientAsync(CreatePatientDto createPatientDto, string password);
        Task RegisterDoctorAsync(CreateDoctorDto createDoctorDto);
    }
}
// Authentication servisi için arayüz Hasta doktor giriþi ve kayýtlarý var