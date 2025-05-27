using Comp.Core.DTOs;
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
        Task<TopImageDTO> GetTopImageByChallengeAsync(int challengeId);
        //Task<Image> GetTopImageByChallengeAsync(int challengeId);
        //Task<bool> AddImageAsync(Image image);
        Task<Stream> DownloadImageAsync(int id);
        Task ListBucketsAsync();
        Task<Image> AddImageAsync(Image image);
        Task<bool> DeleteImageAsync(int id, int userId, bool isAdmin);
      Task<bool> UserUploadedAlready(int userId, int challengeId);

    }
}
