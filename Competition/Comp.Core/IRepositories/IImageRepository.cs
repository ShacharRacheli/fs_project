using Comp.Core.DTOs;
using Comp.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Comp.Core.IRepositories
{
    public interface IImageRepository
    {
        Task<IEnumerable<Image>> GetAllImagesAsync();
        Task<Image> AddImageAsync(Image image);
        Task<Image> GetImageByIdAsync(int id);
        Task<int> GetVoteCountByImageIdAsync(int imageId);
        Task<bool> DeleteImageAsync(int id);
        Task<List<Image>> GetImagesByChallengeAsync(int challengeId);
        Task<TopImageDTO> GetTopImageByChallengeAsync(int challengeId);
        //Task<Image>GetTopImageByChallengeAsync(int challengeId);
      Task<bool> UserUploadedAlready(int userId, int challengeId);
    }
}
