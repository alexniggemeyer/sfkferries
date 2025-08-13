#!/bin/bash

# SFK F2 Ferry Website Deployment Script
# This script builds and deploys the ferry timetable website using Docker

set -e

echo "🚢 SFK F2 Ferry Website Deployment"
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    print_error "Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install it and try again."
    exit 1
fi

# Create logs directory if it doesn't exist
if [ ! -d "logs" ]; then
    print_status "Creating logs directory..."
    mkdir -p logs
fi

# Stop and remove existing containers
print_status "Stopping existing containers..."
docker-compose down --remove-orphans 2>/dev/null || true

# Build the Docker image
print_status "Building Docker image..."
docker-compose build --no-cache

# Start the services
print_status "Starting services..."
docker-compose up -d

# Wait for the container to be healthy
print_status "Waiting for container to be healthy..."
timeout=60
counter=0
while [ $counter -lt $timeout ]; do
    if docker-compose ps | grep -q "healthy"; then
        print_status "Container is healthy! 🎉"
        break
    fi
    sleep 2
    counter=$((counter + 2))
    echo -n "."
done

if [ $counter -ge $timeout ]; then
    print_warning "Container health check timeout. Checking logs..."
    docker-compose logs ferry-website
    print_error "Deployment may have failed. Check logs above."
    exit 1
fi

# Show container status
print_status "Container status:"
docker-compose ps

# Show access information
echo ""
echo "🌐 Website is now accessible at:"
echo "   http://localhost:8080"
echo ""
echo "📊 Container logs:"
echo "   docker-compose logs -f ferry-website"
echo ""
echo "🛑 Stop the service:"
echo "   docker-compose down"
echo ""
echo "✅ Deployment completed successfully!"
