import PDFDocument from 'pdfkit';

export async function generatePDFReport(idea, opinions, finalDecision) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        margin: 50,
        size: 'A4',
      });

      const chunks = [];
      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      // Title
      doc.fontSize(24).font('Helvetica-Bold').text('AI Boardroom Meeting Report', { align: 'center' });
      doc.fontSize(12).fillColor('#666').text('Strategic Decision Analysis', { align: 'center' });
      doc.moveDown();

      // Proposal Section
      doc.fontSize(14).fillColor('#000').font('Helvetica-Bold').text('Business Proposal');
      doc.fontSize(11).font('Helvetica').fillColor('#333').text(idea, { align: 'left' });
      doc.moveDown();

      // Board Opinions Section
      doc.fontSize(14).fillColor('#000').font('Helvetica-Bold').text('Board Members\' Opinions');
      doc.moveDown(0.5);

      const members = [
        { key: 'CEO', label: 'CEO Opinion' },
        { key: 'CFO', label: 'CFO Opinion' },
        { key: 'CTO', label: 'CTO Opinion' },
        { key: 'CMO', label: 'CMO Opinion' },
        { key: 'INVESTOR', label: 'Investor Opinion' },
      ];

      members.forEach((member) => {
        doc.fontSize(12).font('Helvetica-Bold').fillColor('#2c3e50').text(member.label);
        doc.fontSize(10).font('Helvetica').fillColor('#555').text(opinions[member.key] || '', {
          align: 'left',
        });
        doc.moveDown(0.5);
      });

      doc.moveDown();

      // Final Decision Section
      doc.fontSize(14).fillColor('#000').font('Helvetica-Bold').text('Final Decision & Recommendation');
      doc.moveDown(0.5);
      doc.fontSize(10).font('Helvetica').fillColor('#1b5e20').text(finalDecision, { align: 'left' });
      doc.moveDown();

      // Footer
      doc.fontSize(9).fillColor('#999').text(`Generated: ${new Date().toLocaleString()}`);
      doc.text('AI Boardroom Simulator v1.0');

      doc.end();
    } catch (error) {
      console.error('Error generating PDF:', error);
      reject(error);
    }
  });
}
