ARG DOTNET_VARIANT="7.0-bullseye-slim"
ARG NODE_VARIANT="18-bullseye-slim"

FROM mcr.microsoft.com/dotnet/aspnet:${DOTNET_VARIANT} AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:${DOTNET_VARIANT} AS dotnet_build
WORKDIR /src
COPY ["./backend/Directory.Packages.props", "."]
COPY ["./backend/src/Todo.Api/Todo.Api.csproj", "."]
RUN dotnet restore "./Todo.Api.csproj"
COPY ./backend .
WORKDIR "/src/."
ARG BUILD_CONFIGURATION=Debug
RUN dotnet build "Todo.Api.csproj" -c "${BUILD_CONFIGURATION}" -o /app/build

FROM node:${NODE_VARIANT} AS node_build
WORKDIR /build
COPY ./frontend/src src/
COPY ./frontend/package.json package.json
RUN npm install
RUN npm run build

FROM dotnet_build AS dotnet_publish
ARG BUILD_CONFIGURATION=Debug
RUN dotnet publish "Todo.Api.csproj" \
   -c "${BUILD_CONFIGURATION}" \
   -o /app/publish \
   /p:UseAppHost=false

FROM base AS final
ARG ASPNETCORE_ENVIRONMENT="Development"
ARG GIT_SHA="<unknown>"
WORKDIR /app
ENV ASPNETCORE_ENVIRONMENT=${ASPNETCORE_ENVIRONMENT}
ENV GIT_SHA=${GIT_SHA}
COPY --from=dotnet_publish /app/publish .
COPY --from=node_build /build/dist ./wwwroot
ENTRYPOINT ["dotnet", "Todo.Api.dll"]