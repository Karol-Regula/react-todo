namespace Todo.Api.Models
{

   public class TodoItem
   {
      public int Id { get; init; }
      public string Text { get; set; } = "";
      public int IsComplete { get; set; } = 0;
   }

   public class TodoFields
   {
      public string? Text { get; set; } = null;
      public int? IsComplete { get; set; } = null;
   }
}
