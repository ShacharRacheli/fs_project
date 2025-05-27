using Amazon.S3.Model;
using Amazon.S3;
using AutoMapper;
using Comp.Core.DTOs;
using Comp.Core.IServices;
using Comp.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Comp.Service.Services;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Comp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly IImageService _imageService;
        private readonly IMapper _mapper;
        private readonly IS3Service _s3Service;

        public ImageController(IImageService imageService, IMapper mapper,IS3Service s3Service)
        {
            _imageService = imageService;
            _mapper = mapper;
            _s3Service = s3Service;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Image>>> Get()
        {
            var imagesList = await _imageService.GetAllImagesAsync();
            return Ok(imagesList);
        }
        [HttpGet("challenge/{challengeId}")]
        public async Task<IActionResult> GetImagesByChallenge(int challengeId)
        {
            var images = await _imageService.GetImagesByChallengeAsync(challengeId);
            var imageDTOs = _mapper.Map<List<ImageDto>>(images);
            return Ok(imageDTOs);
        }
   

        [HttpGet("CountVotes/{id}")]
        public async Task<ActionResult> GetVoteCount(int id)
        {
            var count = await _imageService.GetVoteCountAsync(id);
            return Ok(count);
        }
        [HttpGet("topImageOfChallenge/{id}")]
        public async Task<ActionResult> GetTopImageByChallenge(int id)
        {          
                var image = await _imageService.GetTopImageByChallengeAsync(id);
                if (image == null)
                {
                    return NotFound("No top images found for this challenge.");
                }
                //var imageDto = _mapper.Map<ImageDto>(image);
                //imageDto.UserName
                //return Ok(imageDto);
                return Ok(image);
        }
        [HttpGet("presigned-url")]
        [Authorize]
        public async Task<ActionResult> GetPresignedUrl([FromQuery] string fileName, [FromQuery] string contentType, [FromQuery] int challengeId)
        {
            if (string.IsNullOrEmpty(fileName))
                return BadRequest("Missing file name");
            var userIdClaim =User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
                return Unauthorized("Invalid user ID");
            if (!await _imageService.UserUploadedAlready(userId, challengeId))
                return Forbid("You can't upload more than 1 image");
            var url = await _s3Service.GetPresignedUrlAsync(fileName, contentType);
            return Ok(new { url });
        }
        [HttpGet("getImageUrl")]
        public async Task<IActionResult> GetDownloadUrl([FromQuery] string fileName)
        {
            if (string.IsNullOrEmpty(fileName))
                return BadRequest("File name is required");

            var downloadUrl = await _s3Service.GetDownloadUrlAsync(fileName);
            return Ok(new { Url = downloadUrl });
        }
        [HttpPost("addImageToDB")]
        [Authorize]
        public async Task<ActionResult> UploadImageSuccessful([FromBody] ImageDto image)
        {
            if (image == null)
                return BadRequest("Invalid image data");
            var imageDto=_mapper.Map<Image>(image);
             await _imageService.AddImageAsync(imageDto);
            return Ok(new {newImage=image});
        }      
    }
}
