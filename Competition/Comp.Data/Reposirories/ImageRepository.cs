using Comp.Core.IRepositories;
using Comp.Core.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Comp.Data.Reposirories
{
    public class ImageRepository : IImageRepository
    {
        private readonly DataContext _dataContext;
        public ImageRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task<IEnumerable<Image>> GetAllImagesAsync()
        {
            return await _dataContext.ImagesList.ToListAsync();
        }

        public async Task<List<Image>> GetImagesByChallengeAsync(int challengeId)
        {
            return await _dataContext.ImagesList
                .Where(i => i.ChallengeId == challengeId)
                .ToListAsync();
        }
        public async Task<int> GetVoteCountByImageIdAsync(int imageId)
        {
            var image = await _dataContext.ImagesList.FindAsync(imageId);
            return image?.CountVotes ?? 0; // Return 0 if image is not found
        }
        public async Task<Image> AddImageAsync(Image image)
        {
          await _dataContext.AddAsync(image);
             await _dataContext.SaveChangesAsync();
            return image;
        }
        public async Task<Image> GetImageByIdAsync(int id)
        {
            return await _dataContext.ImagesList.FirstOrDefaultAsync(x => x.Id == id);
        }
        //public async Task<Image> GetImageByIdAsync(int id)
        //{
        //    return await _context.Images.Include(i => i.User).FirstOrDefaultAsync(i => i.ID == id);
        //}
        public async Task<Image> GetTopImageByChallengeAsync(int challengeId)
        {
            // שליפת כל התמונות לאתגר הנתון
            var topImage = await _dataContext.ImagesList
            .Where(img => img.ChallengeId == challengeId)
            .OrderByDescending(img => img.CountVotes)
            .FirstOrDefaultAsync(); 

            return topImage;
        }
        public async Task<bool> DeleteImageAsync(int id)
        {
            var image = await _dataContext.ImagesList.FindAsync(id);
            if (image == null) return false;

            _dataContext.ImagesList.Remove(image);
            await _dataContext.SaveChangesAsync();
            return true;
        }
    }
}
