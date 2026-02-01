using ERandevu_Domain.Entities;
using ERandevu_Infrastructure.Data;

namespace ERandevu_Infrastructure.Data
{
    public static class DbInitializer
    {
        public static void Initialize(AppDbContext context)
        {
            context.Database.EnsureCreated();

            // Seed Roles (if not exist)
            if (!context.Roles.Any())
            {
                var roles = new Role[]
                {
                    new Role{Name="Admin"},
                    new Role{Name="Doctor"},
                    new Role{Name="Patient"}
                };
                foreach (Role r in roles)
                {
                    context.Roles.Add(r);
                }
                context.SaveChanges();
            }

            // Seed Admin User (if not exist)
            if (!context.Users.Any(u => u.Username == "admin"))
            {
                var adminRole = context.Roles.First(r => r.Name == "Admin");
                var adminUser = new User
                {
                    Name = "Admin",
                    Surname = "System",
                    Username = "admin",
                    Email = "admin@erandevu.com",
                    Phone = "5555555555",
                    TCKimlikNo = "11111111111",
                    PasswordHash = "123456",
                    RoleId = adminRole.Id,
                    IsDeleted = false
                };
                context.Users.Add(adminUser);
                context.SaveChanges();
            }

            // 1. Departments
            if (!context.Departments.Any())
            {
                var d1 = new Department { Name = "Dahiliye" };
                var d2 = new Department { Name = "Göz Hastalıkları" };
                var d3 = new Department { Name = "Nöroloji" };
                context.Departments.AddRange(d1, d2, d3);
                context.SaveChanges();

                // 2. Doctors (User + Doctor Entity)
                var docRole = context.Roles.First(r => r.Name == "Doctor");
                
                // Doctor 1: Ali Veli (Dahiliye)
                var docUser1 = new User { Name = "Ali", Surname = "Veli", Username = "doktor1", PasswordHash = "123", RoleId = docRole.Id, Email="doc1@e.com", Phone="555", TCKimlikNo="222", IsDeleted = false };
                context.Users.Add(docUser1);
                context.SaveChanges();
                context.Doctors.Add(new Doctor { Name = "Ali Veli", DepartmentId = d1.Id, UserId = docUser1.Id, IsActive = true });

                // Doctor 2: Ayşe Yılmaz (Göz)
                var docUser2 = new User { Name = "Ayşe", Surname = "Yılmaz", Username = "doktor2", PasswordHash = "123", RoleId = docRole.Id, Email="doc2@e.com", Phone="555", TCKimlikNo="333", IsDeleted = false };
                context.Users.Add(docUser2);
                context.SaveChanges();
                context.Doctors.Add(new Doctor { Name = "Ayşe Yılmaz", DepartmentId = d2.Id, UserId = docUser2.Id, IsActive = true });

                context.SaveChanges();
            }

            // 3. Patients (User + Patient Entity)
            if (!context.Patients.Any())
            {
                var patRole = context.Roles.First(r => r.Name == "Patient");

                // Patient 1: Mehmet Demir
                var patUser1 = new User { Name = "Mehmet", Surname = "Demir", Username = "hasta1", PasswordHash = "123", RoleId = patRole.Id, Email="hasta1@e.com", Phone="555", TCKimlikNo="10000000001", IsDeleted = false };
                context.Users.Add(patUser1);
                context.SaveChanges();

                context.Patients.Add(new Patient { Name = "Mehmet", Surname = "Demir", TCKimlikNo = "10000000001", Phone = "555", UserId = patUser1.Id });
                context.SaveChanges();
            }
        }
    }
}
