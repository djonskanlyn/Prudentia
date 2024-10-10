// File: src/components/PRReviewSignOffButtons.jsx

import React from 'react';
import { useParams } from 'react-router-dom';
import { updateData } from '../components/FetchData';  
import { useTheme } from '../components/ThemeContext';  

const PRReviewSignOffButtons = ({ supervisorSignOff, seniorSupervisorSignOff }) => {
  const { reviewId } = useParams();  // Get reviewId from URL params
  const { themeClass } = useTheme();

  // Function to handle supervisor sign-off
  const handleSupervisorSignOff = async () => {
    try {
      const response = await updateData(`pr-reviews/supervisor-signoff/${reviewId}/`, {});
      alert('Supervisor signed off successfully!');  // Success alert
    } catch (err) {
      // Check for specific error status codes and show the appropriate error message
      if (err.response) {
        // Handle the error response from the backend
        alert(`Error: ${err.response.status} - ${err.response.data.error}`);
      } else {
        // If no response (network or unknown error)
        alert('Failed to sign off: An unexpected error occurred.');
      }
    }
  };

  // Function to handle senior supervisor sign-off
  const handleSeniorSupervisorSignOff = async () => {
    try {
      const response = await updateData(`pr-reviews/senior-supervisor-signoff/${reviewId}/`, {});
      alert('Senior Supervisor signed off successfully!');  // Success alert
    } catch (err) {
      // Check for specific error status codes and show the appropriate error message
      if (err.response) {
        // Handle the error response from the backend
        alert(`Error: ${err.response.status} - ${err.response.data.error}`);
      } else {
        // If no response (network or unknown error)
        alert('Failed to sign off: An unexpected error occurred.');
      }
    }
  };

  return (
    <div className={`pr-review-signoff ${themeClass}`}>
      {/* Supervisor Sign-Off Button */}
      {!supervisorSignOff && (
        <button className="style-button" onClick={handleSupervisorSignOff}>
          Supervisor Sign Off
        </button>
      )}

      {/* Senior Supervisor Sign-Off Button */}
      {supervisorSignOff && !seniorSupervisorSignOff && (
        <button className="style-button" onClick={handleSeniorSupervisorSignOff}>
          Senior Supervisor Sign Off
        </button>
      )}
    </div>
  );
};

export default PRReviewSignOffButtons;



