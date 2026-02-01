using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERandevu_Domain.DTOs;

public class ResultUserDto
{
    public int Id { get; set; }
    public string FullName { get; set; }
    public string Role { get; set; }
    public string Department { get; set; }
}