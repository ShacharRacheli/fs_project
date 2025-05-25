using Comp.Core.DTOs;
using Comp.Core.IRepositories;
using Comp.Core.Models;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Storage.Internal.Json;
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
            return await _dataContext.Images.ToListAsync();
        }

        public async Task<List<Image>> GetImagesByChallengeAsync(int challengeId)
        {
            return await _dataContext.Images
                .Where(i => i.ChallengeId == challengeId)
                .ToListAsync();
        }
        public async Task<int> GetVoteCountByImageIdAsync(int imageId)
        {
            var image = await _dataContext.Images.FindAsync(imageId);
            return image?.CountVotes ?? 0; 
        }
        public async Task<Image> AddImageAsync(Image image)
        {
          await _dataContext.AddAsync(image);
             await _dataContext.SaveChangesAsync();
            Console.WriteLine(image.FileName+image.ChallengeId+"jgfds");
            return image;
        }
        public async Task<Image> GetImageByIdAsync(int id)
        {
            return await _dataContext.Images.FirstOrDefaultAsync(x => x.Id == id);
        }
        //public async Task<Image> GetImageByIdAsync(int id)
        //{
        //    return await _context.Images.Include(i => i.User).FirstOrDefaultAsync(i => i.ID == id);
        //}
        public async Task<TopImageDTO> GetTopImageByChallengeAsync(int challengeId)
        {
            var topImage = await _dataContext.Images
            .Where(img => img.ChallengeId == challengeId)
            .OrderByDescending(img => img.CountVotes)
            .FirstOrDefaultAsync();
            var user = await _dataContext.Users
        .FirstOrDefaultAsync(u => u.Id == topImage.UserId);

            var topImageDTO = new TopImageDTO
            {
                Id = topImage.Id,
                UserId = topImage.UserId,
                ImageUrl = topImage.ImageUrl,
                CountVotes = topImage.CountVotes,
                FileName = topImage.FileName,
                UserName = user?.FullName,
            };
            return topImageDTO;
        }
        public async Task<bool> DeleteImageAsync(int id)
        {
            var image = await _dataContext.Images.FindAsync(id);
            if (image == null) return false;

            _dataContext.Images.Remove(image);
            await _dataContext.SaveChangesAsync();
            return true;
        }
        public async Task<bool> UserUploadedAlready(int userId,int challengeId)
        {         
                var exists = await _dataContext.Images
                    .AnyAsync(i => i.UserId == userId && i.ChallengeId == challengeId);
                return !exists;    
        }
     

    }
}
