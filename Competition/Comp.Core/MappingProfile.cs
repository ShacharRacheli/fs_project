using AutoMapper;
using Comp.Core.DTOs;
using Comp.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Comp.Core
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<User, UserUpdateDto>().ReverseMap();
            CreateMap<Image,ImageDto>().ReverseMap();
            CreateMap<Challenge,ChallengeDto>().ReverseMap();
            CreateMap<Vote,VoteDto>().ReverseMap();
            CreateMap<Image,TopImageDTO>().ReverseMap();
//            CreateMap<UserDto, User>()
//.ForMember(dest => dest.Password, opt => opt.MapFrom(src => VPassword.HashPassword(src.Password)))  // הצפנת הסיסמה
//.ForMember(dest => dest.Role, opt => opt.MapFrom(src => Enum.IsDefined(typeof(ERole), src.Role) ? (ERole)Enum.Parse(typeof(ERole), src.Role) : ERole.user));  // המרת Role מ-String ל-ERole

            //CreateMap<UserDto, User>()
            //   .ForMember(dest => dest.Role, opt => opt.MapFrom(src =>
            //   {
            //       ERole role;
            //       if (Enum.TryParse(src.Role, true, out role))
            //       {
            //           return role; // החזרת הערך המומר
            //       }
            //       return 1; // ערך ברירת מחדל במקרה של שגיאה
            //   })).ReverseMap();
        }
    }
}
