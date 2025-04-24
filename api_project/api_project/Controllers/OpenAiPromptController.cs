using Comp.Core.IServices;
using Comp.Service.Services;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Comp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OpenAiPromptController : ControllerBase
    {
        //private readonly IOpenAiService _openAiService;
        //private readonly HttpClient _httpClient;

        //public OpenAiPromptController(IOpenAiService openAiService)
        //{
        //    _openAiService = openAiService;
        //}

        //[HttpPost]
        //public async Task<IActionResult> GetSuggestions([FromBody] ChallengePromptRequest requestPrompt)
        //{
               private readonly HttpClient client = new HttpClient();

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ChallengePromptRequest gptRequest)
        {
            try
            {
                var content = $"האתגר בנושא: {gptRequest.Topic}\nתיאור האתגר: {gptRequest.Description}\nתן לי רעיונות מקוריים ומתאימים לפרומפטים לתמונה.";

                var prompt = new
                {
                    model = "gpt-4o-mini",
                    messages = new[] {
                new { role = "user", content = content }
            }
                };

                var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions")
                {
                    Content = JsonContent.Create(prompt)
                };
                request.Headers.Add("Authorization", $"Bearer {Environment.GetEnvironmentVariable("OPEN_AI_KEY")}");

                var response = await client.SendAsync(request);
                if (!response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    throw new Exception($"שגיאה ב-OpenAI. סטטוס: {response.StatusCode}. תשובה: {responseContent}");
                }

                var responseJson = await response.Content.ReadAsStringAsync();
                var jsonDoc = JsonDocument.Parse(responseJson);
                var contentText = jsonDoc.RootElement
                    .GetProperty("choices")[0]
                    .GetProperty("message")
                    .GetProperty("content")
                    .GetString();

                var suggestions = contentText
                    .Split('\n')
                    .Where(line => !string.IsNullOrWhiteSpace(line))
                    .Select(line => line.Trim().TrimStart('-', '*', '•').Trim())
                    .ToList();

                return Ok(new { prompts = suggestions });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"שגיאה: {ex.Message}");
                return StatusCode(500, "שגיאה כלשהי במהלך הפעולה.");
            }
        }

        //try
        //{
        //    var prompt = $"The challenge on the topic: {requestPrompt.Topic}\nDescription of the challenge: {requestPrompt.Description}\nGive me ideas for prompts for an image.";
        //    var promptToRequest = new
        //    {
        //        model = "gpt-4o-mini",
        //        messages = new[] {
        //        new { role = "system", content = prompt},
        //        //new { role = "user", content = gptRequest.Question }
        //        }
        //    };
        //    var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions")
        //    {
        //        Content = JsonContent.Create(promptToRequest)
        //    };
        //    request.Headers.Add("Authorization", $"Bearer {Environment.GetEnvironmentVariable("OPEN_AI_KEY")}");

        //    // שליחת הבקשה ל-API
        //    var response = await _httpClient.SendAsync(request);

        //    if (!response.IsSuccessStatusCode)
        //    {
        //        var responseContent = await response.Content.ReadAsStringAsync();
        //        throw new Exception($"לא הצלחנו לנתח את המידע. סטטוס: {response.StatusCode}. תשובה: {responseContent}");
        //    }

        //    var prompts = await response.Content.ReadAsStringAsync();
        //    return Ok(new { prompts }); // החזרת התוכן כהצלחה
        //}
        //catch (HttpRequestException httpEx)
        //{
        //    Console.WriteLine($"שגיאה בחיבור ל-API: {httpEx.Message}");
        //    return StatusCode(500, "בעיה בחיבור ל-API.");
        //}
        //catch (System.Text.Json.JsonException jsonEx)
        //{
        //    Console.WriteLine($"שגיאה בקריאת התשובה מ-API: {jsonEx.Message}");
        //    return StatusCode(500, "שגיאה בקריאת התשובה מ-API.");
        //}
        //catch (Exception ex)
        //{
        //    Console.WriteLine($"שגיאה כללית: {ex.Message}");
        //    return StatusCode(500, "שגיאה כלשהי במהלך הפעולה.");
        //}
        //var prompts = await _openAiService.GetPromptSuggestionsAsync(request.Topic, request.Description);
        //return Ok(new { prompts });
   
}
    public class ChallengePromptRequest
    {
        public string Topic { get; set; }
        public string Description { get; set; }
    }
    }
