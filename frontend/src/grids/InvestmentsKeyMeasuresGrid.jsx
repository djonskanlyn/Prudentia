import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useTheme } from '../components/ThemeContext';
import { fetchData, updateData } from '../components/FetchData';
import { useParams } from 'react-router-dom';

const InvestmentsKeyMeasuresGrid = () => { 
  const { themeClass } = useTheme();
  const [rowData, setRowData] = useState([]);
  const [error, setError] = useState(null);
  const { reviewId } = useParams();

  const updateMeasureComments = async (updatedData) => {
    try {
      const response = await updateData(`pr-reviews/update-measure-comments/${updatedData.id}/`, {
        comments: updatedData.comments, // Only pass the comments data
      });

      console.log('Comment updated successfully', response);
    } catch (err) {
      setError('Failed to update comment: ' + err.message); // Handle the error
    }
  };

  const onCellValueChanged = (event) => {
    if (event.colDef.field === 'comments') {
      updateMeasureComments(event.data);
    }
  };

  const columnDefs = [
    { 
        field: 'measure', 
        headerName: 'Key Measures', 
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
        const filteredData = data.filter(row => row.source === 'investment'); // Filter for 'capital' measures only
        const sortedData = filteredData.sort((a, b) => a.id - b.id); 
        setRowData(sortedData); // Set the filtered data
      } catch (err) {
        setError(err.message); // Handle errors gracefully
      }
    };

    if (reviewId) { // Ensure reviewId is available before fetching data
      fetchGridData();
    }
  }, [reviewId]); // Include reviewId in the dependency array to refetch data when it changes


  return (
    <div className={themeClass} style={{ width: '100%' }}>
      {error && <div>Error: {error}</div>}
      {!error && !rowData.length && <div>No data available</div>} {/* Handle the case when no data is returned */}
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={false}
        domLayout='autoHeight'
        onCellValueChanged={onCellValueChanged} // Add this event listener
      />
    </div>
  );
};

export default InvestmentsKeyMeasuresGrid;