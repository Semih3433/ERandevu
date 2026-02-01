using ERandevu_Domain.Entities;
using ERandevu_Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;

    public UsersController(AppDbContext context)
    {
        _context = context;
    }

    // 🔓 Herkes görebilir (login şart değil)
    [HttpGet]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await _context.Users
            .Include(u => u.Role)
            .Select(u => new
            {
                u.Id,
                u.Name,
                u.Surname,
                u.Username,
                Role = u.Role.Name
            })
            .ToListAsync();

        return Ok(users);
    }

    // 🔐 Giriş yapmış herkes erişebilir
    [Authorize]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById(int id)
    {
        var user = await _context.Users
            .Include(u => u.Role)
            .Where(u => u.Id == id)
            .Select(u => new
            {
                u.Id,
                u.Name,
                u.Surname,
                u.Username,
                Role = u.Role.Name
            })
            .FirstOrDefaultAsync();

        if (user == null)
            return NotFound("Kullanıcı bulunamadı");

        return Ok(user);
    }

    // 🔥 SADECE ADMIN EKLEYEBİLİR
    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> CreateUser(string name, string surname, string username, string password, int roleId)
    {
        var role = await _context.Roles.FindAsync(roleId);
        if (role == null)
            return BadRequest("Rol bulunamadı");

        var user = new User
        {
            Name = name,
            Surname = surname,
            Username = username,
            PasswordHash = password,
            Email = username + "@mail.com",
            TCKimlikNo = "00000000000",
            Phone = "0000000000",
            RoleId = roleId,
            IsDeleted = false
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok("Kullanıcı oluşturuldu");
    }

    // 🔥 SADECE ADMIN SİLEBİLİR
    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
            return NotFound("Kullanıcı yok");

        user.IsDeleted = true; // Soft delete
        await _context.SaveChangesAsync();

        return Ok("Kullanıcı silindi");
    }
}
