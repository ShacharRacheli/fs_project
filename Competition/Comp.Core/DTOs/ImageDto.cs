using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Comp.Core.DTOs
{
   public class ImageDto
    {
        //public int ID { get; set; }
        public int UserId { get; set; }
        public int ChallengeId { get; set; }
        public string ImageURL { get; set; }
        //public string FileName { get; set; } 
        //public DateTime UploadedAt { get; set; }

    }
}
