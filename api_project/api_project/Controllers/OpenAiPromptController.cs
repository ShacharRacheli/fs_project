using Comp.Service.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Comp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OpenAiPromptController : ControllerBase
    {
        private readonly OpenAiService _openAiService;

        public OpenAiPromptController(OpenAiService openAiService)
        {
            _openAiService = openAiService;
        }

        [HttpPost]
        public async Task<IActionResult> GetSuggestions([FromBody] ChallengePromptRequest request)
        {
            var prompts = await _openAiService.GetPromptSuggestionsAsync(request.Topic, request.Description);
            return Ok(new { prompts });
        }
    }
    public class ChallengePromptRequest
    {
        public string Topic { get; set; }
        public string Description { get; set; }
    }
    }
