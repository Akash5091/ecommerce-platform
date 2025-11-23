#!/bin/bash

echo "Starting E-Commerce Platform..."

# Start MongoDB
echo "Starting MongoDB..."
docker-compose up -d mongo

# Wait for MongoDB to be ready
echo "Waiting for MongoDB to initialize..."
sleep 5

# Start Backend
echo "Starting Backend Server..."
cd backend
npm install
npm run dev &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 3

# Start Frontend
echo "Starting Frontend Server..."
cd frontend
npm install
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "========================================"
echo "E-Commerce Platform is running!"
echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:5000"
echo "MongoDB:  mongodb://localhost:27017"
echo "========================================"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for user to stop
wait
