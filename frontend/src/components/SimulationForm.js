import React, { useState } from 'react';
import './SimulationForm.css';

function SimulationForm({ onSubmit, disabled }) {
  const [idea, setIdea] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (idea.trim()) {
      onSubmit(idea);
    }
  };

  const exampleIdeas = [
    'Should our startup launch an AI coding assistant?',
    'Should we pivot to expand into the Southeast Asian market?',
    'Should we implement a 4-day work week?',
  ];

  const handleExample = (example) => {
    setIdea(example);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="idea-input">
            📝 What business decision do you want to debate?
          </label>
          <textarea
            id="idea-input"
            className="textarea"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Example: Should our company launch an AI-powered coding assistant?"
            rows="5"
            disabled={disabled}
          />
        </div>

        <button type="submit" className="btn-submit" disabled={disabled || !idea.trim()}>
          🚀 Run Simulation
        </button>
      </form>

      <div className="examples">
        <p className="examples-label">💡 Try these examples:</p>
        <div className="examples-list">
          {exampleIdeas.map((example, idx) => (
            <button
              key={idx}
              type="button"
              className="example-btn"
              onClick={() => handleExample(example)}
              disabled={disabled}
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SimulationForm;
