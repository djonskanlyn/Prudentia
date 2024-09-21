import React, { createContext, useState, useContext, useEffect } from 'react';
import ReturnsFilter from '../components/ReturnsFilter';
import TabStructure from '../components/TabStructure';
import { fetchData } from '../components/FetchData';

const ReturnIdContext = createContext();

// Custom hook to use the returnId context
export const useReturnId = () => useContext(ReturnIdContext);

const ReturnsDetailPage = () => {
  // Initialize state from localStorage or default values
  const [selectedData, setSelectedData] = useState({
    firm: localStorage.getItem('firm') || '',
    reportingDate: localStorage.getItem('reportingDate') || ''
  });
  const [returnId, setReturnId] = useState(localStorage.getItem('returnId') || null);
  const [error, setError] = useState(null);

  // Handle selection change from the filter component
  const handleSelectionChange = (data) => {
    setSelectedData(data);
    setError(null); // Clear any previous errors
  };

  const fetchReturnId = async (firm, reportingDate) => {
    try {
      const returnsList = await fetchData('data/returns-list-view/');
      const matchedReturn = returnsList.find(item => 
        item.firmName.toLowerCase() === firm.toLowerCase() &&
        item.reportingDate === reportingDate &&
        item.stateName.toLowerCase() === 'current'
      );
      if (matchedReturn) {
        setReturnId(matchedReturn.id);
        setError(null);
        // Save returnId to localStorage after fetching
        localStorage.setItem('returnId', matchedReturn.id);
      } else {
        setReturnId(null);
        setError('No matching return found.');
      }
    } catch (err) {
      setError('Failed to fetch return data.');
    }
  };

  // Use useEffect to monitor firm and reportingDate changes
  useEffect(() => {
    const { firm, reportingDate } = selectedData;

    // Check if both firm and reportingDate are selected before fetching returnId
    if (firm && reportingDate) {
      fetchReturnId(firm, reportingDate);
      // Save firm and reportingDate to localStorage after selection
      localStorage.setItem('firm', firm);
      localStorage.setItem('reportingDate', reportingDate);
    }
  }, [selectedData]); // This will run whenever firm or reportingDate changes

  return (
    <ReturnIdContext.Provider value={returnId}>
      <div className="grid-page">
        <ReturnsFilter onSelectionChange={handleSelectionChange} />
        {error && <div>{error}</div>}
        {/* {returnId && <p>Return ID: {returnId}</p>} */}
        <TabStructure />
      </div>
    </ReturnIdContext.Provider>
  );
};

export default ReturnsDetailPage;






