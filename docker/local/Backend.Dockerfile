ARG VARIANT="7.0-bullseye"
FROM mcr.microsoft.com/vscode/devcontainers/dotnet:0-${VARIANT}

EXPOSE 80
EXPOSE 443

# Restore nuget packages
WORKDIR /repo/backend
# Note that .dockerignore will constrain what gets copied here
COPY ./backend .

# Install tools that are not available as devcontainer features
RUN dotnet tool install -g dotnet-ef
ENV PATH $PATH:/root/.dotnet/tools

ENV \
   ASPNETCORE_URLS=http://+:80 \
   REL_PROJ_PATH="./src/Todo.Api" \
   REL_PROJ_FILE_PATH="./src/Todo.Api/Todo.Api.csproj"
CMD dotnet build ${REL_PROJ_FILE_PATH} && dotnet "${REL_PROJ_PATH}/bin/Debug/net7.0/Todo.Api.dll"
