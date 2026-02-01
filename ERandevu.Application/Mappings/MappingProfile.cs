using AutoMapper;
using ERandevu_Domain.Entities;
using ERandevu.Application.DTOs;

namespace ERandevu.Application.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CreateAppointmentDto, Appointment>();
            
            CreateMap<Appointment, ResultAppointmentDto>()
                .ForMember(dest => dest.DoctorName, opt => opt.MapFrom(src => src.Doctor.Name))
                .ForMember(dest => dest.PatientName, opt => opt.MapFrom(src => src.Patient.Name + " " + src.Patient.Surname))
                .ForMember(dest => dest.PatientPhone, opt => opt.MapFrom(src => src.Patient.Phone))
                .ForMember(dest => dest.DepartmentName, opt => opt.MapFrom(src => src.Doctor.Department.Name))
                .ForMember(dest => dest.AppointmentDate, opt => opt.MapFrom(src => src.AppointmentDate.ToString("yyyy-MM-dd HH:mm")))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString()));

            CreateMap<CreatePatientDto, Patient>();
            CreateMap<CreateDoctorDto, Doctor>();
            CreateMap<Doctor, DoctorResponseDto>()
                .ForMember(dest => dest.DepartmentName, opt => opt.MapFrom(src => src.Department.Name))
                .ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.User.Username))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.User.Email));
            
            // Mapleme profilleri burda eþlenme iþlemi yapýyorum automapper ile prfoili kalýtým olarak aktardým ordaki özellikleri kullanmak için
        }
    }
}
