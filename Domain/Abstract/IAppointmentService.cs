using ERandevu_Domain.DTOs;



namespace ERandevu_Domain.Abstract;

public interface IAppointmentService
{
    Task<int> CreateAsync(CreateAppointmentDto dto);
}
