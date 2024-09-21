import React, { createContext, useState, useContext, useEffect } from 'react';
import ReturnsFilter from '../components/ReturnsFilter';
import TabStructure from '../components/TabStructure';
import { fetchData } from '../components/FetchData';

const ReturnIdContext = createContext();

// Custom hook to use the returnId context
export const useReturnId = () => useContext(ReturnIdContext);

const ReturnsDetailPage = () => {
  const [selectedData, setSelectedData] = useState({ firm: '', reportingDate: '' });
  const [returnId, setReturnId] = useState(null);
  const [error, setError] = useState(null);

  const handleSelectionChange = (data) => {
    setSelectedData(data);
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
      } else {
        setReturnId(null);
        setError('No matching return found.');
      }
    } catch (err) {
      setError('Failed to fetch return data.');
    }
  };

  useEffect(() => {
    if (selectedData.firm && selectedData.reportingDate) {
      fetchReturnId(selectedData.firm, selectedData.reportingDate);
    }
  }, [selectedData]);

  return (
    <ReturnIdContext.Provider value={returnId}>
      <div className="grid-page">
        <ReturnsFilter onSelectionChange={handleSelectionChange} />
        {error && <div>{error}</div>}
        {returnId && <p>Return ID: {returnId}</p>}
        <TabStructure />
      </div>
    </ReturnIdContext.Provider>
  );
};

export default ReturnsDetailPage;