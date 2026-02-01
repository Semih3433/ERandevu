namespace ERandevu.Application.DTOs
{
    public class CreateDoctorDto
    {
        public string Name { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public int DepartmentId { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
//Doktor Kaydý Ýçin DTO