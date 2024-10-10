import React from 'react';
import { AgCharts } from 'ag-charts-react';
import { useTheme } from '../components/ThemeContext';  // Import the ThemeContext hook

const DashboardTopLeftGrid = () => {
  const { isDarkTheme } = useTheme();  // Get the theme state from the context

  // Static sample data for bar chart (5 bars)
  const chartData = [
    { category: 'A', value: 10 },
    { category: 'B', value: 20 },
    { category: 'C', value: 30 },
    { category: 'D', value: 40 },
    { category: 'E', value: 50 },
  ];

  // Define chart options with conditional theming based on the current theme
  const options = {
    data: chartData,
    series: [
      {
        type: 'bar',
        xKey: 'category',
        yKey: 'value',
        yName: 'Value',
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
        title: { text: 'Value', color: isDarkTheme ? '#ffffff' : '#000000' },  // Adjust based on theme
        label: { color: isDarkTheme ? '#ffffff' : '#000000' },  // Adjust text color
      },
    ],
    background: {
      fill: isDarkTheme ? '#333333' : '#ffffff',  // Set background based on theme
    },
  };

  return <AgCharts options={options} />;
};

export default DashboardTopLeftGrid;








