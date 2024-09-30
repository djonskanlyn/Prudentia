import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useTheme } from '../components/ThemeContext';
import { fetchData } from '../components/FetchData';
import { useNavigate } from 'react-router-dom';

const PrReviewsGrid = () => {
  const { themeClass } = useTheme();
  const [rowData, setRowData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const columnDefs = [
    { field: 'id', headerName: 'Review', filter: true, floatingFilter: false, flex: 0.5, minWidth: 75 },
	{ field: 'returnId', headerName: 'Return', filter: true, floatingFilter: false, flex: 0.5, minWidth: 75 },
	{ field: 'firm', headerName: 'Firm', filter: true, floatingFilter: true, flex: 1.0, minWidth: 200 },
	{ 
		field: 'reportingDate', 
		headerName: 'Reporting Date', 
		filter: true, 
		floatingFilter: true, 
		flex: 0.75,
		minWidth: 150, 
		cellRenderer: (params) => {
			if (!params.value) return '';
			const date = new Date(params.value);
			const day = String(date.getDate()).padStart(2, '0');
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const year = date.getFullYear();
			return `${day}/${month}/${year}`;
		},
	},
	{ field: 'returnState', headerName: 'State', filter: true, floatingFilter: false, flex: 0.5, minWidth: 100 },
    { field: 'returnVersion', headerName: 'Version', filter: true, floatingFilter: false, flex: 0.5, minWidth: 110 },
    { 
		field: 'created_at', 
		headerName: 'Created At', 
		filter: true, 
		floatingFilter: false, 
		flex: 1.0,
		minWidth: 200, 
		cellRenderer: (params) => {
		  if (!params.value) return '';
		  const date = new Date(params.value);
		  const year = date.getUTCFullYear();
		  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
		  const day = String(date.getUTCDate()).padStart(2, '0');
		  const hours = String(date.getUTCHours()).padStart(2, '0');
		  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
		  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
		  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
		},
	  },
	  { 
		field: 'updated_at', 
		headerName: 'Updated At', 
		filter: true, 
		floatingFilter: false, 
		flex: 1.0,
		minWidth: 200, 
		cellRenderer: (params) => {
		  if (!params.value) return '';
		  const date = new Date(params.value);
		  const year = date.getUTCFullYear();
		  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
		  const day = String(date.getUTCDate()).padStart(2, '0');
		  const hours = String(date.getUTCHours()).padStart(2, '0');
		  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
		  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
		  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
		},
	  },
	  {
      field: 'action',
      headerName: 'Actions',
      cellRenderer: (params) => (
        <button className='style-button' style={{ padding: '0.2rem 0.4rem', fontSize: '0.8rem', lineHeight: '1.2' }} onClick={() => navigate(`/info`)}>view details</button>
      ),
      flex: 0.75,
      minWidth: 150,
    },
  ];

  useEffect(() => {
    const fetchGridData = async () => {
      try {
        const data = await fetchData('pr-reviews/pr-reviews-with-details/'); // Relative to baseURL
        setRowData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchGridData();
  }, []);

  return (
    <div className={themeClass} style={{ height: '100%', width: '100%' }}>
      {error && <div>Error: {error}</div>}
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
      />
    </div>
  );
};

export default PrReviewsGrid;
