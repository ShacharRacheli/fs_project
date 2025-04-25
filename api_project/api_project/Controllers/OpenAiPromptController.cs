using Comp.Core.IServices;
using Comp.Service.Services;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.Json.Serialization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Comp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OpenAiPromptController : ControllerBase
    {
        private readonly HttpClient client = new HttpClient();

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ChallengePromptRequest request)
        {
            try
            {
                //var content = $"Title: {request.Topic}\nDescription: {request.Description}\nUser question: {request.UserQuestion}\nPlease provide a suitable response.";
                var payload = new
                {
                    model = "gpt-4o-mini",
                    messages=request.Messages
                    //    messages = new[]
                    //    {
                    //    new { role = "user", content }
                    //}
                };

                var httpRequest = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions")
                {
                    Content = JsonContent.Create(payload)
                };

                // Add authorization header
                httpRequest.Headers.Add("Authorization", $"Bearer {Environment.GetEnvironmentVariable("OPEN_AI_KEY")}");

                // Send the request to OpenAI API
                var response = await client.SendAsync(httpRequest);
                if (!response.IsSuccessStatusCode)
                {
                    var error = await response.Content.ReadAsStringAsync();
                    throw new Exception($"OpenAI Error: {response.StatusCode} - {error}");
                }

                // Parse the response from OpenAI
                var json = await response.Content.ReadAsStringAsync();
                var doc = JsonDocument.Parse(json);
                var replyContent = doc.RootElement
                    .GetProperty("choices")[0]
                    .GetProperty("message")
                    .GetProperty("content")
                    .GetString();

                //return Ok(new { prompts = new List<string> { replyContent } });
                return Ok(new { reply = replyContent });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, "An error occurred during the operation.");
            }
        }
    }
    public class ChallengePromptRequest
    {
        [JsonPropertyName("messages")]
        public List<ChatMessage> Messages { get; set; }
    }

    public class ChatMessage
    {
        [JsonPropertyName("role")]
        public string Role { get; set; }

        [JsonPropertyName("content")]
        public string Content { get; set; }
    }
    //private readonly IOpenAiService _openAiService;
    //private readonly HttpClient _httpClient;

    //public OpenAiPromptController(IOpenAiService openAiService)
    //{
    //    _openAiService = openAiService;
    //}

    //[HttpPost]
    //public async Task<IActionResult> GetSuggestions([FromBody] ChallengePromptRequest requestPrompt)
    //{
    //[HttpPost]
    //public async Task<IActionResult> Post([FromBody] ChallengePromptRequest gptRequest)
    //{
    //    try
    //    {
    //        //var content = $"האתגר בנושא: {gptRequest.Topic}\nתיאור האתגר: {gptRequest.Description}\nתן לי רעיונות מקוריים ומתאימים לפרומפטים לתמונה.";
    //        var content = $"The challenge on the topic: {gptRequest.Topic}\nDescription of the challenge: {gptRequest.Description}\nGive me original and suitable ideas for prompts for an image.";

    //        var prompt = new
    //        {
    //            model = "gpt-4o-mini",
    //            messages = new[] {
    //        new { role = "user", content = content }
    //    }
    //        };

    //        var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions")
    //        {
    //            Content = JsonContent.Create(prompt)
    //        };
    //        request.Headers.Add("Authorization", $"Bearer {Environment.GetEnvironmentVariable("OPEN_AI_KEY")}");

    //        var response = await client.SendAsync(request);
    //        if (!response.IsSuccessStatusCode)
    //        {
    //            var responseContent = await response.Content.ReadAsStringAsync();
    //            throw new Exception($"Error in-OpenAI. status: {response.StatusCode}. response: {responseContent}");
    //        }

    //        var responseJson = await response.Content.ReadAsStringAsync();
    //        var jsonDoc = JsonDocument.Parse(responseJson);
    //        var contentText = jsonDoc.RootElement
    //            .GetProperty("choices")[0]
    //            .GetProperty("message")
    //            .GetProperty("content")
    //            .GetString();

    //        var suggestions = contentText
    //            .Split('\n')
    //            .Where(line => !string.IsNullOrWhiteSpace(line))
    //            .Select(line => line.Trim().TrimStart('-', '*', '•').Trim())
    //            .ToList();

    //        return Ok(new { prompts = suggestions });
    //    }
    //    catch (Exception ex)
    //    {
    //        Console.WriteLine($"Error: {ex.Message}");
    //        //return StatusCode(500, "שגיאה כלשהי במהלך הפעולה.");
    //        return StatusCode(500, "An error occurred during the operation.");
    //    }
    //}
    //[HttpPost]
    //public async Task<IActionResult> Post([FromBody] ChallengePromptRequest gptRequest)
    //{
    // Define the ChallengePromptRequest class
    //public class ChallengePromptRequest
    //{
    //    public string Topic { get; set; }
    //    public string Description { get; set; }
    //    public string UserQuestion { get; set; }
    //}


    //try
    //{
    //    // הוסף את הכותרת והתיאור לשאלה
    //    var content = $"Title:{gptRequest.Topic}\nDescription:{gptRequest.Description}\nUser question: {gptRequest.UserQuestion}\nPlease provide a suitable response.";

    //    var prompt = new
    //    {
    //        model = "gpt-4o-mini",
    //        messages = new[] {
    //    new { role = "user", content = content }
    //}
    //    };

    //    var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions")
    //    {
    //        Content = JsonContent.Create(prompt)
    //    };
    //    request.Headers.Add("Authorization", $"Bearer {Environment.GetEnvironmentVariable("OPEN_AI_KEY")}");

    //    var response = await client.SendAsync(request);
    //    if (!response.IsSuccessStatusCode)
    //    {
    //        var responseContent = await response.Content.ReadAsStringAsync();
    //        throw new Exception($"Error in OpenAI. status: {response.StatusCode}. response: {responseContent}");
    //    }

    //    var responseJson = await response.Content.ReadAsStringAsync();
    //    var jsonDoc = JsonDocument.Parse(responseJson);
    //    var contentText = jsonDoc.RootElement
    //        .GetProperty("choices")[0]
    //        .GetProperty("message")
    //        .GetProperty("content")
    //        .GetString();

    //    return Ok(new { prompts = new List<string> { contentText } });
    //}
    //catch (Exception ex)
    //{
    //    Console.WriteLine($"Error: {ex.Message}");
    //    return StatusCode(500, "An error occurred during the operation.");
    //}
}


