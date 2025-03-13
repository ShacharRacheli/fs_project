using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Comp.Core.Models
{
    public class Winners
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public virtual User User{ get; set; }
        public int ImageId { get; set; }
        public virtual Image Image { get; set; }
        public int ChallengeID { get; set; }
        public virtual Challenge Challenge{ get; set; }
        public DateTime WinDate { get; set; }
    }
}
        //public Guid ChallengeId { get; set; }
        //public Guid ImageId { get; set; }
        //public Guid WinnerId { get; set; }
