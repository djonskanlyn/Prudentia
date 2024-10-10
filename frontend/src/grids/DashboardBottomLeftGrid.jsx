import React, { useEffect, useState } from 'react';

import { useTheme } from '../components/ThemeContext'; // Importing the theme context
import { fetchData } from '../components/FetchData';

const DashboardBottomLeftGrid = () => {
    return (
        <div className="outer-placeholder">
          <div className="temp-inner-placeholder">
            <h1>Profile Page</h1>
            <p>Welcome to the profile page!</p>
          </div>
        </div>
      );
};

export default DashboardBottomLeftGrid;
