# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /source
EXPOSE 80

# copy csproj and restore as distinct layers
COPY *.sln .
COPY TodoApi/*.csproj ./TodoApi/
RUN dotnet restore

# copy everything else and build app
COPY TodoApi/. ./TodoApi/
WORKDIR /source/TodoApi
RUN dotnet publish -c release -o /app --no-restore

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app ./
ENTRYPOINT ["dotnet", "TodoApi.dll"]
