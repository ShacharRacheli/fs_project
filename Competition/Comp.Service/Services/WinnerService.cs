using Comp.Core.IRepositories;
using Comp.Core.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Comp.Service.Services
{
    public class WinnerService:IWinnerService
    {
        private readonly IWinnerRepository _winnerRepository;
        public WinnerService(IWinnerRepository winnerRepository)
        {
            _winnerRepository = winnerRepository;   
        }

    }
}
