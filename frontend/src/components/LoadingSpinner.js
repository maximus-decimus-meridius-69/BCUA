import React from 'react';
import './LoadingSpinner.css';

function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <h3>Running boardroom simulation...</h3>
      <p>Generating opinions from all board members</p>
    </div>
  );
}

export default LoadingSpinner;
