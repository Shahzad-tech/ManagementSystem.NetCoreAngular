using Application.Dtos.ProgramDto;
using Application.Dtos.StudentDtos;
using Application.Interfaces;
using AutoMapper;
using Domain.Models.Program;
using Domain.Models.Roles;
using Domain.Models.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebUI.Controllers
{

    [Route("User")]
    [ApiController]

    public class UsersController : Controller
    {

        private IMapper _mapper;

        private readonly IUsers _iusers;
        public UsersController(IUsers iusers, IMapper mapper) {
            _iusers = iusers;
            _mapper = mapper;
        }
        
        [Authorize]
        [HttpPost("CreateRole")]
        public async Task<ActionResult> CreateRole(AddRole addrolemodel)
        {
            var result = await _iusers.CreateRole(addrolemodel);
            return Ok(result);

        }

        [Authorize]
        [HttpPost("Register")]
        public async Task<ActionResult> RegisterUser(RegisterUser RegisterUserModel) {

           var result = await _iusers.RegisterUser(RegisterUserModel);
           return Ok(result);

        }

        [HttpPost("Login")]
        public async Task<ActionResult> LoginUser(LoginUser loginUserModel) {

            var result = await _iusers.LoginUser(loginUserModel);
            return Ok(result);
        
        }
 
        [Authorize(Roles = "Admin")]
        [HttpPost("Register/Student")]
        public async Task<ActionResult> RegisterStudent(AddStudentFromFrontendDto studentmodelfromfrontend)
        {
            var result = await _iusers.RegisterStudent(studentmodelfromfrontend); 
            return Ok(result);
        }

        [Authorize]
        [HttpPost("Register/Program")]
        public ActionResult RegisterProgram(RegisterProgramDto programDto)
        {

            var model = _mapper.Map<Programs>(programDto);
            _iusers.RegisterProgram(model);
            return Ok(_iusers.SaveChanges());

        }

        [Authorize(Roles = "Admin")]
        [HttpPost("GetStudents")]
        public ActionResult GetAllStudents(StudentSortConfigDto studentSortConfig) {

            var result = _iusers.GetAllStudents(studentSortConfig);
            return Ok(_mapper.Map<List<GetStudentDto>>(result));
        
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("GetProgram")]
        public ActionResult GetPrograms() {

            var result = _iusers.GetPrograms();
            return Ok(_mapper.Map<List<GetProgramDto>>(result));
            
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("UpdateStudent/{id}")]
        public ActionResult UpdateStudent(int id, UpdateStudentDto updateStudentModel) {
            var model = _iusers.GetStudentById(id);
            _mapper.Map(updateStudentModel,model);
            return Ok(_iusers.SaveChanges());
        }

    }
}
