using AutoMapper;
using FluentValidation;
using ERandevu_Domain.Entities;
using ERandevu_Domain.Enums;
using ERandevu_Domain.Interfaces;
using ERandevu.Application.DTOs;
using ERandevu.Application.Interfaces;

namespace ERandevu.Application.Services
{//IAppointmentService implemente ettim
    public class AppointmentService : IAppointmentService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IValidator<CreateAppointmentDto> _validator;

        public AppointmentService(IUnitOfWork unitOfWork, IMapper mapper, IValidator<CreateAppointmentDto> validator)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _validator = validator;
        }

        public async Task CreateAppointmentAsync(CreateAppointmentDto createAppointmentDto)
        {
            var validationResult = await _validator.ValidateAsync(createAppointmentDto);
            if (!validationResult.IsValid)
            {
                throw new ValidationException(validationResult.Errors);
            }

            // Case  3 deki overlap check işini yapıyorum
            var isOverlap = await _unitOfWork.Appointments.IsOverlapAsync(createAppointmentDto.DoctorId, createAppointmentDto.AppointmentDate);
            if (isOverlap)
            {
                throw new Exception("Doktorun bu saatte başka bir randevusu mevcut.");
            }
                     
            // Hasta Kontrol
            var patient = await _unitOfWork.Patients.GetByIdAsync(createAppointmentDto.PatientId);
            if (patient == null) throw new Exception("Hasta bulunamadı.");

            // Doktor kontrol
             var doctor = await _unitOfWork.Doctors.GetByIdAsync(createAppointmentDto.DoctorId);
            if (doctor == null) throw new Exception("Doktor bulunamadı.");


            var appointment = _mapper.Map<Appointment>(createAppointmentDto);
            appointment.Status = AppointmentStatus.Pending;

            await _unitOfWork.Appointments.AddAsync(appointment);
            await _unitOfWork.CompleteAsync();
        }

        public async Task CreateAppointmentByUserIdAsync(CreateAppointmentDto dto, int userId)
        {
             var patients = await _unitOfWork.Patients.GetAllAsync();
             var patient = patients.FirstOrDefault(p => p.UserId == userId);
             if (patient == null) throw new Exception("Hesabınıza bağlı bir hasta kaydı bulunamadı.");

             dto.PatientId = patient.Id;
             await CreateAppointmentAsync(dto);
        }

        public async Task<IEnumerable<ResultAppointmentDto>> GetAppointmentsAsync()
        {
            var appointments = await _unitOfWork.Appointments.GetAllAsync(); 
            return _mapper.Map<IEnumerable<ResultAppointmentDto>>(appointments);
        }

        public async Task<IEnumerable<ResultAppointmentDto>> GetDoctorAppointmentsAsync(int doctorId)
        {
            var appointments = await _unitOfWork.Appointments.GetByDoctorIdAsync(doctorId);
            return _mapper.Map<IEnumerable<ResultAppointmentDto>>(appointments);
        }

        public async Task<IEnumerable<ResultAppointmentDto>> GetPatientAppointmentsAsync(int patientId)
        {
            var appointments = await _unitOfWork.Appointments.GetByPatientIdAsync(patientId);
            return _mapper.Map<IEnumerable<ResultAppointmentDto>>(appointments);
        }

        public async Task<IEnumerable<ResultAppointmentDto>> GetAppointmentsByUserIdAsync(int userId)
        {
            // hasta kontrolu liste halinde
            var patients = await _unitOfWork.Patients.GetAllAsync(); 
            var patient = patients.FirstOrDefault(p => p.UserId == userId);
            if (patient != null)
            {
                return await GetPatientAppointmentsAsync(patient.Id);
            }

            // Doktor kontrolu liste halinde
            var doctors = await _unitOfWork.Doctors.GetAllAsync();
            var doctor = doctors.FirstOrDefault(d => d.UserId == userId);
            if (doctor != null)
            {
                return await GetDoctorAppointmentsAsync(doctor.Id);
            }

            return new List<ResultAppointmentDto>();
        }

        public async Task<IEnumerable<ResultAppointmentDto>> GetAppointmentsByDoctorUserIdAsync(int userId)
        {
            var doctors = await _unitOfWork.Doctors.GetAllAsync();
            var doctor = doctors.FirstOrDefault(d => d.UserId == userId);
            if (doctor == null) return new List<ResultAppointmentDto>();

            return await GetDoctorAppointmentsAsync(doctor.Id);
        }

        public async Task CancelAppointmentAsync(int appointmentId, int patientId)
        {
            var appointment = await _unitOfWork.Appointments.GetByIdAsync(appointmentId);
            if (appointment == null) throw new Exception("Randevu bulunamadı.");

            // admin dışı iptal edemez hasta felan
            if (patientId != 0 && appointment.PatientId != patientId) 
                throw new Exception("Bu randevuyu iptal etme yetkiniz yok.");
            
            // Case 4teki geçmiş randevu iptal edememe
            if (appointment.AppointmentDate < DateTime.Now) throw new Exception("Geçmiş tarihli randevu iptal edilemez.");

             //15 dakika kuralı
            if ((appointment.AppointmentDate - DateTime.Now).TotalMinutes < 15) throw new Exception("Randevuya 15 dakikadan az kaldığı için iptal edilemez.");

            appointment.Status = AppointmentStatus.Cancelled;
            await _unitOfWork.Appointments.UpdateAsync(appointment);
            await _unitOfWork.CompleteAsync();
        }

        public async Task CancelAppointmentByUserIdAsync(int appointmentId, int userId)
        {
             var patients = await _unitOfWork.Patients.GetAllAsync();
             var patient = patients.FirstOrDefault(p => p.UserId == userId);
             if (patient == null) throw new Exception("Hesabınıza bağlı bir hasta kaydı bulunamadı.");

             await CancelAppointmentAsync(appointmentId, patient.Id);
        }

        public async Task ApproveAppointmentAsync(int appointmentId)
        {
             var appointment = await _unitOfWork.Appointments.GetByIdAsync(appointmentId);
             if (appointment == null) throw new Exception("Randevu bulunamadı.");
             
             appointment.Status = AppointmentStatus.Approved;
             await _unitOfWork.Appointments.UpdateAsync(appointment);
             await _unitOfWork.CompleteAsync();
        }

        public async Task CompleteAppointmentAsync(int appointmentId)
        {
             var appointment = await _unitOfWork.Appointments.GetByIdAsync(appointmentId);
             if (appointment == null) throw new Exception("Randevu bulunamadı.");

             appointment.Status = AppointmentStatus.Completed;
             await _unitOfWork.Appointments.UpdateAsync(appointment);
             await _unitOfWork.CompleteAsync();
        }
    }
}
