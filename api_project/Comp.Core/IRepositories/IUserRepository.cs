using Comp.Core.DTOs;
using Comp.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Comp.Core.IRepositories
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> getAllUsersAsync();
        Task<User> GetUserByIDAsync(int id);
        Task<User> GetUserByEmailPasswordAsync( UserLoginDto user);
        Task<bool> AddUserAsync(User user);
        Task<bool> updateUserAsync(int id, User user);
        Task<bool> deleteUserAsync(int id);
        Task<bool> EmailExistsAsync(int id,string email);
        Task<bool> EmailExistsAsync(string email);
    }
}
