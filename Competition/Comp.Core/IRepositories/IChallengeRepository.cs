using Comp.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Comp.Core.IRepositories
{
    public interface IChallengeRepository
    {
        Task<IEnumerable<Challenge>> GetAllChallengesAsync();
         Task<bool> AddNewChallengeAsync(Challenge challenge);
        Task AddAsync(Challenge challenge);
        Task<Challenge> GetByIdAsync(int id);
        Task<IEnumerable<Challenge>> GetChallengesByStatusAsync(EStatus status);
        Task UpdateAsync(Challenge challenge);
    }
}
