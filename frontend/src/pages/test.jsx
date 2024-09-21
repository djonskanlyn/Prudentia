import React, { useState, useEffect } from 'react';
import { fetchData } from '../components/FetchData';

const ReturnsFilter = ({ onSelectionChange }) => {
  // Initialize selectedFirm and selectedReportingDate from localStorage or default to empty values
  const [selectedFirm, setSelectedFirm] = useState(localStorage.getItem('firm') || '');
  const [selectedReportingDate, setSelectedReportingDate] = useState(localStorage.getItem('reportingDate') || '');
  
  const [firms, setFirms] = useState([]);
  const [reportingDates, setReportingDates] = useState([]);
  const [error, setError] = useState(null);

  // Fetch data for the firms and reporting dates
  const fetchReturnsList = async () => {
    try {
      const returnsList = await fetchData('data/returns-list-view/');
      const uniqueFirms = [...new Set(returnsList.map(item => item.firmName))];
      const uniqueReportingDates = [...new Set(returnsList.map(item => item.reportingDate))];
      setFirms(uniqueFirms);
      setReportingDates(uniqueReportingDates);
    } catch (err) {
      setError('Failed to fetch firms or reporting dates');
    }
  };

  useEffect(() => {
    fetchReturnsList();
  }, []);

  // Update parent with selected values
  useEffect(() => {
    if (selectedFirm && selectedReportingDate) {
      // Save to localStorage when the user selects a firm and reporting date
      localStorage.setItem('firm', selectedFirm);
      localStorage.setItem('reportingDate', selectedReportingDate);
      // Pass the selected values to the parent component
      onSelectionChange({ firm: selectedFirm, reportingDate: selectedReportingDate });
    }
  }, [selectedFirm, selectedReportingDate]);

  return (
    <div className="filter-container">
      {error && <div>Error: {error}</div>}
      
      {/* Firm Selection */}
      <div>
        <label htmlFor="firm-select">Select Firm:</label>
        <select
          id="firm-select"
          value={selectedFirm}
          onChange={e => setSelectedFirm(e.target.value)}
        >
          {/* <option value="">-- Select a Firm --</option> */}
          {firms.map(firm => (
            <option key={firm} value={firm}>{firm}</option>
          ))}
        </select>
      </div>

      {/* Reporting Date Selection */}
      <div>
        <label htmlFor="reporting-date-select">Select Reporting Date:</label>
        <select
          id="reporting-date-select"
          value={selectedReportingDate}
          onChange={e => setSelectedReportingDate(e.target.value)}
        >
          {/* <option value="">-- Select a Reporting Date --</option> */}
          {reportingDates.map(date => (
            <option key={date} value={date}>{date}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ReturnsFilter;