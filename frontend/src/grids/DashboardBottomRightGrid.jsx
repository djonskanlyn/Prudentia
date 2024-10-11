import React, { useState, useEffect } from 'react';
import { AgCharts } from 'ag-charts-react';
import { useTheme } from '../components/ThemeContext';  // Import the ThemeContext hook
import { fetchData } from '../components/FetchData';

const DashboardTopRightGrid = () => {
  const { isDarkTheme } = useTheme();  // Get the theme state from the context
  const [chartData, setChartData] = useState([]);  // State to hold the API data

  // Function to fetch the data from the API
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const data = await fetchData('data/aggregated-balance-sheet/');
        
        // Convert string numbers to actual numbers
        const parsedData = data.map(item => ({
          reportingDate: item.reportingDate,
          totalAssets: parseFloat(item.totalAssets),
          totalInvestments: parseFloat(item.totalInvestments),
          membersLoans: parseFloat(item.membersLoans),
        }));

        setChartData(parsedData);  // Set the parsed data
      } catch (err) {
        setError('Failed to load data: ' + err.message);
      }
    };

    fetchChartData();
  }, []);

  // Define chart options with conditional theming based on the current theme
  const options = {
    data: chartData,
    series: [
      {
        type: 'bar',
        xKey: 'reportingDate',
        yKey: 'totalInvestments',
        yName: 'Total Investments',
        fill: '#3F704D',
      },
    ],
    axes: [
      {
        type: 'category',
        position: 'bottom',
        title: { text: 'Reporting Date', color: isDarkTheme ? '#ffffff' : '#000000' },  // White in dark theme
        label: { color: isDarkTheme ? '#ffffff' : '#000000' },  // White text in dark mode
      },
      {
        type: 'number',
        position: 'left',
        title: { text: 'Amount in Millions', color: isDarkTheme ? '#ffffff' : '#000000' },  // Adjust based on theme
        label: { color: isDarkTheme ? '#ffffff' : '#000000' },  // Adjust text color
      },
    ],
    background: {
      fill: isDarkTheme ? '#333333' : '#ffffff',  // Set background based on theme
    },
  };

  return <AgCharts options={options} />;
};

export default DashboardTopRightGrid;