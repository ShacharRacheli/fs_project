using Comp.Core.IServices;
using Comp.Service.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Comp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OpenAiPromptController : ControllerBase
    {
        //private readonly IOpenAiService _openAiService;
        private readonly HttpClient _httpClient;

        //public OpenAiPromptController(IOpenAiService openAiService)
        //{
        //    _openAiService = openAiService;
        //}

        [HttpPost]
        public async Task<IActionResult> GetSuggestions([FromBody] ChallengePromptRequest requestPrompt)
        {
            try
            {
                var prompt = $"The challenge on the topic: {requestPrompt.Topic}\nDescription of the challenge: {requestPrompt.Description}\nGive me ideas for prompts for an image.";
                var promptToRequest = new
                {
                    model = "gpt-4o-mini",
                    messages = new[] {
                    new { role = "system", content = prompt},
                    //new { role = "user", content = gptRequest.Question }
                    }
                };
                var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions")
                {
                    Content = JsonContent.Create(promptToRequest)
                };
                request.Headers.Add("Authorization", $"Bearer {Environment.GetEnvironmentVariable("OPEN_AI_KEY")}");

                // שליחת הבקשה ל-API
                var response = await _httpClient.SendAsync(request);

                if (!response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    throw new Exception($"לא הצלחנו לנתח את המידע. סטטוס: {response.StatusCode}. תשובה: {responseContent}");
                }

                var prompts = await response.Content.ReadAsStringAsync();
                return Ok(new { prompts }); // החזרת התוכן כהצלחה
            }
            catch (HttpRequestException httpEx)
            {
                Console.WriteLine($"שגיאה בחיבור ל-API: {httpEx.Message}");
                return StatusCode(500, "בעיה בחיבור ל-API.");
            }
            catch (System.Text.Json.JsonException jsonEx)
            {
                Console.WriteLine($"שגיאה בקריאת התשובה מ-API: {jsonEx.Message}");
                return StatusCode(500, "שגיאה בקריאת התשובה מ-API.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"שגיאה כללית: {ex.Message}");
                return StatusCode(500, "שגיאה כלשהי במהלך הפעולה.");
            }
            //var prompts = await _openAiService.GetPromptSuggestionsAsync(request.Topic, request.Description);
            //return Ok(new { prompts });
        }
    }
    public class ChallengePromptRequest
    {
        public string Topic { get; set; }
        public string Description { get; set; }
    }
    }
