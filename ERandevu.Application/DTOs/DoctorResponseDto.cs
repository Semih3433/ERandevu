namespace ERandevu.Application.DTOs
{
    public class DoctorResponseDto
    {
        public int Id { get; set; } // Doktor Entity Idsi
        public int UserId { get; set; } // Kullanýcý Entity Id
        public string Name { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public bool IsActive { get; set; }
    }
}
