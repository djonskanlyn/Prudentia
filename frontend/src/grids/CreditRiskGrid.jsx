import React, { useState, useEffect } from 'react';
import { useTheme } from '../components/ThemeContext';
import { fetchData } from '../components/FetchData';
import { formatData } from '../components/FormatFunctions';
import { useReturnId } from '../pages/ReturnsDetailPage';


const CreditRiskGrid = () => {
  const { themeClass } = useTheme();
  const returnId = useReturnId();  // Get returnId from context
  const [dataSource, setDataSource] = useState([]);
  const [error, setError] = useState(null);

  // Function to fetch and format data
  const fetchDataSource = async () => {
    if (!returnId) return;  // Ensure returnId is available before fetching
      try {
        // Use returnId in the endpoint
        const endpoint = `data/credit-risk-fact/?returnId=${returnId}`;
        const data = await fetchData(endpoint);

        // Format the data using formatData
        const formattedData = data.map(item => formatData(item));

        // Construct the table rows based on formatted data
        const dataSource = [
          {
            key: '1', 
            dim: 'Not impaired', 
            na: findFormattedValue(formattedData, '1', 'numberCreditRisk'), 
            aa: findFormattedValue(formattedData, '1', 'amountCreditRisk'), 
            pa: findFormattedValue(formattedData, '1', 'provisionsAmountCreditRisk'), 
            className: 'grey-background'
          },
          {
            key: '1.1', 
            dim: '',
            na: '', 
            aa: '',
            pa: '', 
          },
          {
            key: '1.9',
            dim: 'Impaired',
            na: '',
            aa: '',
            pa: '',
            className: 'grey-background'
          },
          {
            key: '2', 
            dim: 'Not past due', 
            na: findFormattedValue(formattedData, '2', 'numberCreditRisk'), 
            aa: findFormattedValue(formattedData, '2', 'amountCreditRisk'), 
            pa: findFormattedValue(formattedData, '2', 'provisionsAmountCreditRisk'), 
          },
          {
            key: '3', 
            dim: 'Under 9 wks', 
            na: findFormattedValue(formattedData, '3', 'numberCreditRisk'), 
            aa: findFormattedValue(formattedData, '3', 'amountCreditRisk'), 
            pa: findFormattedValue(formattedData, '3', 'provisionsAmountCreditRisk'), 
          },
          {
            key: '4', 
            dim: '10 to 18 wks', 
            na: findFormattedValue(formattedData, '4', 'numberCreditRisk'), 
            aa: findFormattedValue(formattedData, '4', 'amountCreditRisk'), 
            pa: findFormattedValue(formattedData, '4', 'provisionsAmountCreditRisk'), 
          },
          {
            key: '5', 
            dim: '19 to 26 wks', 
            na: findFormattedValue(formattedData, '5', 'numberCreditRisk'), 
            aa: findFormattedValue(formattedData, '5', 'amountCreditRisk'), 
            pa: findFormattedValue(formattedData, '5', 'provisionsAmountCreditRisk'), 
          },
          {
            key: '6', 
            dim: '27 to 39 wks', 
            na: findFormattedValue(formattedData, '6', 'numberCreditRisk'), 
            aa: findFormattedValue(formattedData, '6', 'amountCreditRisk'), 
            pa: findFormattedValue(formattedData, '6', 'provisionsAmountCreditRisk'), 
          },
          {
            key: '7', 
            dim: '40 to 52 wks', 
            na: findFormattedValue(formattedData, '7', 'numberCreditRisk'), 
            aa: findFormattedValue(formattedData, '7', 'amountCreditRisk'), 
            pa: findFormattedValue(formattedData, '7', 'provisionsAmountCreditRisk'), 
          },
          {
            key: '8', 
            dim: 'Over 53 wks', 
            na: findFormattedValue(formattedData, '8', 'numberCreditRisk'), 
            aa: findFormattedValue(formattedData, '8', 'amountCreditRisk'), 
            pa: findFormattedValue(formattedData, '8', 'provisionsAmountCreditRisk'), 
          },
          {
            key: '9', 
            dim: 'Total impaired', 
            na: findFormattedValue(formattedData, '9', 'numberCreditRisk'), 
            aa: findFormattedValue(formattedData, '9', 'amountCreditRisk'), 
            pa: findFormattedValue(formattedData, '9', 'provisionsAmountCreditRisk'), 
            className: 'grey-background'
          },
          {
            key: '9.1', 
            dim: '', 
            na: '', 
            aa: '', 
            pa: '', 
          },
          {
            key: '10', 
            dim: 'Total loans', 
            na: findFormattedValue(formattedData, '10', 'numberCreditRisk'), 
            aa: findFormattedValue(formattedData, '10', 'amountCreditRisk'), 
            pa: findFormattedValue(formattedData, '10', 'provisionsAmountCreditRisk'), 
            className: 'grey-background'
          }
        ];

      setDataSource(dataSource); // Update the dataSource state with API data
      } catch (err) {
        setError('Failed to fetch data');
      }
  };

  // Use useEffect to call the API when the component mounts
  useEffect(() => {
    fetchDataSource();
  }, [returnId]);

  // Helper function to find formatted value based on dimension
  const findFormattedValue = (data, dim, key) => {
    const entry = data.find(item => item.creditRiskDim === dim);  // Find the matching entry
    return entry ? entry[key] : 'N/A';  // Return the value or 'N/A' if not found
  };

  const table = (
    <table id="credit-risk-table" className="custom-table" style={{ marginBottom: '20px', width: '100%', tableLayout: 'fixed' }}>
      <thead>
        {/* First header row */}
        <tr>
          <th rowSpan="2" style={{ fontWeight: 'bold', width: '25%', textAlign: 'left' }}>CREDIT RISK DISCLOSURES</th>
          <th colSpan="1" style={{ fontWeight: 'bold', width: '25%', textAlign: 'center' }}>Number of loans</th>
          <th colSpan="1" style={{ fontWeight: 'bold', width: '25%', textAlign: 'center' }}>Amount of loans</th>
          <th rowSpan="1" style={{ fontWeight: 'bold', width: '25%', textAlign: 'center' }}>Amount of provisions</th>
        </tr>
        {/* Second header row */}
        <tr>
          <th style={{ fontWeight: 'normal', whiteSpace: 'nowrap', textAlign: 'center' }}>number</th>
          <th style={{ fontWeight: 'normal', whiteSpace: 'nowrap', textAlign: 'center' }}>euro</th>
          <th style={{ fontWeight: 'normal', whiteSpace: 'nowrap', textAlign: 'center' }}>euro</th>
        </tr>
      </thead>
      <tbody>
        {dataSource.map((item) => (
          <tr key={item.key} className={item.className || ''}>
            <td>{item.dim}</td>
            <td style={{ whiteSpace: 'nowrap', textAlign: 'right' }}>{item.na}</td>
            <td style={{ whiteSpace: 'nowrap', textAlign: 'right' }}>{item.aa}</td>
            <td style={{ whiteSpace: 'nowrap', textAlign: 'right' }}>{item.pa}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className={`${themeClass} grid-container`} style={{ width: '700px', margin: '0 auto' }}>
      {error && <div>Error: {error}</div>}
      {!error && table}
    </div>
  );

};

export default CreditRiskGrid;




