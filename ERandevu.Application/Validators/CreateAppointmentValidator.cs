using FluentValidation;
using ERandevu.Application.DTOs;

namespace ERandevu.Application.Validators
{
    public class CreateAppointmentValidator : AbstractValidator<CreateAppointmentDto>
    {
        public CreateAppointmentValidator()
        {
            RuleFor(x => x.AppointmentDate)
                .GreaterThan(DateTime.Now).WithMessage("Randevu geçmiş tarihli olamaz")
                .Must(BeInWorkingHours).WithMessage("Randevu mesai saatleri içinde olmalı (09:00-17:00)")
                .Must(HaveValidMinutes).WithMessage("Dakika 00 veya 30 olmalıdır")
                .Must(NotBeWeekend).WithMessage("Hafta sonu randevu alınamaz");
        }

        private bool BeInWorkingHours(DateTime date)
        {
            return date.Hour >= 9 && date.Hour < 17;
        }

        private bool HaveValidMinutes(DateTime date)
        {
            return date.Minute == 0 || date.Minute == 30;
        }

        private bool NotBeWeekend(DateTime date)
        {
            return date.DayOfWeek != DayOfWeek.Saturday && date.DayOfWeek != DayOfWeek.Sunday;
        }
    }
}

//Randevu ayarları kotnrol ve kuralları
