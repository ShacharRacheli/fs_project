using AutoMapper;
using Comp.Core.DTOs;
using Comp.Core.IServices;
using Comp.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Share.Helper;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Comp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public UserController(IUserService userService, IMapper mapper, IConfiguration configuration)
        {
            _userService = userService;
            _mapper = mapper;
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> Get()
        {
            var userList = await _userService.GetAllAsync();
            //var userListDto = new List<GetUserDto>();
            //foreach (var user in userList)
            //{
            //    userListDto.Add(_mapper.Map<GetUserDto>(user));
            //}
            return Ok(userList);
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] UserLoginDto userLogin)
        {
            User user = await _userService.GetUserByEmailPasswordAsync(userLogin);
            if (user != null&&!user.IsDeleted)
            {
                if (VPassword.VerifyPassword(userLogin.Password, user.Password)) 
                {
                    var token = Jwt.GenerateJwtToken(user);
                    return Ok(new { Token = token });
                }
            }
            return Unauthorized();
        }
        [HttpPost("loginManager")]
        public async Task<ActionResult> LoginManager([FromBody] UserLoginDto userLogin)
        {
            User user = await _userService.GetUserByEmailPasswordAsync(userLogin);
            if (user != null && !user.IsDeleted&&user.Role.Equals("admin"))
            {
                if (VPassword.VerifyPassword(userLogin.Password, user.Password))  // תוודא שהסיסמה נכונה
                {
                    // הפונקציה מייצרת את ה-JWT עם מזהה המשתמש, שם המשתמש, כתובת האימייל והתפקיד
                    var token = Jwt.GenerateJwtToken(user);
                    // מחזירים את ה-JWT ללקוח
                    return Ok(new { Token = token });
                }
            }
            return Unauthorized();
        }
        // POST api/<UserController>
        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] UserDto user)
        {       
            if (string.IsNullOrEmpty(user.Email) || string.IsNullOrEmpty(user.Password))
            {
                return BadRequest("Email and Password are required.");
            }
            //if (!Enum.TryParse(user.Role, true, out ERole role))
            //{
            //    return BadRequest("Invalid role.");
            //}
            var newUser = _mapper.Map<User>(user);
            //newUser.Role = role;
            var userAdded = await _userService.AddUserAsync(newUser);
            if (!userAdded)
            {
                return BadRequest("User registration failed. Email may already exist.");
            }
            var token = Jwt.GenerateJwtToken(newUser);
            return Ok(new { Token = token });
        }

        [HttpPost("registerAdmin")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult> RegisterAdmin([FromBody] UserDto user)
        {
            if (string.IsNullOrEmpty(user.Email) || string.IsNullOrEmpty(user.Password))
            {
                return BadRequest("Email and Password are required.");
            }
            //if (!Enum.TryParse(user.Role, true, out ERole role))
            //{
            //    return BadRequest("Invalid role.");
            //}
            var newUser = _mapper.Map<User>(user);
            //newUser.Role = role;
            var userAdded = await _userService.AddUserAsync(newUser);
            if (!userAdded)
            {
                return BadRequest("User registration failed. Email may already exist.");
            }
            var token = Jwt.GenerateJwtToken(newUser);
            return Ok(new { Token = token });
        }
        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        //[Authorize]
        public async Task<ActionResult> Put(int id, [FromBody] UserUpdateDto user)
        {
            var userEntity = _mapper.Map<User>(user);
            userEntity.Id = id;
            //if (Enum.TryParse<ERole>(user.Role, out var role))
            //{
            //    userEntity.Role = role; // עדכון התפקיד
            //}
            var userUpdated = await _userService.UpdateUserAsync(id, userEntity);
            if (!userUpdated)
            {
                return NotFound();
            }
            // Generate a new JWT token if needed
            var token = Jwt.GenerateJwtToken(userEntity);
            return Ok(new { Token = token });
            //if (await _userService.UpdateUserAsync(id, _mapper.Map<User>(user)))
            //    return Ok();
            //return NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            if (await _userService.DeleteUserAsync(id))
                return Ok();
            return NotFound();
        }
        [HttpPatch("DeleteUser/{id}")]
        //[Authorize(Roles = "admin")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            if (await _userService.DeleteUserAsync(id))
                return Ok();
            return NotFound();
        }
    }
}
