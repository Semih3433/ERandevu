using Microsoft.EntityFrameworkCore;
using ERandevu_Domain.Entities;
using ERandevu_Domain.Interfaces;
using ERandevu_Domain.Models;
using ERandevu_Infrastructure.Data;

using ERandevu_Domain.Enums;

namespace ERandevu_Infrastructure.Repositories
{
    public class DoctorRepository : GenericRepository<Doctor>, IDoctorRepository
    {
        public DoctorRepository(ERandevu_Infrastructure.Data.AppDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<TopDoctorResult>> GetTopDoctorsByAppointmentCountAsync(DateTime startDate)
        {
            // performans için asno tracking kullanýlmasý istenmiþ dökümanda
            
            return await _context.Appointments
                .AsNoTracking()
                .Where(x => x.AppointmentDate >= startDate && x.Status != AppointmentStatus.Cancelled) // iptal edilmeyen randevular
                .GroupBy(x => x.DoctorId)
                .Select(g => new TopDoctorResult
                {
                    DoctorId = g.Key,
                    AppointmentCount = g.Count(),
                    DoctorName = g.First().Doctor.Name 
                })
                .OrderByDescending(x => x.AppointmentCount)
                .Take(10)
                .ToListAsync();
        }

        public async Task<IEnumerable<Doctor>> GetAllWithDetailsAsync()
        {
            return await _context.Doctors
                .Include(d => d.User)
                .Include(d => d.Department)
                .Where(d => d.IsActive)
                .ToListAsync();
        }
    }
}
