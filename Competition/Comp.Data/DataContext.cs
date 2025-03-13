using Comp.Core.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//using Pomelo.EntityFrameworkCore.MySql.Infrastructure;

namespace Comp.Data
{
    public class DataContext:DbContext
    {
        public DbSet<User> UsersList { get; set; }
        public DbSet<Vote> VoteList { get; set; }
        public DbSet<Challenge> ChallengeList { get; set; }
        public DbSet<Image> ImagesList { get; set; }
        public DbSet<Winners> WinnersList { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=Competition1");
            //optionsBuilder.UseMySql("server=localhost;database=competition;user=root;password=Rs0583237001",
            //    new MySqlServerVersion(new Version(8, 0, 21))); 
        }
    }
}
