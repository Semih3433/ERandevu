namespace ERandevu.Application.DTOs
{
    public class ResultAppointmentDto
    {
        public int Id { get; set; }
        public string DoctorName { get; set; }
        public string PatientName { get; set; }
        public string PatientPhone { get; set; }
        public string DepartmentName { get; set; }
        public string AppointmentDate { get; set; } // Randevu tarih biçimi: "2026-01-15 10:30" case 6 için ayarladým.
        public string Status { get; set; }
    }
}
