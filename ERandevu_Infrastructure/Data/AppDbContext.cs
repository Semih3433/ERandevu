using Microsoft.EntityFrameworkCore;
using ERandevu_Domain.Entities;

namespace ERandevu_Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<User> Users { get; set; } // Keep User for Auth if needed

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Case 1: Department - Doctor (One to Many)
            modelBuilder.Entity<Department>()
                .HasMany(d => d.Doctors)
                .WithOne(doc => doc.Department)
                .HasForeignKey(doc => doc.DepartmentId)
                .OnDelete(DeleteBehavior.Restrict); // Soft delete handled manually, prevent cascade hard delete

            // Case 1: Department Soft Delete Filter
            modelBuilder.Entity<Department>().HasQueryFilter(d => !d.IsDeleted);

            // Case 2: Patient TC Unique Index
            modelBuilder.Entity<Patient>()
                .HasIndex(p => p.TCKimlikNo)
                .IsUnique();

            // Case 10: Performance Index
            modelBuilder.Entity<Appointment>()
                .HasIndex(a => a.AppointmentDate);
            
            // Appointment Relations
            modelBuilder.Entity<Appointment>()
                .HasOne(a => a.Doctor)
                .WithMany()
                .HasForeignKey(a => a.DoctorId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Appointment>()
                .HasOne(a => a.Patient)
                .WithMany()
                .HasForeignKey(a => a.PatientId)
                .OnDelete(DeleteBehavior.Restrict);

            base.OnModelCreating(modelBuilder);
        }
    }
}
