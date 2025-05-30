using Comp.Core.DTOs;
using Comp.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Comp.Core.IServices
{
    public interface IUserService
    {
         Task<IEnumerable<User>> GetAllAsync();
         Task<User> GetUserByEmailPasswordAsync( UserLoginDto user);
         Task<bool> AddUserAsync(User user);
        Task<bool> UpdateUserAsync(int id, User user);
        Task<bool> DeleteUserAsync(int id);
       Task<User> GetUserByIDAsync(int id);

    }
}
