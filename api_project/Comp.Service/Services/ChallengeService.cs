﻿using Comp.Core.DTOs;
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
        private readonly IUserRepository _userRepository;
        private readonly IEmailService _emailService;

        public ChallengeService(IChallengeRepository challengeRepository, IEmailService emailService,IUserRepository userRepository)
        {
            _challengeRepository = challengeRepository;
            _emailService = emailService;
            _userRepository = userRepository;
        }
        public async Task<IEnumerable<Challenge>> GetAllChallengesAsync()
        {
            return await _challengeRepository.GetAllChallengesAsync();
        }
        public async Task<Challenge> CreateChallengeAsync(ChallengeDto challengeDto)
        {
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
            return await _challengeRepository.GetChallengesByStatusAsync(EStatus.notActive);
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
                challenge.Status = EStatus.notActive;
                await _challengeRepository.UpdateAsync(challenge);
            }
            return challenge;
        }
        public async Task ProcessExpiredChallengesAsync()
        {
            var expiredChallenges = await _challengeRepository.GetExpiredChallengesAsync();
            foreach (var challenge in expiredChallenges)
            {
                var winnerId = await _challengeRepository.GetWinnerByTopImageAsync(challenge.Id);
                var winner = await _userRepository.GetUserByIDAsync((int)winnerId);
                if (winner == null) continue; 

                var subject = "You won the challenge!";
                var body = $"Congratulations {winner.FullName}! You won the challenge '{challenge.Title}' 🎉";

                await _emailService.SendEmailAsync(winner.Email, subject, body);
                await _challengeRepository.UpdateAsync(challenge);
            }
        }
        public async Task<IEnumerable<ChallengeVotesDTO>> GetChallengeVotesAsync()
        {
            return await _challengeRepository.GetChallengeVotesAsync();
        }

    }
}
