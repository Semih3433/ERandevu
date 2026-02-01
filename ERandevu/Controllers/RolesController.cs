using ERandevu_Domain.Entities;
using ERandevu_Infrastructure.Data; // Namespace kontrolü
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ERandevu.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RolesController : ControllerBase
{
    private readonly AppDbContext _context;

    public RolesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("UsersInRole/{roleName}")]
    public async Task<IActionResult> GetUsersByRole(string roleName)
    {
        var users = await _context.Users
            .Include(u => u.Role)
            .Where(u => u.Role.Name == roleName && !u.IsDeleted) // Doğrusu u.Role.Name
            .Select(u => new {
                u.Id,
                u.Name,
                u.Surname,
                RoleName = u.Role.Name
            }).ToListAsync();

        return Ok(users);
    }
}