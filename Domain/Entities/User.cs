using ERandevu_Domain.Entities;

public class User
{
    public int Id { get; set; }

    public string Name { get; set; }
    public string Surname { get; set; }

    public string Username { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public string TCKimlikNo { get; set; }
    public string PasswordHash { get; set; }

    public bool IsDeleted { get; set; } = false;

    public int RoleId { get; set; }
    public Role Role { get; set; }

    public int? DepartmentId { get; set; }
    public Department Department { get; set; }
}
