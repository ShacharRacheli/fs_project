using Comp.Core.IRepositories;
using Comp.Core.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Comp.Data.Reposirories
{
    public class VoteRepository : IVoteRepository
    {
        private readonly DataContext _dataContext;
        public VoteRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task<Vote> VoteImageAsync(int userId, int imageId)
        {
            var existingVote = await _dataContext.Votes
                .FirstOrDefaultAsync(v => v.UserId == userId && v.ImageId == imageId);

            if (existingVote != null)
            {
                return null;
            }

            var vote = new Vote
            {
                UserId = userId,
                ImageId = imageId,
                VoteDate = DateTime.UtcNow
            };

            await _dataContext.Votes.AddAsync(vote);

            // עדכון ספירת ההצבעות בתמונה
            var image = await _dataContext.Images.FirstOrDefaultAsync(i => i.Id == imageId);
            if (image != null)
            {
                image.CountVotes++;
                _dataContext.Images.Update(image);
            }

            await _dataContext.SaveChangesAsync();
            return vote;
        }
        public async Task<bool> DeleteVoteAsync(int userId, int imageId)
        {
            var vote = await _dataContext.Votes.FirstOrDefaultAsync(v => v.UserId == userId && v.ImageId == imageId);
            if (vote == null)
                return false;
            var image = await _dataContext.Images.FirstOrDefaultAsync(i => i.Id == imageId);
            if (image != null)
            {
                image.CountVotes--;
                _dataContext.Images.Update(image);
            }
            _dataContext.Votes.Remove(vote);
            return await _dataContext.SaveChangesAsync() > 0;
        }
        public async Task<bool> IsSelfVotingAsync(int imageId, int userId)
        {
            return await _dataContext.Images
                .AnyAsync(i => i.Id == imageId && i.UserId == userId);
        }
        public async Task<bool> HasVotedAsync(int imageId, int userId)
        {
            return await _dataContext.Votes
                .AnyAsync(i => i.ImageId == imageId && i.UserId == userId);
        }
    }
}
