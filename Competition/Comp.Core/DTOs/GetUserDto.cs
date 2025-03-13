using Comp.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Comp.Core.DTOs
{
  public class GetUserDto
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        //public string Password { get; set; }
        public string Email { get; set; }
        public ERole Role { get; set; }
        public DateTime JoiningDate { get; set; }
    }
}
