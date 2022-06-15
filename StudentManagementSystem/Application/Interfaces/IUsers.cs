using Application.Dtos.StudentDtos;
using Domain.Models;
using Domain.Models.Program;
using Domain.Models.Roles;
using Domain.Models.Users;
using Microsoft.AspNetCore.Identity;


namespace Application.Interfaces
{
    public interface IUsers
    {
        Task<IdentityResult> CreateRole(AddRole addrolemodel);
        Task<IdentityResult> RegisterUser(RegisterUser RegisterUserModel);
        Task<String> LoginUser(LoginUser loginUserModel);
        //Task<IdentityResult> RegisterStudent(RegisterStudent registerStudentModel);
        Task<IdentityResult> RegisterStudent(AddStudentFromFrontendDto studentmodelfromfrontend);
        void RegisterProgram(Programs program);
        List<Programs> GetPrograms();
        List<Students> GetAllStudents(StudentSortConfigDto studentSortConfig);
        void UpdateStudent(int id, UpdateStudentDto updateStudentModel);
        Students GetStudentById(int id);
        bool SaveChanges();

    }
}
