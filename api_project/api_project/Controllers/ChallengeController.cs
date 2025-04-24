using AutoMapper;
using Comp.Core.DTOs;
using Comp.Core.IServices;
using Comp.Core.Models;
using Comp.Service.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Comp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChallengeController : ControllerBase
    {
        private readonly IChallengeService _challengeService;
        private readonly IMapper _mapper;


        public ChallengeController(IChallengeService challengeService, IMapper mapper)
        {
            _challengeService = challengeService;
            _mapper = mapper;
        }
        // GET: api/<ChallengeController>
        [HttpGet("getAllChallenges")]
        public async Task<ActionResult<IEnumerable<Challenge>>> Get()
        {
            var challengesList = await _challengeService.GetAllChallengesAsync();
            return Ok(challengesList);
        }

        [HttpGet("getChallengeVotes")]
        public async Task<ActionResult<IEnumerable<ChallengeVotesDTO>>> GetChallengeVotes()
        {
            var challengesVoteList = await _challengeService.GetChallengeVotesAsync();
            return Ok(challengesVoteList);
        }
        //// POST api/<ChallengeController>

        //[HttpPost]
        //public async Task<ActionResult> Post([FromBody] ChallengeDto challenge)
        //{
        //    var cha = await _challengeService.AddNewChallengeAsync(challenge);
        //    var ch = _mapper.Map<Challenge>(challenge);
        //        return Ok(challenge);
        //    return NotFound();
        //}


        [HttpPost("createChallenge")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult> CreateChallenge([FromBody] ChallengeDto challengeDto)
        {
            //Console.WriteLine("in add chaleng+++++++++++++++++==");
            var challenge = await _challengeService.CreateChallengeAsync(challengeDto);
            var challengeResult = _mapper.Map<ChallengeDto>(challenge);
            return Ok(challengeResult);
        }

        // הצגת אתגרים פעילים
        [HttpGet("activeChallenges")]
        public async Task<IActionResult> GetActiveChallenges()
        {
            var challenges = await _challengeService.GetActiveChallengesAsync();
            var challengeDtos = _mapper.Map<IEnumerable<ChallengeDto>>(challenges);
            return Ok(challengeDtos);
        }

        // הצגת אתגרים קודמים
        [HttpGet("notActiveChallenges")]
        public async Task<IActionResult> GetFinishedChallenges()
        {
            var challenges = await _challengeService.GetFinishedChallengesAsync();
            //var challengeDtos = _mapper.Map<IEnumerable<ChallengeDto>>(challenges);
            return Ok(challenges);
            //return Ok(challengeDtos);
        }

        // הצגת תיאור של אתגר
        [HttpGet("getChallengeById/{id}")]
        public async Task<IActionResult> GetChallengeById(int id)
        {
            var challenge = await _challengeService.GetChallengeByIdAsync(id);
            if (challenge == null)
                return NotFound();
            var challengeDto = _mapper.Map<ChallengeDto>(challenge);
            return Ok(challengeDto);
        }

        // עדכון סטטוס אתגר
        [HttpPut("update-status/{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> UpdateChallengeStatus(int id, [FromBody] EStatus status)
        {
            var updatedChallenge = await _challengeService.UpdateChallengeStatusAsync(id, status);
            var challengeDto = _mapper.Map<ChallengeDto>(updatedChallenge);
            return Ok(challengeDto);
        }
    }
}
