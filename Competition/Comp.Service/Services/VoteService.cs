using Comp.Core.IRepositories;
using Comp.Core.IServices;
using Comp.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Comp.Service.Services
{
    public class VoteService:IVoteService
    {
        private readonly IVoteRepository _voteRepository;
        public VoteService(IVoteRepository voteRepository)
        {
            _voteRepository = voteRepository;
        }
        public async Task<Vote> VoteImageAsync(int userId, int imageId)
        {
            return await _voteRepository.VoteImageAsync(userId, imageId);
        }
        public async Task<bool> DeleteVoteAsync(int userId,int imageId)
        {
            return await _voteRepository.DeleteVoteAsync(userId,imageId);
        }
    }
}
