using Comp.Core.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Comp.Data.Reposirories
{
    public class WinnerRepository:IWinnerRepository
    {
        private readonly DataContext _dataContext;
        public WinnerRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
    }
}
