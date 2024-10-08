import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useTheme } from '../components/ThemeContext';
import { fetchData } from '../components/FetchData';
import CreateReview from '../components/CreateReview';
import { useNavigate } from 'react-router-dom';


const ReturnsListGrid = () => {
  const { themeClass } = useTheme();
  const [rowData, setRowData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const columnDefs = [
    { field: 'id', headerName: 'Id', filter: true, floatingFilter: false, flex: 0.5, minWidth: 75 },
	{ field: 'firmName', headerName: 'Firm', filter: true, floatingFilter: true, flex: 1.0, minWidth: 150 },
	{ 
		field: 'reportingDate', 
		headerName: 'Report Date', 
		filter: true, 
		floatingFilter: true, 
		flex: 0.75,
		minWidth: 125, 
		cellRenderer: (params) => {
			if (!params.value) return '';
			const date = new Date(params.value);
			const day = String(date.getDate()).padStart(2, '0');
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const year = date.getFullYear();
			return `${day}/${month}/${year}`;
		},
	},
	{ field: 'statusName', headerName: 'Status', filter: true, floatingFilter: false, flex: 0.5, minWidth: 120 },
	{ field: 'stateName', headerName: 'State', filter: true, floatingFilter: false, flex: 0.5, minWidth: 100 },
    { field: 'versionRef', headerName: 'Version', filter: true, floatingFilter: false, flex: 0.5, minWidth: 110 },
	{
	field: 'reviews',
	headerName: 'Reviews',
	cellRenderer: (params) => <CreateReview returnId={params.data.id} />, // Use CreateReview component
	flex: 0.5,
	minWidth: 140,
	}	  
  ];

  useEffect(() => {
    const fetchGridData = async () => {
      try {
        const data = await fetchData('data/returns-list-view/'); // Relative to baseURL
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

export default ReturnsListGrid;



