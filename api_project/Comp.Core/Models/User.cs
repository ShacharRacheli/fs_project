using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Comp.Core.Models
{
  public enum ERole { admin,user}
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public ERole Role { get; set; }
        public DateTime JoiningDate { get; set; }
        public bool IsDeleted { get; set; }

    }
}
