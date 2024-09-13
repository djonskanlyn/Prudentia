import React from 'react';
import PrReviewsGrid from '../grids/PrReviewsGrid';

const PrReviewsPage = () => {
  return (
    <div className="grid-page">
      <h1>PR Reviews</h1>
      <div className="grid-container">
        <PrReviewsGrid />
      </div>
    </div>
  );
};

export default PrReviewsPage;