import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useTheme } from '../components/ThemeContext';
import { fetchData } from '../components/FetchData';
import { useParams } from 'react-router-dom';

const CapitalKeyMeasuresGrid = () => { // Updated the name to better reflect the content
  const { themeClass } = useTheme();
  const [rowData, setRowData] = useState([]);
  const [error, setError] = useState(null);
  const { reviewId } = useParams(); // Extract the reviewId from the URL

  const columnDefs = [
    { 
        field: 'measure', 
        headerName: 'Capital Key Measures', 
        wrapHeaderText: true, 
        autoHeaderHeight: true, 
        filter: true, 
        floatingFilter: false, 
        flex: 2.5, 
        minWidth: 250, 
        cellStyle: { textAlign: 'left' }, 
    },
	{ 
        field: 'current_Q0', 
        headerName: 'Current Qtr', 
        wrapHeaderText: true, 
        autoHeaderHeight: true, 
        filter: true, 
        floatingFilter: false, 
        flex: 1.0, 
        minWidth: 125, 
        cellStyle: { textAlign: 'right' },
        valueFormatter: (params) => {
            const value = parseFloat(params.value);
            if (!isNaN(value)) {
                return value >= 1000 
                    ? Math.round(value).toLocaleString('en-US')
                    : value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            }
            return '';
        }
    },
    { 
        field: 'prior_Q1', 
        headerName: 'Prior Qtr 1', 
        wrapHeaderText: true, 
        autoHeaderHeight: true, 
        filter: true, 
        floatingFilter: false, 
        flex: 1.0, 
        minWidth: 125, 
        cellStyle: { textAlign: 'right' },
        valueFormatter: (params) => {
            const value = parseFloat(params.value);
            if (!isNaN(value)) {
                return value >= 1000 
                    ? Math.round(value).toLocaleString('en-US')
                    : value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            }
            return '';
        }
    },
    { 
        field: 'prior_Q2', 
        headerName: 'Prior Qtr 2', 
        wrapHeaderText: true, 
        autoHeaderHeight: true, 
        filter: true, 
        floatingFilter: false, 
        flex: 1.0, 
        minWidth: 125, 
        cellStyle: { textAlign: 'right' },
        valueFormatter: (params) => {
            const value = parseFloat(params.value);
            if (!isNaN(value)) {
                return value >= 1000 
                    ? Math.round(value).toLocaleString('en-US')
                    : value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            }
            return '';
        }
    },
    { 
        field: 'prior_Q3', 
        headerName: 'Prior Qtr 3', 
        wrapHeaderText: true, 
        autoHeaderHeight: true, 
        filter: true, 
        floatingFilter: false, 
        flex: 1.0, 
        minWidth: 125, 
        cellStyle: { textAlign: 'right' },
        valueFormatter: (params) => {
            const value = parseFloat(params.value);
            if (!isNaN(value)) {
                return value >= 1000 
                    ? Math.round(value).toLocaleString('en-US')
                    : value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            }
            return '';
        }
    },
    { 
        field: 'prior_Q4', 
        headerName: 'Prior Year', 
        wrapHeaderText: true, 
        autoHeaderHeight: true, 
        filter: true, 
        floatingFilter: false, 
        flex: 1.0, 
        minWidth: 125, 
        cellStyle: { textAlign: 'right' },
        valueFormatter: (params) => {
            const value = parseFloat(params.value);
            if (!isNaN(value)) {
                return value >= 1000 
                    ? Math.round(value).toLocaleString('en-US')
                    : value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            }
            return '';
        }
    },
    { 
        field: 'perc_diff_pq', 
        headerName: '\u0394% Prior Qtr 1', 
        wrapHeaderText: true, 
        autoHeaderHeight: true, 
        filter: true, 
        floatingFilter: false, 
        flex: 1.0, 
        minWidth: 100, 
        valueFormatter: (params) => {
            const value = parseFloat(params.value);
            if (!isNaN(value)) {
                return value >= 1000 
                    ? Math.round(value).toLocaleString('en-US')
                    : value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            }
            return '';
        },
        cellStyle: (params) => {
            const value = parseFloat(params.value);
            if (!isNaN(value)) {
                return {
                    textAlign: 'right', // Aligns the text to the right
                    color: value > 0 ? 'green' : 'red', // Green for positive, red for negative
                };
            }
            return { textAlign: 'right' }; // Ensure right alignment for empty/invalid values
        },
    },
    { 
        field: 'perc_diff_py', 
        headerName: '\u0394% Prior Year', 
        wrapHeaderText: true, 
        autoHeaderHeight: true, 
        filter: true, 
        floatingFilter: false, 
        flex: 1.0, 
        minWidth: 100, 
        valueFormatter: (params) => {
            const value = parseFloat(params.value);
            if (!isNaN(value)) {
                return value >= 1000 
                    ? Math.round(value).toLocaleString('en-US')
                    : value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            }
            return '';
        },
        cellStyle: (params) => {
            const value = parseFloat(params.value);
            if (!isNaN(value)) {
                return {
                    textAlign: 'right', // Aligns the text to the right
                    color: value > 0 ? 'green' : 'red', // Green for positive, red for negative
                };
            }
            return { textAlign: 'right' }; // Ensure right alignment for empty/invalid values
        },
    },
    { 
        field: 'average', 
        headerName: 'Current Qtr Sector Average', 
        wrapHeaderText: true, 
        autoHeaderHeight: true, 
        filter: true, 
        floatingFilter: false, 
        flex: 1.0, 
        minWidth: 150, 
        cellStyle: { textAlign: 'right' },
        valueFormatter: (params) => {
            const value = parseFloat(params.value);
            if (!isNaN(value)) {
                return value >= 1000 
                    ? Math.round(value).toLocaleString('en-US')
                    : value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            }
            return '';
        },
    },
    { 
        field: 'comments', 
        headerName: 'Comments', 
        wrapHeaderText: true, 
        autoHeaderHeight: true, 
        filter: true, 
        floatingFilter: false, 
        flex: 2.0, 
        minWidth: 250, 
        cellStyle: { textAlign: 'left', whiteSpace: 'normal' },
        editable: true,
        autoHeight: true
    },
  ];

  useEffect(() => {
    const fetchGridData = async () => {
      try {
        const data = await fetchData(`pr-reviews/pr-reviews-details/${reviewId}/`); // Fetch the data based on reviewId
        const filteredData = data.filter(row => row.source === 'capital'); // Filter for 'capital' measures only
        setRowData(filteredData); // Set the filtered data
      } catch (err) {
        setError(err.message); // Handle errors gracefully
      }
    };

    if (reviewId) { // Ensure reviewId is available before fetching data
      fetchGridData();
    }
  }, [reviewId]); // Include reviewId in the dependency array to refetch data when it changes


  const handleCellValueChange = async (params) => {
    if (params.colDef.field === 'comments') {
      try {
        await saveCommentUpdate(params.data); // Implement the API call to save the comment
        console.log('Comment updated:', params.data);
      } catch (error) {
        console.error('Failed to save comment:', error);
      }
    }
  };

  return (
    <div className={themeClass} style={{ width: '100%' }}>
      {error && <div>Error: {error}</div>}
      {!error && !rowData.length && <div>No data available</div>} {/* Handle the case when no data is returned */}
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={false}
        domLayout='autoHeight'
        onCellValueChanged={handleCellValueChange}
      />
    </div>
  );
};

export default CapitalKeyMeasuresGrid; // Updated name
