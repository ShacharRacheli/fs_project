using Comp.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Comp.Core.IServices
{
    public interface IImageService
    {
        Task<IEnumerable<Image>> GetAllImagesAsync();
        Task<List<Image>> GetImagesByChallengeAsync(int challengeId);
        Task<int> GetVoteCountAsync(int imageId);
        Task<Image> GetTopImageByChallengeAsync(int challengeId);
        //Task<bool> AddImageAsync(Image image);
        //Task UploadImageAsync(int userId, int challengeId, Stream stream, string fileName);
        Task<Image> UploadImageAsync(int userId, int challengeId, Stream fileStream, string fileName);
        //Task<Image> UploadImageAsync(int userId, int challengeId, Stream fileStream, string fileName);
        Task<Stream> DownloadImageAsync(int id);
        Task ListBucketsAsync();
        Task<Image> AddImageAsync(Image image);
        Task<bool> DeleteImageAsync(int id, int userId, bool isAdmin); // עדכון מחיקה עם בקרת גישה
    }
}
