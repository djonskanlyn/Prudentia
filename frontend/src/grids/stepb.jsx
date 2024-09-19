import React from 'react';
import { useTheme } from '../components/ThemeContext'; // Import the custom hook


const dataSource = [
  { key: '0.1', description: '', amount1: '', amount2: '', amount3: '' },
  { key: '0.9', description: 'Income', amount1: '', amount2: '', amount3: '', className: 'grey-background' },
  { key: '1', description: 'Member loan interest', amount1: '9,000,000,000', amount2: '', amount3: '' },
  { key: '2', description: 'Other interest income', amount1: '9,000,000,000', amount2: '', amount3: '' },
  { key: '3', description: 'Other income', amount1: '9,000,000,000', amount2: '', amount3: '' },
  { key: '4', description: 'Total income', amount1: '', amount2: '9,000,000,000', amount3: '', className: 'border-top-1' },
  { key: '4.1', description: '', amount1: '', amount2: '', amount3: '' },
  { key: '4.9', description: 'Total expenditure', amount1: '', amount2: '', amount3: '', className: 'grey-background' },
  { key: '5', description: 'Employment costs', amount1: '9,000,000,000', amount2: '', amount3: '' },
  { key: '6', description: 'Other management costs', amount1: '9,000,000,000', amount2: '', amount3: '' },
  { key: '7', description: 'Depreciation costs', amount1: '9,000,000,000', amount2: '', amount3: '' },
  { key: '8', description: 'Net member loan impairment', amount1: '9,000,000,000', amount2: '', amount3: '' },
  { key: '9', description: 'Total expenditure', amount1: '', amount2: '9,000,000,000', amount3: '', className: 'border-top-1' },
  { key: '10', description: 'Surplus or deficit', amount1: '', amount2: '', amount3: '9,000,000,000', className: 'border-top-2 double-bottom-border' },
];

const IncomeExpenditureGrid= () => {
  const { themeClass } = useTheme(); // Access the theme class from context

  return (
    <div className={`${themeClass} grid-container`} style={{ width: '700px', margin: '0 auto' }}>
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

export default IncomeExpenditureGrid;