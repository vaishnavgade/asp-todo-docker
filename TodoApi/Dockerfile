# https://learn.microsoft.com/en-us/aspnet/core/host-and-deploy/docker/building-net-docker-images?view=aspnetcore-10.0#the-dockerfile

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /source

# copy csproj and restore as distinct layers
COPY *.sln .
COPY TodoApi/*.csproj ./TodoApi/
RUN dotnet restore

# copy everything else and build app
COPY TodoApi/. ./TodoApi/
WORKDIR /source/TodoApi
RUN dotnet publish -c release -o /app --no-restore

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app ./
ENTRYPOINT ["dotnet", "TodoApi.dll"]