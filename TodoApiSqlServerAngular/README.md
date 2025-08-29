# Todo Api Web App

This single page web application contains the following components running in Docker
- Angular Client
- ASP Dotnet Core Server
- Sql Server Database

## Start

To start this application, run the command `docker compose up`

To confirm the Server is up and running, visit the [swagger page](http://localhost:8080/swagger/index.html)

To confirm the Client is up and running, visit the [home page](http://localhost:8081)

## Clean up
```
docker compose down
docker rm -vf $(docker ps -aq); docker rmi -f $(docker images -aq)
```
