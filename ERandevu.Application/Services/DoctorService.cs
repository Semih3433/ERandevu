using AutoMapper;
using ERandevu_Domain.Entities;
using ERandevu_Domain.Enums;
using ERandevu_Domain.Interfaces;
using ERandevu.Application.DTOs;
using ERandevu.Application.Interfaces;

namespace ERandevu.Application.Services
{
    public class DoctorService : IDoctorService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public DoctorService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<DoctorCalendarDto> GetDoctorCalendarAsync(int doctorId, DateTime date)
        {
             var doctor = await _unitOfWork.Doctors.GetByIdAsync(doctorId);
             if (doctor == null) throw new Exception("Doktor bulunamadı.");

             var appointments = await _unitOfWork.Appointments.GetByDoctorIdAsync(doctorId);
             // Tarih filtreleme
             var dailyAppointments = appointments.Where(a => a.AppointmentDate.Date == date.Date && a.Status != AppointmentStatus.Cancelled).ToList();

             var calendar = new DoctorCalendarDto
             {
                 DoctorName = doctor.Name,
                 AvailableSlots = new List<string>(),
                 BookedSlots = new List<string>()
             };

             DateTime startTime = date.Date.AddHours(9);
             DateTime endTime = date.Date.AddHours(17);

             while (startTime < endTime)
             {
                 var slotString = startTime.ToString("HH:mm");
                 var isBooked = dailyAppointments.Any(a => a.AppointmentDate.Hour == startTime.Hour && a.AppointmentDate.Minute == startTime.Minute);

                 if (isBooked)
                 {
                     calendar.BookedSlots.Add(slotString);
                 }
                 else
                 {
                     calendar.AvailableSlots.Add(slotString);
                 }

                 startTime = startTime.AddMinutes(30);
             }

             return calendar;
        }

        public async Task<List<TopDoctorDto>> GetTopDoctorsAsync()
        {
             var startDate = DateTime.Now.AddMonths(-1);
             var stats = await _unitOfWork.Doctors.GetTopDoctorsByAppointmentCountAsync(startDate);
             
             return stats.Select(s => new TopDoctorDto 
             {
                 DoctorId = s.DoctorId,
                 DoctorName = s.DoctorName,
                 AppointmentCount = s.AppointmentCount
             }).ToList();
        }

        public async Task<IEnumerable<DoctorResponseDto>> GetByDepartmentAsync(int departmentId)
        {
            var doctors = await _unitOfWork.Doctors.FindAsync(d => d.DepartmentId == departmentId && d.IsActive);
            return _mapper.Map<IEnumerable<DoctorResponseDto>>(doctors);
        }
        public async Task<IEnumerable<DoctorResponseDto>> GetAllDoctorsAsync()
        {
            var doctors = await _unitOfWork.Doctors.GetAllWithDetailsAsync();
            return _mapper.Map<IEnumerable<DoctorResponseDto>>(doctors);
        }

        public async Task DeleteDoctorAsync(int id)
        {
            var doctor = await _unitOfWork.Doctors.GetByIdAsync(id);
            if (doctor == null) throw new Exception("Doktor bulunamadı.");

            // Aktif olma durumu 
            doctor.IsActive = false;
            await _unitOfWork.Doctors.UpdateAsync(doctor);

            
            if (doctor.UserId.HasValue)
            {
                var user = await _unitOfWork.Users.GetByIdAsync(doctor.UserId.Value);
                if (user != null)
                {
                    user.IsDeleted = true;
                    await _unitOfWork.Users.UpdateAsync(user);
                }
            }

            await _unitOfWork.CompleteAsync();
        }
    }
}
