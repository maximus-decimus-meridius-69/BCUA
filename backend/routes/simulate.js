import express from 'express';
import { simulateMeeting, generateReport } from '../controllers/simulationController.js';

const router = express.Router();

// POST /api/simulate-meeting
router.post('/simulate-meeting', simulateMeeting);

// POST /api/generate-report
router.post('/generate-report', generateReport);

export default router;
