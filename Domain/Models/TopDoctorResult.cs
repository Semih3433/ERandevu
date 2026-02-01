using ERandevu_Domain.Entities;

namespace ERandevu_Domain.Models
{
    public class TopDoctorResult
    {
        public int DoctorId { get; set; }
        public string DoctorName { get; set; }
        public int AppointmentCount { get; set; }
    }
}
