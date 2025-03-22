using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Comp.Core.Models
{
    public enum EStatus{ notActive, active}
    public class Challenge
    {
        [Key]
        public int Id { get; set; } 
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public EStatus Status { get; set; }
        public bool IsWinnerEmailSent { get; set; } = false;
        //public List<Image> ImagesList { get; set; }
        //public int ImageId {  get; set; }
        //public bool IsDeleted { get; set; }

    }
}
