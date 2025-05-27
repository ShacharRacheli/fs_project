using AutoMapper;
using Comp.Core.DTOs;
using Comp.Core.IRepositories;
using Comp.Core.IServices;
using Comp.Core.Models;
using Share.Helper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Comp.Service.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository,IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }
        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _userRepository.getAllUsersAsync();
        }
        public async Task<User> GetUserByEmailPasswordAsync(UserLoginDto user)
        {
               var user1= await _userRepository.GetUserByEmailPasswordAsync(user);
            return user1;
        }
        public async Task<bool> AddUserAsync(User user)
        {
            if (user != null)
            {             
                user.JoiningDate = DateTime.Now;
                if (await _userRepository.EmailExistsAsync(user.Email))
                {
                    return false; 
                }
                user.Role = ERole.user;
                user.Password = VPassword.HashPassword(user.Password);                
            }
            return await _userRepository.AddUserAsync(user);         
        }
        public async Task<bool> UpdateUserAsync(int id, User user)
        {
            return await _userRepository.updateUserAsync(id, user);
        }
        public async Task<bool> DeleteUserAsync(int id)
        {
            return await _userRepository.deleteUserAsync(id);
           
        }
    }
}
