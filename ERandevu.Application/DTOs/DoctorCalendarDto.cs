namespace ERandevu.Application.DTOs
{
    public class DoctorCalendarDto
    {
        public string DoctorName { get; set; }
        public List<string> AvailableSlots { get; set; } = new List<string>();
        public List<string> BookedSlots { get; set; } = new List<string>();
    }
}
// Doktor Takvimi DTO'su uygun randevu almak için