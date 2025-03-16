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
            // בדיקה אם המשתמש כבר הצביע לתמונה הזאת
            var existingVote = await _dataContext.VoteList
                .FirstOrDefaultAsync(v => v.UserId == userId && v.ImageId == imageId);

            if (existingVote != null)
            {
                // אם כבר יש הצבעה, מחזירים error
                return null;
            }

            var vote = new Vote
            {
                UserId = userId,
                ImageId = imageId,
                VoteDate = DateTime.UtcNow
            };

            await _dataContext.VoteList.AddAsync(vote);

            // עדכון ספירת ההצבעות בתמונה
            var image = await _dataContext.ImagesList.FirstOrDefaultAsync(i => i.Id == imageId);
            if (image != null)
            {
                image.CountVotes++;
                _dataContext.ImagesList.Update(image);
            }

            await _dataContext.SaveChangesAsync();
            return vote;
        }
        public async Task<bool> DeleteVoteAsync(int userId, int imageId)
        {
            var vote = await _dataContext.VoteList.FirstOrDefaultAsync(v => v.UserId == userId && v.ImageId == imageId);
            if (vote == null)
                return false;
            var image = await _dataContext.ImagesList.FirstOrDefaultAsync(i => i.Id == imageId);
            if (image != null)
            {
                image.CountVotes--;
                _dataContext.ImagesList.Update(image);
            }
            _dataContext.VoteList.Remove(vote);
            return await _dataContext.SaveChangesAsync() > 0;
        }
    }
}
