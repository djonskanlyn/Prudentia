import React from 'react';
import BreachReviewsGrid from '../grids/BreachReviewsGrid';

const BreachReviewsPage = () => {
  return (
    <div className="grid-page">
      <h1>Breach Reviews</h1>
      <div className="grid-container">
        <BreachReviewsGrid />
      </div>
    </div>
  );
};

export default BreachReviewsPage;