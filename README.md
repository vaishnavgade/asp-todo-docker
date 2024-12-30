# asp-todo-docker
Web API Sample with ASP.NET Core and Docker

Sample generated using [tutorial](https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-8.0&tabs=visual-studio-code)

To run locally
```
dotnet dev-certs https --trust
dotnet run --launch-profile https
```

Dockerfile created using [tutorial](https://learn.microsoft.com/en-us/aspnet/core/host-and-deploy/docker/building-net-docker-images?view=aspnetcore-8.0)

To run locally
```
docker build -t todoapi .
docker run -it --rm -p 127.0.0.1:8080:8080 --name todoapi_sample todoapi
```

To test locally, add a item to test using
```
curl -X 'POST' 'http://localhost:8080/api/TodoItems' -H 'accept: text/plain' -H 'Content-Type: application/json' -d '{
  "name": "test",
  "isComplete": true
}'
```

Visit [link](http://localhost:8080/api/TodoItems) to see the added test item
Or run the following
```
curl -X 'GET' 'http://localhost:8080/api/TodoItems' -H 'accept: text/plain'
```

*Note: /swagger doesn't work with ENTRYPOINT*