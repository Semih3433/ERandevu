using AutoMapper;
using ERandevu_Domain.DTOs;
using ERandevu_Domain.Entities;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace ERandevu_Infrastructure.Mappings;

public class GeneralMapping : Profile
{
    public GeneralMapping()
    {
        CreateMap<CreateAppointmentDto, Appointment>();
        CreateMap<Appointment, ResultAppointmentDto>();

        CreateMap<CreateUserDto, User>();
        CreateMap<User, ResultUserDto>();
    }
}
