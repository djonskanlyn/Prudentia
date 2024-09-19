import React from 'react';
import { useTheme } from '../components/ThemeContext'; // Import the custom hook


const dataSource = [
  { key: '0.1', description: '', amount1: '', amount2: '', amount3: '' },
  { key: '0.9', description: 'Assets', amount1: '', amount2: '', amount3: '', className: 'grey-background' },
  { key: '1', description: 'Cash and balances at bank', amount1: '', amount2: '9,000,000,000', amount3: '' },
  { key: '2', description: 'Deposits and investments: cash equivalents', amount1: '', amount2: '9,000,000,000', amount3: '' },
  { key: '3', description: 'Deposits and investments: other', amount1: '', amount2: '9,000,000,000', amount3: '' },
  { key: '4', description: 'Member loans', amount1: '', amount2: '9,000,000,000', amount3: '' },
  { key: '5', description: 'Bad debts provision', amount1: '', amount2: '9,000,000,000', amount3: '' },
  { key: '6', description: 'Tangible fixed assets', amount1: '', amount2: '9,000,000,000', amount3: '' },
  { key: '7', description: 'Debtors and prepayments', amount1: '', amount2: '9,000,000,000', amount3: '' },
  { key: '8', description: 'Total assets', amount1: '', amount2: '', amount3: '9,000,000,000', className: 'border-top-2 double-bottom-border' },
  { key: '8.1', description: '', amount1: '', amount2: '', amount3: '' },
  { key: '8.9', description: 'Liabilities and reserves', amount1: '', amount2: '', amount3: '', className: 'grey-background' },
  { key: '9', description: 'Member shares', amount1: '9,000,000,000', amount2: '', amount3: '' },
  { key: '10', description: 'Member budget accounts', amount1: '9,000,000,000', amount2: '', amount3: '' },
  { key: '11', description: 'Liabilities and accruals', amount1: '9,000,000,000', amount2: '', amount3: '' },
  { key: '12', description: 'Other provisions', amount1: '9,000,000,000', amount2: '', amount3: '' },
  { key: '13', description: 'Total liabilities', amount1: '', amount2: '9,000,000,000', amount3: '', className: 'border-top-1' },
  { key: '13.1', description: '', amount1: '', amount2: '', amount3: '' },
  { key: '14', description: 'Regulatory reserve', amount1: '9,000,000,000', amount2: '', amount3: '' },
  { key: '15', description: 'Operational risk reserve', amount1: '9,000,000,000', amount2: '', amount3: '' },
  { key: '16', description: 'Surplus or deficit', amount1: '9,000,000,000', amount2: '', amount3: '' },
  { key: '17', description: 'Other realised reserves', amount1: '9,000,000,000', amount2: '', amount3: '' },
  { key: '18', description: 'Other unrealised reserves', amount1: '9,000,000,000', amount2: '', amount3: '' },
  { key: '19', description: 'Total reserves', amount1: '', amount2: '9,000,000,000', amount3: '', className: 'border-top-1' },
  { key: '20', description: 'Total liabilities and reserves', amount1: '', amount2: '', amount3: '9,000,000,000', className: 'border-top-2 double-bottom-border' },
];

const BalanceSheetGrid= () => {
  const { themeClass } = useTheme(); // Access the theme class from context

  return (
    <div className={`${themeClass} grid-container`} style={{ width: '700px', margin: '0 auto' }}>
      <table className="custom-table">
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
              <td>{item.amount1}</td>
              <td>{item.amount2}</td>
              <td>{item.amount3}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BalanceSheetGrid;



















