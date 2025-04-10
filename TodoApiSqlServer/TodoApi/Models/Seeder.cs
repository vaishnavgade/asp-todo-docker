using AutoFixture;

namespace TodoApi.Models;

public static class Seeder
{
    public static void Seed(this TodoContext context)
    {
        if (!context.TodoItems.Any())
        {
            Fixture fixture = new Fixture();
            fixture.Customize<TodoItem>(item => item.Without(p => p.Id));
            //--- The next two lines add 100 rows to your database
            List<TodoItem> item = fixture.CreateMany<TodoItem>(100).ToList();
            context.AddRange(item);
            context.SaveChanges();
        }
    }
}