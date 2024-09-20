import React, { useState, useEffect } from 'react';
import { useTheme } from '../components/ThemeContext';
import { fetchData } from '../components/FetchData';
import { formatData } from '../components/FormatFunctions';

const InvestmentsDepositsGrid = () => {
  const { themeClass } = useTheme();
  const [dataSource, setDataSource] = useState([]);
  const [error, setError] = useState(null);

  // Set the API endpoint variable
  const endpoint = 'data/deposits-investments-fact/?returnId=3';

  // Function to fetch and format data
  const fetchDataSource = async () => {
    try {
      // Fetch data from the API
      const data = await fetchData(endpoint);

      // Format the data using formatData
      const formattedData = data.map(item => formatData(item));

      // Construct the table rows based on formatted data
      const dataSource = [
        {
          key: '0', 
          dim: '', 
          aaci: 'euro', 
          iess: 'euro', 
          cbd: 'euro', 
          bb: 'euro', 
          oi: 'euro', 
          total: 'euro',
        },
        {
          key: '1', 
          dim: 'Cash equivalents', 
          aaci: findFormattedValue(formattedData, '1', 'accountsAuthorisedCreditInstitutions'),
          iess: findFormattedValue(formattedData, '1', 'irishEeaStateSecurities'),
          cbd: findFormattedValue(formattedData, '1', 'centralBankDeposits'),
          bb: findFormattedValue(formattedData, '1', 'bankBonds'),
          oi: findFormattedValue(formattedData, '1', 'otherInvestments'),
          total: findFormattedValue(formattedData, '1', 'totalDepositsAndInvestments')
        },
        {
          key: '2', 
          dim: 'Under 3 mths', 
          aaci: findFormattedValue(formattedData, '2', 'accountsAuthorisedCreditInstitutions'),
          iess: findFormattedValue(formattedData, '2', 'irishEeaStateSecurities'),
          cbd: findFormattedValue(formattedData, '2', 'centralBankDeposits'),
          bb: findFormattedValue(formattedData, '2', 'bankBonds'),
          oi: findFormattedValue(formattedData, '2', 'otherInvestments'),
          total: findFormattedValue(formattedData, '2', 'totalDepositsAndInvestments')
        },
        {
          key: '3', 
          dim: '3 to 12 mths', 
          aaci: findFormattedValue(formattedData, '3', 'accountsAuthorisedCreditInstitutions'),
          iess: findFormattedValue(formattedData, '3', 'irishEeaStateSecurities'),
          cbd: findFormattedValue(formattedData, '3', 'centralBankDeposits'),
          bb: findFormattedValue(formattedData, '3', 'bankBonds'),
          oi: findFormattedValue(formattedData, '3', 'otherInvestments'),
          total: findFormattedValue(formattedData, '3', 'totalDepositsAndInvestments')
        },
        {
          key: '4', 
          dim: '1 to 5 yrs', 
          aaci: findFormattedValue(formattedData, '4', 'accountsAuthorisedCreditInstitutions'),
          iess: findFormattedValue(formattedData, '4', 'irishEeaStateSecurities'),
          cbd: findFormattedValue(formattedData, '4', 'centralBankDeposits'),
          bb: findFormattedValue(formattedData, '4', 'bankBonds'),
          oi: findFormattedValue(formattedData, '4', 'otherInvestments'),
          total: findFormattedValue(formattedData, '4', 'totalDepositsAndInvestments')
        },
        {
          key: '5', 
          dim: '5 to 7 yrs', 
          aaci: findFormattedValue(formattedData, '5', 'accountsAuthorisedCreditInstitutions'),
          iess: findFormattedValue(formattedData, '5', 'irishEeaStateSecurities'),
          cbd: findFormattedValue(formattedData, '5', 'centralBankDeposits'),
          bb: findFormattedValue(formattedData, '5', 'bankBonds'),
          oi: findFormattedValue(formattedData, '5', 'otherInvestments'),
          total: findFormattedValue(formattedData, '5', 'totalDepositsAndInvestments')
        },
        {
          key: '6', 
          dim: '7 to 10 yrs', 
          aaci: findFormattedValue(formattedData, '6', 'accountsAuthorisedCreditInstitutions'),
          iess: findFormattedValue(formattedData, '6', 'irishEeaStateSecurities'),
          cbd: findFormattedValue(formattedData, '6', 'centralBankDeposits'),
          bb: findFormattedValue(formattedData, '6', 'bankBonds'),
          oi: findFormattedValue(formattedData, '6', 'otherInvestments'),
          total: findFormattedValue(formattedData, '6', 'totalDepositsAndInvestments')
        },
        {
          key: '7', 
          dim: 'Over 10 yrs', 
          aaci: findFormattedValue(formattedData, '7', 'accountsAuthorisedCreditInstitutions'),
          iess: findFormattedValue(formattedData, '7', 'irishEeaStateSecurities'),
          cbd: findFormattedValue(formattedData, '7', 'centralBankDeposits'),
          bb: findFormattedValue(formattedData, '7', 'bankBonds'),
          oi: findFormattedValue(formattedData, '7', 'otherInvestments'),
          total: findFormattedValue(formattedData, '7', 'totalDepositsAndInvestments')
        },
        {
          key: '8', 
          dim: 'Total', 
          aaci: findFormattedValue(formattedData, '8', 'accountsAuthorisedCreditInstitutions'),
          iess: findFormattedValue(formattedData, '8', 'irishEeaStateSecurities'),
          cbd: findFormattedValue(formattedData, '8', 'centralBankDeposits'),
          bb: findFormattedValue(formattedData, '8', 'bankBonds'),
          oi: findFormattedValue(formattedData, '8', 'otherInvestments'),
          total: findFormattedValue(formattedData, '8', 'totalDepositsAndInvestments'),
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
  }, []);

  // Helper function to find formatted value based on dimension
  const findFormattedValue = (data, dim, key) => {
    const entry = data.find(item => item.depositsInvestmentsDim === dim);  // Find the matching entry
    return entry ? entry[key] : 'N/A';  // Return the value or 'N/A' if not found
  };

  const table = (
    <table className="custom-table" style={{ marginBottom: '20px' }}>
      <thead>
        <tr>
          <th style={{ fontWeight: 'bold' }}>DEPOSITS & INVESTMENTS</th>
          <th style={{ fontWeight: 'bold' }}>Accounts in authorised credit institutions</th>
          <th style={{ fontWeight: 'bold' }}>Irish and EEA states securities</th>
          <th style={{ fontWeight: 'bold' }}>Central bank deposits</th>
          <th style={{ fontWeight: 'bold' }}>Bank bonds</th>
          <th style={{ fontWeight: 'bold' }}>Other investments</th>
          <th style={{ fontWeight: 'bold' }}>Total deposits and investments</th>
        </tr>
      </thead>
      <tbody>
        {dataSource.map((item) => (
          <tr key={item.key} className={item.className || ''}>
            <td> {item.dim} </td>
            <td style={{ textAlign: item.key === '0' ? 'center' : 'right' }}>{item.aaci}</td>
            <td style={{ textAlign: item.key === '0' ? 'center' : 'right' }}>{item.iess}</td>
            <td style={{ textAlign: item.key === '0' ? 'center' : 'right' }}>{item.cbd}</td>
            <td style={{ textAlign: item.key === '0' ? 'center' : 'right' }}>{item.bb}</td>
            <td style={{ textAlign: item.key === '0' ? 'center' : 'right' }}>{item.oi}</td>
            <td style={{ textAlign: item.key === '0' ? 'center' : 'right' }} className={item.key !== '0' ? 'grey-background' : ''}>
              {item.total}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className={`${themeClass} grid-container`} style={{ width: '900px', margin: '0 auto' }}>
      {error && <div>Error: {error}</div>}
      {!error && table}
    </div>
  );
};

export default InvestmentsDepositsGrid;