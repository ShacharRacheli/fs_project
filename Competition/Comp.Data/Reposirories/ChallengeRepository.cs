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
    public class ChallengeRepository : IChallengeRepository
    {
        private readonly DataContext _dataContext;
        public ChallengeRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task<IEnumerable<Challenge>> GetAllChallengesAsync()
        {
            return await _dataContext.ChallengeList.ToListAsync();
        }
        public async Task<bool> AddNewChallengeAsync(Challenge challenge)
        {
            Console.WriteLine("in add chalerepositoryyyyyyyceeeee++++++==");

            await _dataContext.ChallengeList.AddAsync(challenge);
            return await _dataContext.SaveChangesAsync() > 0;
        }
        public async Task AddAsync(Challenge challenge)
        {
            await _dataContext.ChallengeList.AddAsync(challenge);
        }
        public async Task<Challenge> GetByIdAsync(int id)
        {
            return await _dataContext.ChallengeList.FirstOrDefaultAsync(c => c.Id == id);
        }
        public async Task<IEnumerable<Challenge>> GetChallengesByStatusAsync(EStatus status)
        {
            return await _dataContext.ChallengeList.Where(c => c.Status == status).ToListAsync();
        }
        public async Task UpdateAsync(Challenge challenge)
        {
            var c = await _dataContext.ChallengeList.FirstOrDefaultAsync(c => c.Id == challenge.Id);
            if (c != null)
            {
                c.Status = EStatus.notActive;
                c.IsWinnerEmailSent = true;
            }
            await _dataContext.SaveChangesAsync();
        }
        public async Task<List<Challenge>> GetExpiredChallengesAsync()
        {
            return await _dataContext.ChallengeList
                .Where(c => c.EndDate <= DateTime.UtcNow && c.Status == EStatus.active && !c.IsWinnerEmailSent)
                .ToListAsync();
        }
        public async Task<int?> GetWinnerByTopImageAsync(int challengeId)
        {
            var topImage = await _dataContext.ImagesList
                .Where(img => img.ChallengeId == challengeId)
                .OrderByDescending(img => img.CountVotes)
                .FirstOrDefaultAsync();

            return topImage?.UserId; // מחזיר את המשתמש שהעלה את התמונה
        }
    
    }
}
