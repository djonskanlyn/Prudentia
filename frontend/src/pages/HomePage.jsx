import React from 'react';
import DashboardTopRightGrid from '../grids/DashboardTopRightGrid';
import DashboardTopLeftGrid from '../grids/DashboardTopLeftGrid';
import DashboardBottomRightGrid from '../grids/DashboardBottomRightGrid';
import DashboardBottomLeftGrid from '../grids/DashboardBottomLeftGrid';


const HomePage = () => {
  return (
    <div className="grid-page">
      <h1>Home Dashboard</h1>
      <div className="dashboard-grid">
        <div className="dashboard-item top-right"> <h6>Returns & PR Reviews Status</h6> <DashboardTopRightGrid />  </div>
        <div className="dashboard-item top-left"> <h6>Total Sector Assets Chart</h6> <DashboardTopLeftGrid /> </div>
        <div className="dashboard-item bottom-right"> <h6>Total Sector Investments Chart</h6> <DashboardBottomRightGrid /> </div>
        <div className="dashboard-item bottom-left"> <h6>Total Sector Loans Chart</h6> <DashboardBottomLeftGrid /> </div>
      </div>
    </div>
  );
};

export default HomePage;