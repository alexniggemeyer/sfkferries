# 🚢 SFK F2 Ferry Website - Docker Deployment Guide

This guide explains how to deploy the SFK F2 ferry timetable website using Docker containers.

## 📋 Prerequisites

- **Docker** installed and running
- **Docker Compose** installed
- **Git** (to clone the repository)

## 🏗️ Project Structure

```
sfk-fahrplan_v2/
├── index.html              # Main HTML file
├── styles.css              # CSS styles
├── script.js               # Main JavaScript functionality
├── route-generator.js      # Route generator system
├── sfk-f2-route.js         # SFK F2 route configuration
├── Dockerfile              # Docker image definition
├── docker-compose.yml      # Docker Compose configuration
├── nginx.conf              # Nginx server configuration
├── .dockerignore           # Docker build exclusions
├── deploy.sh               # Automated deployment script
└── DEPLOYMENT.md           # This file
```

## 🚀 Quick Deployment

### Option 1: Automated Deployment (Recommended)

1. **Make the script executable:**
   ```bash
   chmod +x deploy.sh
   ```

2. **Run the deployment script:**
   ```bash
   ./deploy.sh
   ```

3. **Access the website:**
   Open your browser and go to `http://localhost:8080`

### Option 2: Manual Deployment

1. **Build the Docker image:**
   ```bash
   docker-compose build
   ```

2. **Start the service:**
   ```bash
   docker-compose up -d
   ```

3. **Check the status:**
   ```bash
   docker-compose ps
   ```

4. **Access the website:**
   Open your browser and go to `http://localhost:8080`

## 🔧 Configuration Options

### Port Configuration

The website runs on port 8080 by default. To change this, edit `docker-compose.yml`:

```yaml
ports:
  - "YOUR_PORT:80"  # Change YOUR_PORT to desired port
```

### Environment Variables

You can customize the Nginx configuration by setting environment variables:

```yaml
environment:
  - NGINX_HOST=your-domain.com
  - NGINX_PORT=80
```

## 📊 Monitoring and Logs

### View Container Logs

```bash
# Follow logs in real-time
docker-compose logs -f ferry-website

# View recent logs
docker-compose logs ferry-website
```

### Health Check

The container includes a health check endpoint at `/health`:

```bash
curl http://localhost:8080/health
```

### Container Status

```bash
docker-compose ps
```

## 🛠️ Management Commands

### Stop the Service

```bash
docker-compose down
```

### Restart the Service

```bash
docker-compose restart
```

### Update and Redeploy

```bash
# Pull latest changes (if using git)
git pull

# Rebuild and restart
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Remove Everything

```bash
docker-compose down --volumes --remove-orphans
docker system prune -f
```

## 🔒 Security Features

The Docker setup includes several security features:

- **Non-root user**: Container runs as non-root user
- **Security headers**: XSS protection, frame options, etc.
- **File access restrictions**: Hidden files are blocked
- **Resource limits**: Client upload size limited to 1MB

## 🌐 Production Deployment

### Reverse Proxy with SSL (Optional)

For production use, you can uncomment the nginx-proxy service in `docker-compose.yml`:

```yaml
nginx-proxy:
  image: nginxproxy/nginx-proxy
  ports:
    - "80:80"
    - "443:443"
  # ... additional configuration
```

### Environment-Specific Configuration

Create environment-specific compose files:

```bash
# Development
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# Production
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
```

## 📝 Troubleshooting

### Common Issues

1. **Port already in use:**
   ```bash
   # Check what's using the port
   lsof -i :8080
   
   # Change port in docker-compose.yml
   ```

2. **Container won't start:**
   ```bash
   # Check logs
   docker-compose logs ferry-website
   
   # Check container status
   docker-compose ps
   ```

3. **Permission denied:**
   ```bash
   # Fix script permissions
   chmod +x deploy.sh
   ```

### Debug Mode

Run without detaching to see real-time output:

```bash
docker-compose up
```

## 🔄 Updating the Website

### Adding New Routes

1. **Create new route configuration:**
   ```javascript
   const newRoute = {
       name: "New Ferry Line",
       stations: [/* ... */]
   };
   ```

2. **Update the route file** or create a new one
3. **Rebuild and redeploy:**
   ```bash
   ./deploy.sh
   ```

### Modifying Styles or Functionality

1. **Edit the source files** (CSS, JS, HTML)
2. **Rebuild the container:**
   ```bash
   docker-compose build --no-cache
   docker-compose up -d
   ```

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Nginx Documentation](https://nginx.org/en/docs/)

## 🆘 Support

If you encounter issues:

1. **Check the logs:** `docker-compose logs ferry-website`
2. **Verify Docker is running:** `docker info`
3. **Check container status:** `docker-compose ps`
4. **Review this deployment guide**

---

**Happy Sailing! 🚢⚓**
