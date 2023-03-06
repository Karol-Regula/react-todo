using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Todo.Api
{
   public class Program
   {
      public static void Main(string[] args)
      {
         var builder = WebApplication.CreateBuilder(args);
         RegisterServices(builder.Services);

         var app = builder.Build();
         var logger = app.Services.GetService<ILogger<Program>>();
         ConfigureApplication(app, logger);
         app.Run();
      }

      private static void RegisterServices(IServiceCollection services)
      {
         services.AddControllers();
         services.AddRouting(options => options.LowercaseUrls = true);
         services.AddEndpointsApiExplorer();
         services.AddSwaggerGen();
         services.AddScoped<TodoDbContext>();
         services.AddCors(options =>
         {
            options.AddPolicy("AllowAllHeaders", builder =>
               {
                  builder.AllowAnyOrigin()
                         .AllowAnyHeader()
                         .AllowAnyMethod();
               });
         });
      }

      private static void ConfigureApplication(WebApplication app, ILogger<Program>? logger)
      {
         if (app.Environment.IsDevelopment())
         {
            app.UseSwagger();
            app.UseSwaggerUI();
         }
         else
         {
            app.UseHttpsRedirection();
         }

         app.UseFileServer();
         app.UseAuthorization();
         app.MapControllers();
         app.UseCors("AllowAllHeaders");
      }
   }
}
