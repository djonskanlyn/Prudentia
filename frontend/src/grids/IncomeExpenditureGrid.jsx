import React, { useState, useEffect } from 'react';
import { useTheme } from '../components/ThemeContext';
import { fetchData } from '../components/FetchData';
import { formatData } from '../components/FormatFunctions';
import { useReturnId } from '../pages/ReturnsDetailPage';

const IncomeExpenditureGrid = () => {
  const { themeClass } = useTheme();
  const returnId = useReturnId();  // Get returnId from context
  const [dataSource, setDataSource] = useState([]);
  const [error, setError] = useState(null);

  // Function to fetch and format data
  const fetchDataSource = async () => {
    if (!returnId) return;  // Ensure returnId is available before fetching

    try {
      // Use returnId in the endpoint
      const endpoint = `data/income-expenditure-fact/${returnId}/`;
      const data = await fetchData(endpoint);

      // Format the data using formatData
      const formattedData = formatData(data);

      // Construct the table rows based on formatted data
      const dataSource = [
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
        { key: '10', description: 'Surplus or deficit', amount1: '', amount2: '', amount3: formattedData.surplusOrDeficit, className: 'border-top-2 double-bottom-border' }
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

  const table = (
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
  );

  return (
    <div className={`${themeClass} grid-container`} style={{ width: '700px', margin: '0 auto' }}>
      {error && <div>Error: {error}</div>}
      {!error && table}
    </div>
  );
};

export default IncomeExpenditureGrid;
