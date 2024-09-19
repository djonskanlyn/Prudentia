import React from 'react';
import ReturnsListGrid from '../grids/ReturnsListGrid';

const ReturnsListPage = () => {
  return (
    <div className="grid-page">
      <h1>Returns List</h1>
      <div className="grid-container">
        <ReturnsListGrid />
      </div>
    </div>
  );
};

export default ReturnsListPage;