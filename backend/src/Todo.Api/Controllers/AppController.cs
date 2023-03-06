using System;
using System.Diagnostics;
using System.Reflection;
using System.Threading.Tasks;

using Todo.Api.Models.App;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Todo.Api.Controllers
{
   [Route("api/[controller]")]
   [ApiController]
   public class AppController : ControllerBase
   {
      private readonly ILogger<AppController> _logger;

      public AppController(ILogger<AppController> logger)
      {
         _logger = logger;
      }

      [HttpGet("build-info")]
      public async Task<BuildInfo> Get()
      {
         return new BuildInfo
         {
            VersionNumber = GetVersionNumber(),
            GitSha = await GetGitSha(),
         };
      }

      private string GetVersionNumber()
      {
         var attr = GetType().Assembly.GetCustomAttribute<AssemblyInformationalVersionAttribute>();
         return attr?.InformationalVersion ?? "0.1";
      }

      private async Task<string> GetGitSha()
      {
         // The production app should have git SHA of the commit from which the app was built 
         // available as an environment variable.
         var gitSha = Environment.GetEnvironmentVariable("GIT_SHA");
         if (string.IsNullOrWhiteSpace(gitSha))
         {
            try
            {
               // For local development, we'll use the local git repo to determine the SHA
               using (var process = Process.Start(new ProcessStartInfo
               {
                  FileName = "git",
                  ArgumentList = { "rev-parse", "HEAD" },
                  RedirectStandardOutput = true,
               }))
               {
                  if (process != null)
                  {
                     gitSha = await process.StandardOutput.ReadToEndAsync();
                     gitSha = gitSha?.Trim();
                  }
               }
            }
            catch (Exception ex)
            {
               _logger.LogError(ex, "Failed to retrieve git SHA from local git repo.");
               gitSha = "<unknown>";
            }
         }
         return gitSha ?? "GIT_SHA not set";
      }
   }
}