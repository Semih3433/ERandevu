using Microsoft.EntityFrameworkCore;
using ERandevu_Domain.Entities;
using ERandevu_Domain.Interfaces;
using ERandevu_Infrastructure.Data;

namespace ERandevu_Infrastructure.Repositories
{//hasta için repository
    public class PatientRepository : GenericRepository<Patient>, IPatientRepository
    {
        public PatientRepository(ERandevu_Infrastructure.Data.AppDbContext context) : base(context)
        {
        }

        public async Task<Patient> GetByTCKimlikNoAsync(string tcKimlikNo)
        {
            return await _dbSet.FirstOrDefaultAsync(p => p.TCKimlikNo == tcKimlikNo);
        }
    }
}
