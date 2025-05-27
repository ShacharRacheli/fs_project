using Comp.Core.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Comp.Data
{
    public class DataContext:DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Vote> Votes { get; set; }
        public DbSet<Challenge> Challenges { get; set; }
        public DbSet<Image> Images{ get; set; }
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
    }
}
