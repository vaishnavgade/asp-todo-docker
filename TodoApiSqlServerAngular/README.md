# Todo Api Base
Web API Sample with ASP.NET Core + Sql Server and Docker using Microsoft Dependency Injection along with Entity Framework Core

Sample generated using [tutorial](https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-8.0&tabs=visual-studio-code)

To run natively
```
dotnet dev-certs https --trust
dotnet run --launch-profile https
```

Or to run with developer appsettings
```
dotnet run --launch-profile http
```

Dockerfile created using [tutorial](https://learn.microsoft.com/en-us/dotnet/core/docker/build-container?tabs=linux&pivots=dotnet-9-0)

Docker Compose created usings [tutorial1](https://www.twilio.com/en-us/blog/developers/community/containerize-your-aspdotnet-core-application-and-sql-server-with-docker) and [tutorial2](https://www.twilio.com/en-us/blog/developers/community/containerize-your-sql-server-with-docker-and-aspnet-core-with-ef-core)

To run using docker natively, navigate to the folder containing Dockerfile
```
docker run -it \
    -e "ACCEPT_EULA=Y" \
    -e "MSSQL_SA_PASSWORD=XO@9wMSGl@YgY5u7" \
    -p 1433:1433 \
    --name sql-server-2022 \
    -d \
mcr.microsoft.com/mssql/server:2022-latest

docker build -t todoapi-base .

docker run -it --rm -p 127.0.0.1:8080:8080 --name todoapi_base todoapi-base
```

To run using docker compose
```
docker compose up
```

To confirm the service is up and running, visit the [swagger page](http://localhost:8080/swagger/index.html)

## Clean up
```
docker compose down

docker rm -vf $(docker ps -aq)

docker rmi -f $(docker images -aq)
```