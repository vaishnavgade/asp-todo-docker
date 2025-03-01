// using System.ComponentModel.DataAnnotations.Schema;

namespace TodoApi.Models;

public class TodoItem
{
    // [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public long TodoItemId { get; set; }
    public string? Name { get; set; }
    public bool IsComplete { get; set; }
    public string? Secret { get; set; }
}
