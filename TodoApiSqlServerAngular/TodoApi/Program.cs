var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<TodoContext>(opt =>
    opt.UseSqlServer(builder.Configuration.GetConnectionString("TodoDb")));
    // opt.UseInMemoryDatabase("TodoList"));

var app = builder.Build();

// Configure Swagger
app.MapOpenApi();
app.UseSwaggerUi(options =>
{
    options.DocumentPath = "/openapi/v1.json";
});

// Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
using(var scope = app.Services.CreateScope())
{
    var todoContext = scope.ServiceProvider.GetRequiredService<TodoContext>();
    todoContext.Database.EnsureCreated();
    todoContext.Seed();
}

//app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
