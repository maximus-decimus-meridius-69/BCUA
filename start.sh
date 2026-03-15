#!/bin/bash

echo "🚀 Starting AI Boardroom Simulator..."
echo ""
echo "📋 Requirements:"
echo "  ✓ Node.js 16+"
echo "  ✓ Gemini API key in backend/.env"
echo ""

# Check if backend/.env exists
if [ ! -f "backend/.env" ]; then
  echo "❌ Error: backend/.env not found"
  echo ""
  echo "📝 Please create backend/.env with:"
  echo "   GEMINI_API_KEY=your_key_here"
  echo "   PORT=3232"
  echo "   NODE_ENV=development"
  exit 1
fi

# Start backend
echo "Starting backend server..."
cd backend
npm install > /dev/null 2>&1
npm run dev &
BACKEND_PID=$!

sleep 2

# Check if backend started
if ! kill -0 $BACKEND_PID 2>/dev/null; then
  echo "❌ Failed to start backend"
  exit 1
fi

echo "✅ Backend running on port 3232"

# Start frontend
echo "Starting frontend..."
cd ../frontend
npm install > /dev/null 2>&1
npm start &
FRONTEND_PID=$!

sleep 3

echo ""
echo "✅ AI Boardroom Simulator Ready!"
echo ""
echo "🌐 Frontend: http://localhost:3000"
echo "🔌 API:      http://localhost:3232"
echo ""
echo "Press Ctrl+C to stop both servers"

# Keep script running
wait
