using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ERandevu_Domain.Entities;
using ERandevu_Domain.Interfaces;
using ERandevu.Application.DTOs;
using ERandevu.Application.Interfaces;

namespace ERandevu.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _configuration;

        public AuthService(IUnitOfWork unitOfWork, IConfiguration configuration)
        {
            _unitOfWork = unitOfWork;
            _configuration = configuration;
        }

        public async Task<string> LoginAsync(LoginDto loginDto)
        {
             var user = await _unitOfWork.Users.GetByUsernameAsync(loginDto.Username);
             if (user == null || user.PasswordHash != loginDto.Password) // Şifre kontrolü ona göre dönüş
             {
                 throw new Exception("Kullanıcı adı veya şifre hatalı!");
             }
            //JWT Token oluşturma
            var tokenHandler = new JwtSecurityTokenHandler();
             var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"] ?? "SecretKeyMustBeLongerThanThisString12345");
             var tokenDescriptor = new SecurityTokenDescriptor
             {
                 Subject = new ClaimsIdentity(new Claim[]
                 {
                     new Claim(ClaimTypes.Name, user.Username),
                     new Claim(ClaimTypes.Role, user.Role.Name), // Dinamik rol atamak için
                     new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
                 }),
                 Issuer = _configuration["Jwt:Issuer"],
                 Audience = _configuration["Jwt:Audience"],
                 Expires = DateTime.UtcNow.AddHours(1),
                 SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
             };
             var token = tokenHandler.CreateToken(tokenDescriptor);
             return tokenHandler.WriteToken(token);
        }
        //hasta için
        public async Task<string> LoginPatientAsync(LoginDto loginDto)
        {
             var user = await _unitOfWork.Users.GetByUsernameAsync(loginDto.Username);
             if (user == null || user.PasswordHash != loginDto.Password)
             {
                 throw new Exception("Kullanıcı adı veya şifre hatalı!");
             }

             if (user.Role.Name != "Patient")
             {
                 throw new Exception("Bu giriş noktası sadece hastalar içindir.");
             }

             return GenerateToken(user);
        }
        //doktor için  
        public async Task<string> LoginDoctorAsync(LoginDto loginDto)
        {
             var user = await _unitOfWork.Users.GetByUsernameAsync(loginDto.Username);
             if (user == null || user.PasswordHash != loginDto.Password)
             {
                 throw new Exception("Kullanıcı adı veya şifre hatalı!");
             }

             if (user.Role.Name != "Doctor")
             {
                 throw new Exception("Bu giriş noktası sadece doktorlar içindir.");
             }

             return GenerateToken(user);
        }
        //Kullanıcı için JWT token oluşturma
        private string GenerateToken(User user)
        {
             var tokenHandler = new JwtSecurityTokenHandler();
             var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"] ?? "SecretKeyMustBeLongerThanThisString12345");
             var tokenDescriptor = new SecurityTokenDescriptor
             {
                 Subject = new ClaimsIdentity(new Claim[]
                 {
                     new Claim(ClaimTypes.Name, user.Username),
                     new Claim(ClaimTypes.Role, user.Role.Name),
                     new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
                 }),
                 Issuer = _configuration["Jwt:Issuer"],
                 Audience = _configuration["Jwt:Audience"],
                 Expires = DateTime.UtcNow.AddHours(1),
                 SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
             };
             var token = tokenHandler.CreateToken(tokenDescriptor);
             return tokenHandler.WriteToken(token);
        }
        //Hasta kaydını yapmak için validation kullanarak yapıldı
        public async Task RegisterPatientAsync(CreatePatientDto dto, string password)
        {
            // Validation  kısmı
            var existingUser = await _unitOfWork.Users.GetByUsernameAsync(dto.Username);
            if (existingUser != null) throw new Exception("Kullanıcı adı saten alınmış.");

            var existingPatient = await _unitOfWork.Patients.GetByTCKimlikNoAsync(dto.TCKimlikNo);
            if (existingPatient != null) throw new Exception("Bu TC Kimlik No ile kayıt mevcut.");

            // ROl getirme GET İşlemi içİN
            var roles = await _unitOfWork.Roles.FindAsync(r => r.Name == "Patient");
            var role = roles.FirstOrDefault();
            if (role == null) throw new Exception("Sistemde 'Patient' rolü bulunamadı.");

            // Kullanıcı oluşturma
            var user = new User
            {
                 Name = dto.Name,
                 Surname = dto.Surname,
                 Username = dto.Username,
                 Email = dto.Email,
                 Phone = dto.Phone,
                 TCKimlikNo = dto.TCKimlikNo,
                 PasswordHash = password, 
                 RoleId = role.Id,
                 IsDeleted = false
            };

            await _unitOfWork.Users.AddAsync(user);
            await _unitOfWork.CompleteAsync(); // IDyi kaydetmek için

            //hasta oluşturmak içinkullanılan entity
            var patient = new Patient
            {
                Name = dto.Name,
                Surname = dto.Surname,
                Phone = dto.Phone,
                TCKimlikNo = dto.TCKimlikNo,
                UserId = user.Id 
            };

            await _unitOfWork.Patients.AddAsync(patient);
            await _unitOfWork.CompleteAsync();
        }

        public async Task RegisterDoctorAsync(CreateDoctorDto dto)
        {
            await _unitOfWork.BeginTransactionAsync();
            try
            {
                
                var existingUser = await _unitOfWork.Users.GetByUsernameAsync(dto.Username);
                if (existingUser != null)
                {
                    
                    var existingDoctor = (await _unitOfWork.Doctors.FindAsync(d => d.UserId == existingUser.Id)).FirstOrDefault();
                    
                    if (existingDoctor == null)
                    {
                        
                        await _unitOfWork.Users.RemoveAsync(existingUser);
                        await _unitOfWork.CompleteAsync();
                    }
                    else
                    {
                         throw new Exception("Kullanıcı adı zaten alınmış.");
                    }
                }

                // Rol getirme doktor için
                var roles = await _unitOfWork.Roles.FindAsync(r => r.Name == "Doctor");
                var role = roles.FirstOrDefault();
                if (role == null) throw new Exception("Sistemde 'Doctor' rolü bulunamadı.");

                // Kullanıcı oluşturma doktor
                var user = new User
                {
                     Name = dto.Name,
                     Surname = "", // Doctors may not have surname in this DTO, using empty string
                     Username = dto.Username,
                     Email = dto.Email,
                     Phone = "", // Optional for doctors
                     TCKimlikNo = "", // Optional for doctors
                     PasswordHash = dto.Password, 
                     RoleId = role.Id,
                     DepartmentId = dto.DepartmentId,
                     IsDeleted = false
                };

                await _unitOfWork.Users.AddAsync(user);
                await _unitOfWork.CompleteAsync();

                // Entity oluşturma doktor
                var doctor = new Doctor
                {
                    Name = dto.Name,
                    DepartmentId = dto.DepartmentId,
                    IsActive = dto.IsActive,
                    UserId = user.Id
                };

                await _unitOfWork.Doctors.AddAsync(doctor);
                await _unitOfWork.CompleteAsync();

                await _unitOfWork.CommitTransactionAsync();
            }
            catch
            {
                await _unitOfWork.RollbackTransactionAsync();
                throw;
            }
        }
    }
}
