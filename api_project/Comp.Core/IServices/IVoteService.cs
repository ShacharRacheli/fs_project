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
        Task<bool> DeleteVoteAsync(int userId, int imageId);
        Task<bool> IsSelfVotingAsync(int imageId, int userId);
        Task<bool> HasVotedAsync(int imageId, int userId);

    }
}
