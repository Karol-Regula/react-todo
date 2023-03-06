namespace Todo.Api.Models
{

   public class TodoItem
   {
      public int Id { get; init; }
      public string Text { get; set; } = "";
      public int IsComplete { get; set; } = 0;
   }
}
