using ERandevu_Domain.Entities;

namespace ERandevu_Domain.Interfaces
{
    public interface IPatientRepository : IGenericRepository<Patient>
    {
        Task<Patient> GetByTCKimlikNoAsync(string tcKimlikNo);
    }
}
