# https://hub.docker.com/_/microsoft-dotnet
FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG TARGETARCH
WORKDIR /source

# Copy project file and restore as distinct layers
# https://docs.docker.com/reference/dockerfile/#benefits-of-using---link
COPY --link TodoApi/*.csproj .
RUN dotnet restore -a $TARGETARCH

# Copy source code and publish app
COPY --link TodoApi/. .
RUN dotnet publish -a $TARGETARCH -c Release -o /app --no-restore

# Runtime stage/image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --link --from=build /app .
ENTRYPOINT ["dotnet", "TodoApi.dll"]
