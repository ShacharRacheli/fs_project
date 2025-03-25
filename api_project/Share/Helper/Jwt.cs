using Comp.Core.Models;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Reflection.Metadata;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Share.Helper
{
    public class Jwt
    {
        //private const string SecretKey = "ThisisaverylongsecretkeyJWT123456"; 
        //private const string SecretKey = Environment.GetEnvironmentVariable("JWT_KEY")
        // ?? throw new InvalidOperationException("JWT_SECRET is not set");
        //public static string GenerateJwtToken(int userId, string username)
        public static string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            var secretKey = Environment.GetEnvironmentVariable("JWT_KEY")
                          ?? throw new InvalidOperationException("JWT_SECRET is not set");
            var issuer = Environment.GetEnvironmentVariable("JWT_ISSUER") ?? "https://fs-project-qz0v.onrender.com";
            var audience = Environment.GetEnvironmentVariable("JWT_AUDIENCE") ?? "https://fs-project-qz0v.onrender.com";
            //var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secretKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.FullName),
                    new Claim(ClaimTypes.Role, user.Role.ToString()),
                    new Claim(ClaimTypes.Email, user.Email)
                }),
                Expires = DateTime.UtcNow.AddHours(4),
                Issuer = issuer, 
                Audience = audience, 
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
