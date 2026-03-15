# BCUA

# 🏢 AI Boardroom Simulator

An intelligent web application that simulates a boardroom debate with AI agents representing different business perspectives (CEO, CFO, CTO, CMO, Investor). Perfect for evaluating business ideas from multiple angles.

## Features

✨ **Phase 1 - Core System** (Current)
- 5 AI Board Members with distinct personalities
- Real-time debate simulation using Google Gemini
- Professional PDF report generation
- Clean, modern React frontend
- Express.js backend with easy scalability

📊 **Board Members**
- **CEO** - Focus on growth and innovation
- **CFO** - Focus on financial impact
- **CTO** - Focus on technical feasibility
- **CMO** - Focus on market demand
- **Investor** - Focus on ROI and risks

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Google Gemini API key (get free at https://aistudio.google.com/app/apikeys)

### Setup Instructions

#### 1. Get Your Gemini API Key
1. Visit https://aistudio.google.com/app/apikeys
2. Click "Create API Key"
3. Copy your API key

#### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:
```
GEMINI_API_KEY=your_api_key_here
PORT=3232
NODE_ENV=development
```

Replace `your_api_key_here` with your actual Gemini API key.

Start the backend:
```bash
npm run dev
```

You should see:
```
✅ Server running on http://localhost:3232
📝 API ready at http://localhost:3232/api
```

#### 3. Frontend Setup

In a new terminal:

```bash
cd frontend
npm install
npm start
```

The app will open at `http://localhost:3000`

## 📝 How to Use

1. **Enter a Business Idea** - Type your business proposal in the text box
   - Example: "Should our startup launch an AI coding assistant?"

2. **Run Simulation** - Click "Run Simulation"
   - Backend will query Gemini 5 times (once per board member)
   - Then generates a final board decision

3. **View Results** - See opinions from all board members

4. **Download Report** - Click "Download Report" to get a professional PDF

## 📁 Project Structure

```
MINIPROJECT BCUA/
├── backend/
│   ├── server.js              # Express app setup
│   ├── package.json           # Backend dependencies
│   ├── .env                   # API keys (keep secret!)
│   ├── routes/
│   │   └── simulate.js        # API routes
│   ├── controllers/
│   │   └── simulationController.js  # Business logic
│   └── services/
│       ├── geminiService.js   # Gemini API integration
│       └── pdfService.js      # PDF generation
│
├── frontend/
│   ├── package.json           # Frontend dependencies
│   ├── public/
│   │   └── index.html         # HTML template
│   └── src/
│       ├── App.js             # Main app component
│       ├── index.js           # React entry point
│       ├── App.css            # Main styles
│       └── components/        # React components
│           ├── SimulationForm.js
│           ├── ResultsDisplay.js
│           └── LoadingSpinner.js
│
└── README.md
```

## 🔌 API Endpoints

### POST /api/simulate-meeting
Runs a full boardroom simulation

**Request:**
```json
{
  "idea": "Should our company launch an AI coding assistant?"
}
```

**Response:**
```json
{
  "idea": "Should our company launch...",
  "opinions": {
    "CEO": "...",
    "CFO": "...",
    "CTO": "...",
    "CMO": "...",
    "INVESTOR": "..."
  },
  "finalDecision": "...",
  "timestamp": "2024-03-08T10:00:00.000Z"
}
```

### POST /api/generate-report
Generates a downloadable PDF report

**Request:**
```json
{
  "idea": "Should...",
  "opinions": { /* opinions object */ },
  "finalDecision": "..."
}
```

**Response:** PDF file (binary)

## 🛠️ Development

### Running Backend in Development Mode
```bash
cd backend
npm run dev
```
Uses nodemon for auto-restart on file changes

### Testing the API
Use Postman or curl:
```bash
curl -X POST http://localhost:3232/api/simulate-meeting \
  -H "Content-Type: application/json" \
  -d '{"idea": "Should we expand internationally?"}'
```

## 📦 Dependencies

### Backend
- **express** - Web framework
- **cors** - Enable cross-origin requests
- **@google/generative-ai** - Gemini API client
- **puppeteer** - PDF generation from HTML
- **dotenv** - Environment variable management

### Frontend
- **react** - UI framework
- **axios** - HTTP client
- **react-scripts** - Build tools

## 🎯 Next Phases (Future Development)

**Phase 2 - Interactive Debate**
- Board members respond to each other's opinions
- Multi-turn conversations
- Rebuttals and counterarguments

**Phase 3 - Enhanced Reports**
- Executive summary
- Risk analysis
- Financial projections
- Market analysis

**Phase 4 - RAG (Retrieval Augmented Generation)**
- Upload company documents
- Extract relevant context
- Make responses company-specific

## ⚠️ Important Notes

🔐 **Security**
- Never commit `.env` file to git
- Add `.env` to `.gitignore`
- Keep your API key secret

🌐 **CORS**
- Frontend is set to `http://localhost:3000`
- Backend proxy is configured in frontend `package.json`

💰 **API Costs**
- Gemini API has free tier with generous limits
- Each simulation uses Gemini API calls
- Monitor your API usage at https://aistudio.google.com

## 🐛 Troubleshooting

### "Cannot GET /api/simulate-meeting"
- Backend not running on port 3232
- Run `npm run dev` in backend folder

### "Port 3232 already in use"
- Change PORT in `.env`
- Or kill the process: `lsof -ti:3232 | xargs kill`

### "CORS error"
- Make sure backend is running
- Frontend should be on `http://localhost:3000`

### "API key error"
- Check `.env` file has correct key
- Verify key is valid at https://aistudio.google.com/app/apikeys
- Restart backend after changing `.env`

### "PDF not downloading"
- Make sure axios can access `/api/generate-report`
- Check browser console for errors
- Verify Puppeteer installed: `npm list puppeteer`

## 📊 Example Business Ideas to Test

- "Should we pivot our business model?"
- "Should we acquire our competitor?"
- "Should we implement a 4-day work week?"
- "Should we go remote-first?"
- "Should we IPO next year?"

## 📞 Support

For issues or questions:
1. Check troubleshooting section
2. Review console logs (browser + terminal)
3. Verify Gemini API key is valid
4. Ensure both servers are running

## 📄 License

This project is created for educational purposes.

---

**Happy Boardroom Debates! 🚀**

Built with ❤️ using Node.js + React + Google Gemini
