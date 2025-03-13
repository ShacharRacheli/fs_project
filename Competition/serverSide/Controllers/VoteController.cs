using AutoMapper;
using Comp.Core.DTOs;
using Comp.Core.IServices;
using Microsoft.AspNetCore.Mvc;

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
        //// GET: api/<VoteController>
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        //// GET api/<VoteController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}
        [HttpPost]
        public async Task<IActionResult> VoteImage([FromBody] VoteDto voteRequest)
        {
            var vote = await _voteService.VoteImageAsync(voteRequest.UserId, voteRequest.ImageId);

            if (vote == null)
            {
                return BadRequest("User has already voted for this image.");
            }

            var voteDto = _mapper.Map<VoteDto>(vote);
            return Ok(voteDto);
        }

        // POST api/<VoteController>
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT api/<VoteController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        // DELETE api/<VoteController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
