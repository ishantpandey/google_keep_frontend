# 1️⃣ Build Stage (React)
FROM node:18-alpine AS build

WORKDIR /app

# Accept build-time variable
ARG REACT_APP_BASE_URL
ENV REACT_APP_BASE_URL=$REACT_APP_BASE_URL

COPY package*.json ./
RUN npm install

COPY . .

# React will read the env at build time
RUN npm run build

# 2️⃣ Serve with Nginx
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
