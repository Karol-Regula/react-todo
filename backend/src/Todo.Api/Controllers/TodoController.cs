using System.Collections.Generic;
using System.Linq;

using Todo.Api.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Todo.Api.Controllers
{

   [Route("api/[controller]")]
   [ApiController]
   public class TodosController : ControllerBase
   {

      private readonly ILogger<TodosController> _logger;
      private TodoDbContext _dbContext;

      public TodosController(ILogger<TodosController> logger, TodoDbContext dbContext)
      {
         _logger = logger;
         _dbContext = dbContext;
      }

      [HttpGet]
      public List<TodoItem> Get()
      {
         _logger.LogInformation("Getting all todos");
         var todo = _dbContext.Todos.ToList();
         return todo;
      }

      [HttpPost]
      public TodoItem PostQueryCreate(TodoItem todoReceived)
      {
         _dbContext.Add(todoReceived);
         _dbContext.SaveChanges();
         Response.StatusCode = 201;
         return todoReceived;
      }

      [HttpPut("{Id}")]
      public TodoItem PutQueryEdit(int Id, TodoFields todoFields)
      {
         var todoEdited = _dbContext.Todos.First(todo => todo.Id == Id);
         if (todoEdited != null)
         {
            if (!(todoFields.Text is null))
            {
               todoEdited.Text = todoFields.Text;
            }
            if (!(todoFields.IsComplete is null))
            {
               todoEdited.IsComplete = todoFields.IsComplete.Value;
            }
            _dbContext.SaveChanges();
         }
         else
         {
            Response.StatusCode = 404;
         }
         return todoEdited;
      }

      [HttpDelete("{Id}")]
      public TodoItem DeleteQueryDelete(int Id)
      {
         var todo = new TodoItem { Id = Id };
         _dbContext.Todos.Attach(todo);
         _dbContext.Todos.Remove(todo);
         _dbContext.SaveChanges();
         return todo;
      }
   }
}
