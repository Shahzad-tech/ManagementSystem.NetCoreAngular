using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Users
{
    public class JwtSettings
    {
        public string JWT_Secret { get; set; }
        public string Client_URl { get; set; }
    }
}
