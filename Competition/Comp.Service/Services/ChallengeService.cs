using Comp.Core.DTOs;
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
    public class ChallengeService:IChallengeService
    {
        private readonly IChallengeRepository _challengeRepository;
        public ChallengeService(IChallengeRepository challengeRepository)
        {
            _challengeRepository = challengeRepository;
        }
        public async Task<IEnumerable<Challenge>> GetAllChallengesAsync()
        {
            return await _challengeRepository.GetAllChallengesAsync();
        }
        //public async Task<Challenge> AddNewChallengeAsync(ChallengeDto challengeDto)
        //{
        //  return await _challengeRepository.AddNewChallengeAsync();
        //}
        public async Task<Challenge> CreateChallengeAsync(ChallengeDto challengeDto)
        {
            Console.WriteLine("in add chalengserviceeeee++++++==");

            var challenge = new Challenge
            {
                Title = challengeDto.Title,
                Description = challengeDto.Description,
                StartDate =DateTime.Now,
                EndDate = DateTime.Now.AddDays(7),
                Status = EStatus.active
            };

            await _challengeRepository.AddNewChallengeAsync(challenge);
            return challenge;
        }

        public async Task<IEnumerable<Challenge>> GetActiveChallengesAsync()
        {
            return await _challengeRepository.GetChallengesByStatusAsync(EStatus.active);
        }

        public async Task<IEnumerable<Challenge>> GetFinishedChallengesAsync()
        {
            return await _challengeRepository.GetChallengesByStatusAsync(EStatus.finished);
        }

        public async Task<Challenge> GetChallengeByIdAsync(int id)
        {
            return await _challengeRepository.GetByIdAsync(id);
        }

        public async Task<Challenge> UpdateChallengeStatusAsync(int id, EStatus status)
        {
            var challenge = await _challengeRepository.GetByIdAsync(id);
            if (challenge != null)
            {
                challenge.Status = status;
                await _challengeRepository.UpdateAsync(challenge);
            }
            return challenge;
        }

    }
}
