using Comp.Core.DTOs;
using Comp.Core.IRepositories;
using Comp.Core.Models;
using Microsoft.EntityFrameworkCore;
using Share.Helper;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Comp.Data.Reposirories
{
    public class UserRepository:IUserRepository
    {
        private readonly DataContext _dataContext;
        public UserRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task<IEnumerable<User>> getAllUsersAsync()
        {
            return await _dataContext.Users.ToListAsync();  
        }
        public async Task<User> GetUserByIDAsync(int id)
        {
            return await _dataContext.Users.FirstOrDefaultAsync(u => u.Id == id);
        }
        public async Task<User> GetUserByEmailPasswordAsync(UserLoginDto user)
        {
            return await _dataContext.Users.FirstOrDefaultAsync(u => u.Email==user.Email);
        }
        public async Task<bool> EmailExistsAsync(int id,string email)
        {
            return await _dataContext.Users.AnyAsync(u => u.Email == email&&id!=u.Id);
        }
        public async Task<bool> EmailExistsAsync( string email)
        {
            return await _dataContext.Users.AnyAsync(u => u.Email == email);
        }
        public async Task<bool> AddUserAsync(User user)
        { 
           await _dataContext.Users.AddAsync(user);
           return await _dataContext.SaveChangesAsync() > 0;
        }
        public async Task<bool> updateUserAsync(int id, User user) 
        {
            var tempUser = await _dataContext.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (tempUser != null)
            {
                if (!string.IsNullOrEmpty(user.Email) && await EmailExistsAsync(id,user.Email))
                {
                    return false;
                }
                tempUser.FullName = user.FullName;
                tempUser.Email = user.Email;

                // עדכון סיסמה רק אם היא שונתה
                if (!string.IsNullOrEmpty(user.Password))
                {
                    tempUser.Password = VPassword.HashPassword(user.Password);
                }

                // עדכון תפקיד אם הוא שונה
                //if (tempUser.Role != user.Role)
                //{
                //    tempUser.Role = user.Role;
                //}

                return await _dataContext.SaveChangesAsync() > 0;
            }
            return false;
            // User tempUser=await _dataContext.UsersList.FirstOrDefaultAsync(u=>u.Id == id);
            // if (tempUser != null) 
            // { tempUser.FullName = user.FullName;
            //     tempUser.Email = user.Email;
            //     tempUser.Password = user.Password;
            // }
            //return await _dataContext.SaveChangesAsync() > 0;
        }
        public async Task<bool> deleteUserAsync(int id)
        {
            User user =await _dataContext.Users.FirstOrDefaultAsync(u=>u.Id == id);
            if (user != null) { 
            //_dataContext.UsersList.Remove(user);
            user.IsDeleted= !user.IsDeleted;
            }
            return await _dataContext.SaveChangesAsync()>0;
        }
    }
}
