using Todo.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

public class TodoDbContext : DbContext
{
   readonly IConfiguration _configuration;
   readonly ILoggerFactory _loggerFactory;

   public TodoDbContext(IConfiguration configuration, ILoggerFactory loggerFactory)
   {
      _configuration = configuration;
      _loggerFactory = loggerFactory;
   }

   public DbSet<TodoItem> Todos { get; set; } = default!;

   protected override void OnConfiguring(DbContextOptionsBuilder options)
   {
      options
         .UseLoggerFactory(_loggerFactory)
         .UseSqlServer(_configuration.GetConnectionString("TodoDb"));
   }

   protected override void OnModelCreating(ModelBuilder modelBuilder)
   {
      base.OnModelCreating(modelBuilder);
   }
}