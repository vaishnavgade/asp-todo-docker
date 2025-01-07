# asp-todo-docker
Web API Sample with ASP.NET Core and Docker

Sample generated using [tutorial](https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-8.0&tabs=visual-studio-code)

To run locally
```
dotnet dev-certs https --trust
dotnet run --launch-profile https
```

Dockerfile created using [tutorial](https://learn.microsoft.com/en-us/aspnet/core/host-and-deploy/docker/building-net-docker-images?view=aspnetcore-8.0)

To run the container locally, navigate to the folder containing Dockerfile
```
docker build -t todoapi-windsor .
docker run -it --rm -p 127.0.0.1:8080:8080 --name todoapi_windsor todoapi-windsor
```

To confirm the service is up and running, visit the [swagger page](http://localhost:8080/swagger/index.html)