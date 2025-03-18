using Amazon.S3;
using Comp.Core.DTOs;
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
    public class ImageService : IImageService
    {
        private readonly IImageRepository _imageRepository;
        private readonly IS3Service _s3Service;

        public ImageService(IImageRepository imageRepository, IS3Service s3Service)
        {
            _imageRepository = imageRepository;
            _s3Service = s3Service;
        }
        public async Task<IEnumerable<Image>> GetAllImagesAsync()
        {
            return await _imageRepository.GetAllImagesAsync();
        }

        public async Task<int> GetVoteCountAsync(int imageId)
        {
            return await _imageRepository.GetVoteCountByImageIdAsync(imageId);
        }
        //public async Task<Image> GetTopImageByChallengeAsync(int challengeId)
        //{
        //    // שליפת התמונות המובילות
        //    return await _imageRepository.GetTopImageByChallengeAsync(challengeId);
        //}
        public async Task<TopImageDTO> GetTopImageByChallengeAsync(int challengeId)
        {
            // שליפת התמונות המובילות
            return await _imageRepository.GetTopImageByChallengeAsync(challengeId);
        }
        //public async Task<bool> AddImageAsync(Image image)
        //{
        //    if (image != null)
        //    {
        //        image.UploadedAt = DateTime.Now;
        //    }
        //    return await _imageRepository.AddImageAsync(image);
        //}
        public async Task<Image> AddImageAsync(Image image)
        {
            return await _imageRepository.AddImageAsync(image);
        }
        public async Task<Image> UploadImageAsync(int userId, int challengeId, Stream fileStream, string fileName)
        {
            await ListBucketsAsync();
            // העלאת התמונה ל-S3
            var imageUrl = await _s3Service.UploadFileAsync(fileStream, fileName);

            // יצירת אובייקט Image
            var image = new Image
            {
                UserId = userId,
                ChallengeId = challengeId,
                ImageUrl = imageUrl,
                UploadedAt = DateTime.Now
            };

            // שמירת התמונה בבסיס הנתונים
            return await _imageRepository.AddImageAsync(image);
        }

        public async Task ListBucketsAsync()
        {
            using (var client = new AmazonS3Client())
            {
                var response = await client.ListBucketsAsync();
                foreach (var bucket in response.Buckets)
                {
                    Console.WriteLine($"Bucket: {bucket.BucketName}");
                }
            }
        }
        public async Task<Stream> DownloadImageAsync(int id)
        {
            var image = await _imageRepository.GetImageByIdAsync(id);
            if (image == null) return null;

            return await _s3Service.DownloadFileAsync(image.ImageUrl);
        }

        public async Task<bool> DeleteImageAsync(int id, int userId, bool isAdmin)
        {
            var image = await _imageRepository.GetImageByIdAsync(id);
            if (image == null) return false;

            // בדיקה אם המשתמש הוא הבעלים של התמונה או ADMIN
            if (isAdmin || image.UserId == userId)
            {
                // מחיקה מה-S3
                await _s3Service.DeleteFileAsync(image.ImageUrl);
                return await _imageRepository.DeleteImageAsync(id);
            }
            return false;
        }
        public async Task<List<Image>> GetImagesByChallengeAsync(int challengeId)
        {
            return await _imageRepository.GetImagesByChallengeAsync(challengeId);
        }
        public async Task<bool> UserUploadedAlready(int userId, int challengeId)
        {
            return await _imageRepository.UserUploadedAlready(userId, challengeId);
        }
    }
}
