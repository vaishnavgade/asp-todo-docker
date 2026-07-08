# Todo Api Base
Web API Sample with ASP.NET Core + Sql Server and Docker using Microsoft Dependency Injection along with Entity Framework Core

Sample generated using [tutorial](https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-8.0&tabs=visual-studio-code)

To run locally (within TodoApi.csproj)
```
docker run -it \
    -e "ACCEPT_EULA=Y" \
    -e "MSSQL_SA_PASSWORD=XO@9wMSGl@YgY5u7" \
    -p 1433:1433 \
    --name sql-server-2022 \
    -d \
mcr.microsoft.com/mssql/server:2022-latest;

dotnet clean; dotnet build;
dotnet run --launch-profile http --project ./TodoApi/TodoApi.csproj
```

Dockerfile created using [tutorial](https://learn.microsoft.com/en-us/aspnet/core/host-and-deploy/docker/building-net-docker-images?view=aspnetcore-10.0#the-dockerfile)

Docker Compose created usings [tutorial1](https://www.twilio.com/en-us/blog/developers/community/containerize-your-aspdotnet-core-application-and-sql-server-with-docker) and [tutorial2](https://www.twilio.com/en-us/blog/developers/community/containerize-your-sql-server-with-docker-and-aspnet-core-with-ef-core)

To run using docker compose
```
docker compose up --build
```

To confirm the service is up and running, visit the [swagger page](http://localhost:8080/swagger/index.html)

## Clean up
```
docker compose down; docker rm -vf $(docker ps -aq); docker rmi -f $(docker images -aq)
```