﻿using AutoMapper;
using Comp.Core.DTOs;
using Comp.Core.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Comp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VoteController : ControllerBase
    {
        private readonly IVoteService _voteService;
        private readonly IMapper _mapper;

        public VoteController(IVoteService voteService, IMapper mapper)
        {
            _voteService = voteService;
            _mapper = mapper;
        }

        [Authorize]
        [HttpGet("HasVoted")]
        public async Task<IActionResult> HasVoted([FromQuery]int imageId,[FromQuery]int userId)
        {
            bool res= await _voteService.HasVotedAsync(imageId,userId);
            return Ok(res);
        }
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> VoteImage([FromBody] VoteDto voteRequest)
        {
            //var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            //if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
            //    return Unauthorized("Invalid user ID");
            if(await _voteService.IsSelfVotingAsync(voteRequest.ImageId,voteRequest.UserId))
                return BadRequest("You cannot vote for your own image.");
            var vote = await _voteService.VoteImageAsync(voteRequest.UserId, voteRequest.ImageId);
            if (vote == null)
            {
                return BadRequest("User has already voted for this image.");
            }
            var voteDto = _mapper.Map<VoteDto>(vote);
            return Ok(voteDto);
        }



        [HttpDelete("deleteVote")]
        [Authorize]
        public async Task<bool> Delete([FromBody] VoteDto voteRequest)
        {
            //var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            //if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
            //    return Unauthorized("Invalid user ID");
            return await _voteService.DeleteVoteAsync(voteRequest.UserId, voteRequest.ImageId);
        }
    }
}
