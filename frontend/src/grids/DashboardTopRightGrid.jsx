import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useTheme } from '../components/ThemeContext'; // Importing the theme context
import { fetchData } from '../components/FetchData';

const DashboardTopRightGrid = () => {
  const { themeClass } = useTheme(); // Access theme class from context
  const [rowData, setRowData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGridData = async () => {
      try {
        const data = await fetchData('pr-reviews/dashboard-data');
        setRowData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchGridData();
  }, []);

  const columnDefs = [
    { 
		field: 'reportingDate', 
		headerName: 'Report Date', 
		flex: 0.75,
		minWidth: 125,
        wrapHeaderText: true, 
        autoHeaderHeight: true, 
		cellRenderer: (params) => {
			if (!params.value) return '';
			const date = new Date(params.value);
			const day = String(date.getDate()).padStart(2, '0');
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const year = date.getFullYear();
			return `${day}/${month}/${year}`;
		},
	},
    { field: 'total_returns', headerName: 'Scheduled', wrapHeaderText: true, autoHeaderHeight: true, flex: 0.5, minWidth: 110 },
    { field: 'submitted_returns', headerName: 'Submitted', wrapHeaderText: true, autoHeaderHeight: true, flex: 0.5, minWidth: 110 },
    { field: 'supervisor_signoffs', headerName: 'PR Reviews Single Sign-off', wrapHeaderText: true, autoHeaderHeight: true, flex: 0.5, minWidth: 110 },
    { field: 'senior_supervisor_signoffs', headerName: 'PR Reviews Complete', wrapHeaderText: true, autoHeaderHeight: true, flex: 0.5, minWidth: 110 },
  ];

  return (
    <div className={themeClass} style={{ height: '100%', width: '100%' }}>
      {error && <div>Error: {error}</div>}
      {!error && !rowData.length && <div>No data available</div>}
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={false}
        domLayout="autoHeight"
      />
    </div>
  );
};

export default DashboardTopRightGrid;
