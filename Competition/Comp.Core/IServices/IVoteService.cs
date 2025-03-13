using Comp.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Comp.Core.IServices
{
    public interface IVoteService
    {
        Task<Vote> VoteImageAsync(int userId, int imageId);
    }
}
