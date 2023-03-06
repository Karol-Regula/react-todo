ARG VARIANT="18-bullseye"
FROM node:${VARIANT}

WORKDIR /repo/frontend

COPY ./frontend/src src
COPY ./frontend/package.json package.json
COPY ./frontend/.proxyrc.json .proxyrc.json

RUN npm install

EXPOSE 1234

CMD npm run start