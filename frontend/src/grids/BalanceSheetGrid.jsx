import React, { useState, useEffect } from 'react';
import { useTheme } from '../components/ThemeContext';
import { fetchData } from '../components/FetchData';
import { formatData } from '../components/FormatFunctions';
import { useReturnId } from '../pages/ReturnsDetailPage';


const BalanceSheetGrid = () => {
  const { themeClass } = useTheme();
  const returnId = useReturnId();  // Get returnId from context
  const [dataSource, setDataSource] = useState([]);
  const [error, setError] = useState(null);

  // Function to fetch and format data
  const fetchDataSource = async () => {
    if (!returnId) return;  // Ensure returnId is available before fetching

    try {
      // Use returnId in the endpoint
      const endpoint = `data/balance-sheet-fact/${returnId}/`;
      const data = await fetchData(endpoint);

      // Format the data using formatData
      const formattedData = formatData(data);

      // Construct the table rows based on formatted data
      const dataSource = [
        { key: '0.1', description: '', amount1: '', amount2: '', amount3: '' },
        { key: '0.9', description: 'Assets', amount1: '', amount2: '', amount3: '', className: 'grey-background' },
        { key: '1', description: 'Cash and balances at bank', amount1: '', amount2: formattedData.cashBalancesBank, amount3: '' },
        { key: '2', description: 'Deposits and investments: cash equivalents', amount1: '', amount2: formattedData.depositsInvestmentsCashEquivalents, amount3: '' },
        { key: '3', description: 'Deposits and investments: other', amount1: '', amount2: formattedData.depositsInvestmentsOther, amount3: '' },
        { key: '4', description: 'Member loans', amount1: '', amount2: formattedData.membersLoans, amount3: '' },
        { key: '5', description: 'Bad debts provision', amount1: '', amount2: formattedData.badDebtProvisions, amount3: '' },
        { key: '6', description: 'Tangible fixed assets', amount1: '', amount2: formattedData.tangibleFixedAssets, amount3: '' },
        { key: '7', description: 'Debtors and prepayments', amount1: '', amount2: formattedData.debtorsPrepayments, amount3: '' },
        { key: '8', description: 'Total assets', amount1: '', amount2: '', amount3: formattedData.totalAssets, className: 'border-top-2 double-bottom-border' },
        { key: '8.1', description: '', amount1: '', amount2: '', amount3: '' },
        { key: '8.9', description: 'Liabilities and reserves', amount1: '', amount2: '', amount3: '', className: 'grey-background' },
        { key: '9', description: 'Member shares', amount1: formattedData.membersShares, amount2: '', amount3: '' },
        { key: '10', description: 'Member budget accounts', amount1: formattedData.membersBudgetAccounts, amount2: '', amount3: '' },
        { key: '11', description: 'Liabilities and accruals', amount1: formattedData.liabilitiesAccruals, amount2: '', amount3: '' },
        { key: '12', description: 'Other provisions', amount1: formattedData.otherProvisions, amount2: '', amount3: '' },
        { key: '13', description: 'Total liabilities', amount1: '', amount2: formattedData.totalLiabilities, amount3: '', className: 'border-top-1' },
        { key: '13.1', description: '', amount1: '', amount2: '', amount3: '' },
        { key: '14', description: 'Regulatory reserve', amount1: formattedData.regulatoryReserve, amount2: '', amount3: '' },
        { key: '15', description: 'Operational risk reserve', amount1: formattedData.operationalRiskReserve, amount2: '', amount3: '' },
        { key: '16', description: 'Surplus or deficit', amount1: formattedData.surplusOrDeficit, amount2: '', amount3: '' },
        { key: '17', description: 'Other realised reserves', amount1: formattedData.otherRealisedReserves, amount2: '', amount3: '' },
        { key: '18', description: 'Other unrealised reserves', amount1: formattedData.otherUnrealisedReserves, amount2: '', amount3: '' },
        { key: '19', description: 'Total reserves', amount1: '', amount2: formattedData.totalReserves, amount3: '', className: 'border-top-1' },
        { key: '20', description: 'Total liabilities and reserves', amount1: '', amount2: '', amount3: formattedData.totalLiabilitiesReserves, className: 'border-top-2 double-bottom-border' },
      ];
      setDataSource(dataSource); // Update the dataSource state with API data
    } catch (err) {
      setError('Failed to fetch data');
    }
  };  

  // Use useEffect to call the API when returnId is available
  useEffect(() => {
    fetchDataSource();
  }, [returnId]);



  const table = (
    <table id="balance-sheet-table" className="custom-table">
        <thead>
          <tr>
            <th>BALANCE SHEET</th>
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

export default BalanceSheetGrid;



















