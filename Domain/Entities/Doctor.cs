using ERandevu_Domain.Entities;

namespace ERandevu_Domain.Entities
{
    public class Doctor
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int DepartmentId { get; set; }
        public Department Department { get; set; }
        public bool IsActive { get; set; }

        public int? UserId { get; set; } // Link to Auth User
        public User User { get; set; }
    }
}
