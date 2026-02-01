using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERandevu_Domain.DTOs;

public class CreatePatientDto
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string TCKimlikNo { get; set; }
    public string Phone { get; set; }
}