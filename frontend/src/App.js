import React, { useState } from 'react';
import axios from 'axios';
import SimulationForm from './components/SimulationForm';
import ResultsDisplay from './components/ResultsDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSimulate = async (idea) => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await axios.post('http://localhost:3232/api/simulate-meeting', {
        idea,
      });
      setResults(response.data);
    } catch (err) {
      console.error('Simulation error:', err);
      setError(err.response?.data?.message || 'Failed to run simulation. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!results) return;

    try {
      const response = await axios.post(
        'http://localhost:3232/api/generate-report',
        {
          idea: results.idea,
          opinions: results.opinions,
          finalDecision: results.finalDecision,
        },
        { responseType: 'blob' }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Boardroom_Report_${Date.now()}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('PDF download error:', err);
      alert('Failed to download PDF report');
    }
  };

  return (
    <div className="app">
      <div className="container">
        {!results ? (
          <>
            <h1 className="title">🏢 AI Boardroom Simulator</h1>
            <p className="subtitle">
              Debate your business ideas with AI board members
            </p>
            <SimulationForm onSubmit={handleSimulate} disabled={loading} />
            {loading && <LoadingSpinner />}
            {error && <div className="error-message">{error}</div>}
          </>
        ) : (
          <>
            <h1 className="title">✅ Boardroom Results</h1>
            <ResultsDisplay results={results} />
            <div className="action-buttons">
              <button
                className="btn btn-primary"
                onClick={() => setResults(null)}
              >
                ← New Simulation
              </button>
              <button
                className="btn btn-success"
                onClick={handleDownloadPDF}
              >
                📄 Download Report
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
