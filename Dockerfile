FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm i
CMD mkdir -p /app/build
CMD npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 3000

CMD ['nginx', '-g', 'daemon off;']