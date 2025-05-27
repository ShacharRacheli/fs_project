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
            CreateMap<User, GetUserDto>().ReverseMap();
            CreateMap<Image,ImageDto>().ReverseMap();
            CreateMap<Challenge,ChallengeDto>().ReverseMap();
            CreateMap<Vote,VoteDto>().ReverseMap();
            CreateMap<Image,TopImageDTO>().ReverseMap();

        }
    }
}
