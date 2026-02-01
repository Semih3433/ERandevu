using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERandevu_Domain.DTOs;

public class CreateUserDto
{
    public string Name { get; set; }
    public string Surname { get; set; }
    public string Role { get; set; }
    public int DepartmentId { get; set; }
}
