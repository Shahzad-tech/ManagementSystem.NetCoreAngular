using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.AccountDtos
{
    public  class RegisterUserModel
    {
        public String Email { get; set; }
        public String Password { get; set; }
        public List<RoleResponseDto> Role { get; set; } = new List<RoleResponseDto>();
    }
}
