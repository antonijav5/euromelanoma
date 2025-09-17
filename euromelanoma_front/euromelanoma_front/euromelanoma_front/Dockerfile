# Stage 1: Build Angular app
FROM node:18-alpine AS build
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with legacy peer deps flag
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Build for production
RUN npm run build --prod

# Stage 2: Serve with nginx
FROM nginx:alpine AS stage-1

# Copy build files
COPY --from=build /app/dist/euromelanoma_front /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]