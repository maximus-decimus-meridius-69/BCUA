import { generateBoardOpinion, generateFinalDecision } from '../services/geminiService.js';
import { generatePDFReport } from '../services/pdfService.js';

export async function simulateMeeting(req, res) {
  try {
    const { idea } = req.body;

    if (!idea || idea.trim().length === 0) {
      return res.status(400).json({ error: 'Business idea is required' });
    }

    console.log(`\n🎬 Starting simulation for: "${idea}"\n`);

    // Generate opinions from each board member
    console.log('📝 Generating board member opinions...');
    const opinions = {};

    const boardMembers = ['CEO', 'CFO', 'CTO', 'CMO', 'INVESTOR'];
    
    for (const member of boardMembers) {
      console.log(`  Getting ${member} opinion...`);
      opinions[member] = await generateBoardOpinion(idea, member);
      console.log(`  ✅ ${member} opinion generated`);
    }

    // Generate final decision
    console.log('\n📊 Generating final decision...');
    const finalDecision = await generateFinalDecision(idea, opinions);
    console.log('✅ Final decision generated\n');

    // Prepare response
    const response = {
      idea,
      opinions,
      finalDecision,
      timestamp: new Date().toISOString(),
    };

    res.json(response);
  } catch (error) {
    console.error('Error in simulateMeeting:', error);
    res.status(500).json({
      error: 'Failed to simulate meeting',
      message: error.message,
    });
  }
}

export async function generateReport(req, res) {
  try {
    const { idea, opinions, finalDecision } = req.body;

    if (!idea || !opinions || !finalDecision) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    console.log('📄 Generating PDF report...');
    const pdfBuffer = await generatePDFReport(idea, opinions, finalDecision);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="Boardroom_Report_${Date.now()}.pdf"`
    );
    res.send(pdfBuffer);

    console.log('✅ PDF report generated and sent\n');
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({
      error: 'Failed to generate PDF',
      message: error.message,
    });
  }
}
