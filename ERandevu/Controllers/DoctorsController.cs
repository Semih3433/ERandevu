using Microsoft.AspNetCore.Mvc;
using ERandevu.Application.Interfaces;
using ERandevu.Application.DTOs;

namespace ERandevu.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorsController : ControllerBase
    {
        private readonly IDoctorService _doctorService;

        public DoctorsController(IDoctorService doctorService)
        {
            _doctorService = doctorService;
        }

        [HttpGet]
        public async Task<IActionResult> GetDoctors([FromQuery] int? departmentId)
        {
            if (departmentId.HasValue)
            {
                var doctors = await _doctorService.GetByDepartmentAsync(departmentId.Value);
                return Ok(doctors);
            }
            
            // If no filter, return all doctors for management list
            var allDoctors = await _doctorService.GetAllDoctorsAsync();
            return Ok(allDoctors);
        }

        [HttpGet("by-department/{departmentId}")]
        public async Task<IActionResult> GetByDepartment(int departmentId)
        {
            var doctors = await _doctorService.GetByDepartmentAsync(departmentId);
            return Ok(doctors);
        }

        [HttpGet("top")]
        public async Task<IActionResult> GetTopDoctors()
        {
            var doctors = await _doctorService.GetTopDoctorsAsync();
            return Ok(doctors);
        }

        [HttpGet("{id}/calendar")]
        public async Task<IActionResult> GetDoctorCalendar(int id, [FromQuery] DateTime date)
        {
            if (date == default) date = DateTime.Today;
            var calendar = await _doctorService.GetDoctorCalendarAsync(id, date);
            return Ok(calendar);
        }

        [Microsoft.AspNetCore.Authorization.Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDoctor(int id)
        {
            try
            {
                await _doctorService.DeleteDoctorAsync(id);
                return Ok(new { Message = "Doktor başarıyla silindi." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
    }
}
