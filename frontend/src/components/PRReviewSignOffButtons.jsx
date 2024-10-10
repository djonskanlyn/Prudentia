// File: src/components/PRReviewSignOffButtons.jsx

import React from 'react';
import { useParams } from 'react-router-dom';
import { updateData } from '../components/FetchData';  
import { useTheme } from '../components/ThemeContext';  // Assuming you have a ThemeContext set up

const PRReviewSignOffButtons = ({ supervisorSignOff, seniorSupervisorSignOff }) => {
  const { reviewId } = useParams();  // Get reviewId from URL params
  const { themeClass } = useTheme();

  // Function to handle supervisor sign-off
  const handleSupervisorSignOff = async () => {
    try {
      const response = await updateData(`pr-reviews/supervisor-signoff/${reviewId}/`, {});
      alert('Supervisor signed off successfully!');  // Success alert
    } catch (err) {
      // Check for specific error status codes
      if (err.response && err.response.status === 404) {
        alert('Error 404: Review not found.');
      } else if (err.response && err.response.status === 403) {
        alert('Error 403: Supervisor sign-off already completed.');
      } else {
        alert('Failed to sign off: ' + (err.response?.data?.error || 'Unknown error.'));
      }
    }
  };

  // Function to handle senior supervisor sign-off
  const handleSeniorSupervisorSignOff = async () => {
    try {
      const response = await updateData(`pr-reviews/senior-supervisor-signoff/${reviewId}/`, {});
      alert('Senior Supervisor signed off successfully!');  // Success alert
    } catch (err) {
      // Check for specific error status codes
      if (err.response && err.response.status === 404) {
        alert('Error 404: Review not found.');
      } else if (err.response && err.response.status === 403) {
        alert('Error 403: Senior supervisor sign-off already completed or supervisor must sign off first.');
      } else {
        alert('Failed to sign off: ' + (err.response?.data?.error || 'Unknown error.'));
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



