using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Comp.Core.Models
{
    public class Image
    {
        [Key]
        public int Id { get; set; }
        public int UserId{ get; set; }
        public virtual User User{ get; set; }
        public string FileName { get; set; }
        public int CountVotes { get; set; }
        public int ChallengeId { get; set; }
        public virtual Challenge Challenge { get; set; }
        public string ImageUrl { get; set; }
        public DateTime UploadedAt { get; set; } = DateTime.Now;  
        public bool IsDeleted { get; set; }

    }
}