using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Comp.Core.DTOs
{
   public class TopImageDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        //public int ChallengeId { get; set; }
        public string ImageUrl { get; set; }
        public int CountVotes { get; set; }
        public string FileName { get; set; }
        public string UserName { get; set; }
    }
}
