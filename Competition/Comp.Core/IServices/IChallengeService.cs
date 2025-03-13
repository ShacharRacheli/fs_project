using Comp.Core.DTOs;
using Comp.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Comp.Core.IServices
{
    public interface IChallengeService
    {
        Task<IEnumerable<Challenge>> GetAllChallengesAsync();
        ////Task<bool> AddNewChallengeAsync(Challenge challenge);
        ////Task<bool> UpdateChallengeAsync(Challenge challenge);
        //Task<Challenge> AddNewChallengeAsync(ChallengeDto challengeDto);
        //Task<IEnumerable<Challenge>> GetActiveChallengesAsync();
        //Task<IEnumerable<Challenge>> GetFinishedChallengesAsync();
        ////Task<Challenge> GetChallengeByIdAsync(int id);
        //Task<Challenge> UpdateChallengeStatusAsync(int id, EStatus status);
        //Task AddAsync(Challenge challenge);
        //Task<Challenge> GetByIdAsync(int id);
        //Task<IEnumerable<Challenge>> GetChallengesByStatusAsync(EStatus status);
        //Task UpdateAsync(Challenge challenge);
        Task<Challenge> CreateChallengeAsync(ChallengeDto challengeDto);
        Task<IEnumerable<Challenge>> GetActiveChallengesAsync();
        Task<IEnumerable<Challenge>> GetFinishedChallengesAsync();
        Task<Challenge> GetChallengeByIdAsync(int id);
        Task<Challenge> UpdateChallengeStatusAsync(int id, EStatus status);
    }
}
