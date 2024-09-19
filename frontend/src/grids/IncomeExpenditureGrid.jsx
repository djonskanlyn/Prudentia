import React, { useState, useEffect } from 'react';
import { useTheme } from '../components/ThemeContext'; // Import the custom hook
import { fetchData } from '../components/FetchData'; // Assuming fetchData is already implemented

const IncomeExpenditureGrid = () => {
  const { themeClass } = useTheme(); // Access the theme class from context
  const [dataSource, setDataSource] = useState([]);
  const [error, setError] = useState(null);

  // Helper function to format numbers with commas and no decimal places
  const formatNumber = (number) => {
    return Number(number).toLocaleString(undefined, { maximumFractionDigits: 0, minimumFractionDigits: 0 });
  };    

  // Function to fetch data from the API using fetchData
  const fetchIncomeExpenditureData = async () => {
    try {
      const data = await fetchData('data/income-expenditure-fact/3/'); // Using the fetchData function
      // Map the API response to your dataSource format

      // Preprocess the data to apply formatting before constructing the dataSource
      const formattedData = {
        memberLoanInterest: formatNumber(data.memberLoanInterest),
        otherInterestIncome: formatNumber(data.otherInterestIncome),
        otherIncome: formatNumber(data.otherIncome),
        totalIncome: formatNumber(data.totalIncome),
        employmentCosts: formatNumber(data.employmentCosts),
        otherManagementCosts: formatNumber(data.otherManagementCosts),
        depreciationCosts: formatNumber(data.depreciationCosts),
        netMemberLoanImpairment: formatNumber(data.netMemberLoanImpairment),
        totalExpenditure: formatNumber(-data.totalExpenditure), // Showing as negative
        surplusOrDeficit: formatNumber(data.surplusOrDeficit)
      };

      const newDataSource = [
        { key: '0.1', description: '', amount1: '', amount2: '', amount3: '' },
        { key: '0.9', description: 'Income', amount1: '', amount2: '', amount3: '', className: 'grey-background' },
        { key: '1', description: 'Member loan interest', amount1: formattedData.memberLoanInterest, amount2: '', amount3: '' },
        { key: '2', description: 'Other interest income', amount1: formattedData.otherInterestIncome, amount2: '', amount3: '' },
        { key: '3', description: 'Other income', amount1: formattedData.otherIncome, amount2: '', amount3: '' },
        { key: '4', description: 'Total income', amount1: '', amount2: formattedData.totalIncome, amount3: '', className: 'border-top-1' },
        { key: '4.1', description: '', amount1: '', amount2: '', amount3: '' },
        { key: '4.9', description: 'Total expenditure', amount1: '', amount2: '', amount3: '', className: 'grey-background' },
        { key: '5', description: 'Employment costs', amount1: formattedData.employmentCosts, amount2: '', amount3: '' },
        { key: '6', description: 'Other management costs', amount1: formattedData.otherManagementCosts, amount2: '', amount3: '' },
        { key: '7', description: 'Depreciation costs', amount1: formattedData.depreciationCosts, amount2: '', amount3: '' },
        { key: '8', description: 'Net member loan impairment', amount1: formattedData.netMemberLoanImpairment, amount2: '', amount3: '' },
        { key: '9', description: 'Total expenditure', amount1: '', amount2: formattedData.totalExpenditure, amount3: '', className: 'border-top-1' },
        { key: '10', description: 'Surplus or deficit', amount1: '', amount2: '', amount3: formattedData.surplusOrDeficit, className: 'border-top-2 double-bottom-border' },
      ];

      setDataSource(newDataSource); // Update the dataSource state with API data
    } catch (err) {
      setError('Failed to fetch data');
    }
  };

  // Use useEffect to call the API when the component mounts
  useEffect(() => {
    fetchIncomeExpenditureData();
  }, []);

  return (
    <div className={`${themeClass} grid-container`} style={{ width: '700px', margin: '0 auto' }}>
      {error && <div>Error: {error}</div>}
      <table className="custom-table">
        <thead>
          <tr>
            <th>INCOME & EXPENDITURE</th>
            <th style={{ fontWeight: 'normal', whiteSpace: 'nowrap', textAlign: 'center' }}>euro</th>
            <th style={{ fontWeight: 'normal', whiteSpace: 'nowrap', textAlign: 'center' }}>euro</th>
            <th style={{ fontWeight: 'normal', whiteSpace: 'nowrap', textAlign: 'center' }}>euro</th>
          </tr>
        </thead>
        <tbody>
          {dataSource.map((item) => (
            <tr key={item.key} className={item.className || ''}>
              <td>{item.description}</td>
              <td style={{ fontWeight: 'normal', whiteSpace: 'nowrap', textAlign: 'right' }}>{item.amount1}</td>
              <td style={{ fontWeight: 'normal', whiteSpace: 'nowrap', textAlign: 'right' }}>{item.amount2}</td>
              <td style={{ fontWeight: 'normal', whiteSpace: 'nowrap', textAlign: 'right' }}>{item.amount3}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncomeExpenditureGrid;