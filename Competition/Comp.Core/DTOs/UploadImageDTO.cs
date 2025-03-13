using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Comp.Core.DTOs
{
    public class UploadImageDTO
    {
        public int ChallengeId { get; set; }
        public IFormFile File { get; set; }
    }
}
