import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import simulateRouter from './routes/simulate.js';

const app = express();
const PORT = process.env.PORT || 3232;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', simulateRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📝 API ready at http://localhost:${PORT}/api`);
});
