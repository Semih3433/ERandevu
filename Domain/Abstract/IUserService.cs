using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using ERandevu_Domain.DTOs;

namespace ERandevu_Domain.Abstract;
public interface IUserService
{
    Task<int> CreateUserAsync(CreateUserDto dto);
    Task<List<ResultUserDto>> GetAllUsersAsync();
    Task<ResultUserDto?> GetUserByIdAsync(int id);
}