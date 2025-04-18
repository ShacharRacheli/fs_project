﻿using Comp.Core.IServices;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Comp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WinnerController : ControllerBase
    {
        private readonly IWinnerService _winnerService;
        public WinnerController(IWinnerService winnerService)
        {
            _winnerService = winnerService;
        }
        // GET: api/<WinnerController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<WinnerController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<WinnerController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<WinnerController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<WinnerController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
