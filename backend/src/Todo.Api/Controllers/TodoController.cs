using System.Collections.Generic;
using System.Linq;
using System;

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

      [HttpGet("all")]
      public List<TodoItem> Get()
      {
         _logger.LogInformation("Getting all todos");
         var todo = _dbContext.Todos.ToList();
         return todo;
      }

      [HttpPost("createTodo")]
      public int PostQueryCreate(string todoText, int isComplete)
      {
         var todo = new TodoItem { Text = $"{todoText}", IsComplete = isComplete };
         _dbContext.Add(todo);
         _dbContext.SaveChanges();
         return todo.Id;
      }

      [HttpPost("editTodo")]
      public void PostQueryEdit(int todoId, string todoText)
      {
         var todoo = _dbContext.Todos.First(todo => todo.Id == todoId);
         if (todoo != null)
         {
            todoo.Text = todoText;
            _dbContext.SaveChanges();
         }
         return;
      }

      [HttpPost("completeTodo")]
      public void PostQueryComplete(int todoId, int isComplete)
      {
         var todo = _dbContext.Todos.First(todo => todo.Id == todoId);
         if (todo != null)
         {
            todo.IsComplete = isComplete;
            _dbContext.SaveChanges();
         }
         return;
      }

      [HttpPost("deleteTodo")]
      public void PostQueryDelete(int todoId)
      {
         var todo = new TodoItem { Id = todoId };
         _dbContext.Todos.Attach(todo);
         _dbContext.Todos.Remove(todo);
         _dbContext.SaveChanges();
         return;
      }
   }
}
