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
        public DbSet<Winners> Winners { get; set; }
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    // Configure entity relationships and properties here if needed
        //    // Example:
        //    // modelBuilder.Entity<User>().HasKey(u => u.Id);
        //    // modelBuilder.Entity<Vote>().HasOne(v => v.User).WithMany(u => u.Votes);
        //}

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=Competition1");
        //    //optionsBuilder.UseMySql("server=localhost;database=competition;user=root;password=Rs0583237001",
        //    //    new MySqlServerVersion(new Version(8, 0, 21))); 
        //}
    }
}
