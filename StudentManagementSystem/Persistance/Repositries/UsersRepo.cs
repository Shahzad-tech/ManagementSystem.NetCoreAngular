using Domain.Data;
using Application.Interfaces;
using Domain.Models.Program;
using Domain.Models.Roles;
using Domain.Models.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Persistance.context;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Application.Dtos.StudentDtos;
using AutoMapper;
using Domain.Models;

namespace Persistance.Repositries
{
    public class UsersRepo : IUsers
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private DataContext _context;
        private readonly JwtSettings _settings;
        private IMapper _mapper;
        public UsersRepo(RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager, IOptions<JwtSettings> settings, DataContext context, IMapper mapper)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _settings = settings.Value;
            _context = context;
            _mapper = mapper;
            //_userStudentManager = userStudentManager;
        }

        public async Task<IdentityResult> CreateRole(AddRole addrolemodel)
        {

            {
                var identityRole = new IdentityRole
                {
                    Name = addrolemodel.RoleName
                };

                var result = await _roleManager.CreateAsync(identityRole);

                return result;
            }
        }
        public async Task<IdentityResult> RegisterUser(RegisterUser RegisterUserModel)
        {

            var user = new ApplicationUser
            {
                UserName = RegisterUserModel.UserName,
                Email = RegisterUserModel.Email
            };

            var result = await _userManager.CreateAsync(user, RegisterUserModel.Password);

            if (result.Succeeded)
            {

                await _userManager.AddToRolesAsync(user, RegisterUserModel.Roles.Select(x => x.RoleName));

            }

            return result;

        }

        public async Task<String> LoginUser(LoginUser loginUserModel)
        {
            var user = await _userManager.FindByEmailAsync(loginUserModel.Email);
            var userWithRole = await _userManager.GetRolesAsync(user);
            var claims = new List<Claim>
            {
                new Claim("UserID", user.Id),
                new Claim("UserEmail", user.Email)
            };

            claims.AddRange(userWithRole.Select(role => new Claim(ClaimTypes.Role, role)));

            if (user != null && await _userManager.CheckPasswordAsync(user, loginUserModel.Password))
            {
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.UtcNow.AddMinutes(30),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_settings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return token;
            }
            else
            {
                return "false";
            }
        }
        public void RegisterProgram(Programs program)
        {
          _context.Programs.Add(program);
            
        }

        public bool SaveChanges()
        {
            return (_context.SaveChanges() > 0);
        }

        public List<Programs> GetPrograms()
        {
            var result = _context.Programs.ToList();
            return result;
        }

        public async Task<IdentityResult> RegisterStudent(AddStudentFromFrontendDto studentmodelfromfrontend)
        {
                var user = new ApplicationUser
                   {
                        UserName = studentmodelfromfrontend.UserName,
                        Email = studentmodelfromfrontend.Email,
                        UniRollNumber = studentmodelfromfrontend.UniRollNo

                    };

                var result = await _userManager.CreateAsync(user, studentmodelfromfrontend.Password);
                
                if (result.Succeeded){ await _userManager.AddToRoleAsync(user,"Student"); }
                
                //this.SaveChanges();
               
                var userData = _userManager.GetUserIdAsync(user);
                var model = _mapper.Map<Students>(studentmodelfromfrontend);
                model.UserId = userData.Result;
                await _context.Students.AddAsync(model);
                this.SaveChanges();

            return result;

               
        }

        public List<Students> GetAllStudents(StudentSortConfigDto studentSortConfig)
        {
            return studentSortConfig.direction == "asc" ? _context.Students.OrderBy(x => x.CreatedDate).ToList()
            : studentSortConfig.direction == "desc" ? _context.Students.OrderByDescending(x => x.CreatedDate).ToList()
            : _context.Students.ToList();

        }

        public void UpdateStudent(int id, UpdateStudentDto updateStudentModel)
        {
           //Nothing here
        }

        public Students GetStudentById(int id)
        {
            return _context.Students.FirstOrDefault(x => x.Id == id);
        }
    }
}
