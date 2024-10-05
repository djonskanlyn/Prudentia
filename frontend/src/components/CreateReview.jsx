import React from 'react';
import { apiClient } from './FetchData';  // This has the baseURL defined

const CreateReview = ({ returnId }) => {

  // Function to handle creating a new PR review
  const handleCreateReview = async () => {
    try {
      // Send POST request to create a new PR review
      const response = await apiClient.post('pr-reviews/create-pr-review/', {
        returnId: returnId,  // Send the returnId in the request body
      });
      console.log('PR Review Created:', response.data);
      alert('PR Review Created Successfully!');
    } catch (err) {
      // Handle the case where a review already exists
      console.log('Error Response:', err.response);  // Log the full error response for debugging
      if (err.response && err.response.data.error === 'A PR Review already exists for this return ID.') {
        alert('A PR Review already exists for this Return.');
      } else {
        console.error('Error creating PR Review:', err);
        alert('Error creating PR Review');
      }
    }
  };

  return (
    <button
      className="style-button"
      style={{ padding: '0.2rem 0.4rem', fontSize: '0.8rem', lineHeight: '1.2' }}
      onClick={handleCreateReview} // Trigger create review on button click
    >
      Create Review
    </button>
  );
};

export default CreateReview;

