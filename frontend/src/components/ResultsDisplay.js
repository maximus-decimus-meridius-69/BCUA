import React from 'react';
import './ResultsDisplay.css';

function ResultsDisplay({ results }) {
  const members = [
    { key: 'CEO', icon: '👔', title: 'CEO Opinion' },
    { key: 'CFO', icon: '💰', title: 'CFO Opinion' },
    { key: 'CTO', icon: '🖥️', title: 'CTO Opinion' },
    { key: 'CMO', icon: '📢', title: 'CMO Opinion' },
    { key: 'INVESTOR', icon: '📈', title: 'Investor Opinion' },
  ];

  return (
    <div className="results-container">
      <div className="proposal-box">
        <h2>📋 Business Proposal</h2>
        <p>{results.idea}</p>
      </div>

      <h2 className="section-title">Board Members' Opinions</h2>
      <div className="opinions-grid">
        {members.map((member) => (
          <div key={member.key} className="opinion-card">
            <div className="opinion-header">
              <span className="icon">{member.icon}</span>
              <h3>{member.title}</h3>
            </div>
            <p className="opinion-text">{results.opinions[member.key]}</p>
          </div>
        ))}
      </div>

      <h2 className="section-title">Final Decision</h2>
      <div className="final-decision-box">
        <p>{results.finalDecision}</p>
      </div>

      <div className="metadata">
        <small>Generated: {new Date(results.timestamp).toLocaleString()}</small>
      </div>
    </div>
  );
}

export default ResultsDisplay;
