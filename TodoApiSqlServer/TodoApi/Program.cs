using Microsoft.EntityFrameworkCore;
using TodoApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<TodoContext>(opt =>
    opt.UseSqlServer(builder.Configuration.GetConnectionString("TodoDb")));
    // opt.UseInMemoryDatabase("TodoList"));


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if(app.Environment.IsDevelopment())
{
    using(var scope = app.Services.CreateScope())
    {
        var todoContext = scope.ServiceProvider.GetRequiredService<TodoContext>();
        todoContext.Database.EnsureCreated();
        todoContext.Seed();
    }
}

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
