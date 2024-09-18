import React from 'react';
import ReturnsGrid from '../grids/ReturnsGrid';

const ReturnsPage = () => {
  return (
    <div className="grid-page">
      <h1>Returns List</h1>
      <div className="grid-container">
        <ReturnsGrid />
      </div>
    </div>
  );
};

export default ReturnsPage;