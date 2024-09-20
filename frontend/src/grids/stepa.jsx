import React from 'react';
import { useTheme } from '../components/ThemeContext';

const table1Data = [
  { key: '0', dim: '', aaci: 'euro', iess: 'euro', cbd: 'euro', bb: 'euro', oi: 'euro', total: 'euro' },
  { key: '1', dim: 'Cash equivalents', aaci: '9,000,000,000', iess: '9,000,000,000', cbd: '9,000,000,000', bb: '9,000,000,000', oi: '9,000,000,000', total: '9,000,000,000' },
  { key: '2', dim: 'Under 3 mths', aaci: '9,000,000,000', iess: '9,000,000,000', cbd: '9,000,000,000', bb: '9,000,000,000', oi: '9,000,000,000', total: '9,000,000,000' },
  { key: '3', dim: '3 to 12 mths', aaci: '9,000,000,000', iess: '9,000,000,000', cbd: '9,000,000,000', bb: '9,000,000,000', oi: '9,000,000,000', total: '9,000,000,000' },
  { key: '4', dim: '1 to 5 yrs', aaci: '9,000,000,000', iess: '9,000,000,000', cbd: '9,000,000,000', bb: '9,000,000,000', oi: '9,000,000,000', total: '9,000,000,000' },
  { key: '5', dim: '5 to 7 yrs', aaci: '9,000,000,000', iess: '9,000,000,000', cbd: '9,000,000,000', bb: '9,000,000,000', oi: '9,000,000,000', total: '9,000,000,000' },
  { key: '6', dim: '7 to 10 yrs', aaci: '9,000,000,000', iess: '9,000,000,000', cbd: '9,000,000,000', bb: '9,000,000,000', oi: '9,000,000,000', total: '9,000,000,000' },
  { key: '7', dim: 'Over 10 yrs', aaci: '9,000,000,000', iess: '9,000,000,000', cbd: '9,000,000,000', bb: '9,000,000,000', oi: '9,000,000,000', total: '9,000,000,000' },
  { key: '8', dim: 'Total', aaci: '9,000,000,000', iess: '9,000,000,000', cbd: '9,000,000,000', bb: '9,000,000,000', oi: '9,000,000,000', total: '9,000,000,000', className: 'grey-background' },
];

const table2Data = [
  { key: '0', dim: '% table total', aaci: '%', iess: '%', cbd: '%', bb: '%', oi: '%', total: '%' },
  { key: '1', dim: 'Cash equivalents', aaci: '100.00', iess: '100.00', cbd: '100.00', bb: '100.00', oi: '100.00', total: '100.00' },
  { key: '2', dim: 'Under 3 mths', aaci: '100.00', iess: '100.00', cbd: '100.00', bb: '100.00', oi: '100.00', total: '100.00' },
  { key: '3', dim: '3 to 12 mths', aaci: '100.00', iess: '100.00', cbd: '100.00', bb: '100.00', oi: '100.00', total: '100.00' },
  { key: '4', dim: '1 to 5 yrs', aaci: '100.00', iess: '100.00', cbd: '100.00', bb: '100.00', oi: '100.00', total: '100.00' },
  { key: '5', dim: '5 to 7 yrs', aaci: '100.00', iess: '100.00', cbd: '100.00', bb: '100.00', oi: '100.00', total: '100.00' },
  { key: '6', dim: '7 to 10 yrs', aaci: '100.00', iess: '100.00', cbd: '100.00', bb: '100.00', oi: '100.00', total: '100.00' },
  { key: '7', dim: 'Over 10 yrs', aaci: '100.00', iess: '100.00', cbd: '100.00', bb: '100.00', oi: '100.00', total: '100.00' },
  { key: '8', dim: 'Total', aaci: '100.00', iess: '100.00', cbd: '100.00', bb: '100.00', oi: '100.00', total: '100.00', className: 'grey-background' },
];

const table3Data = [
  { key: '0', dim: '% row total', aaci: '%', iess: '%', cbd: '%', bb: '%', oi: '%', total: '%' },
  { key: '1', dim: 'Cash equivalents', aaci: '100.00', iess: '100.00', cbd: '100.00', bb: '100.00', oi: '100.00', total: '100.00' },
  { key: '2', dim: 'Under 3 mths', aaci: '100.00', iess: '100.00', cbd: '100.00', bb: '100.00', oi: '100.00', total: '100.00' },
  { key: '3', dim: '3 to 12 mths', aaci: '100.00', iess: '100.00', cbd: '100.00', bb: '100.00', oi: '100.00', total: '100.00' },
  { key: '4', dim: '1 to 5 yrs', aaci: '100.00', iess: '100.00', cbd: '100.00', bb: '100.00', oi: '100.00', total: '100.00' },
  { key: '5', dim: '5 to 7 yrs', aaci: '100.00', iess: '100.00', cbd: '100.00', bb: '100.00', oi: '100.00', total: '100.00' },
  { key: '6', dim: '7 to 10 yrs', aaci: '100.00', iess: '100.00', cbd: '100.00', bb: '100.00', oi: '100.00', total: '100.00' },
  { key: '7', dim: 'Over 10 yrs', aaci: '100.00', iess: '100.00', cbd: '100.00', bb: '100.00', oi: '100.00', total: '100.00' },
  { key: '8', dim: 'Total', aaci: '100.00', iess: '100.00', cbd: '100.00', bb: '100.00', oi: '100.00', total: '100.00', className: 'grey-background' },
];

const table4Data = [
  { key: '0', dim: '% column total', aaci: '%', iess: '%', cbd: '%', bb: '%', oi: '%', total: '%' },
  { key: '1', dim: 'Cash equivalents', aaci: '100.00', iess: '100.00', cbd: '100.00', bb: '100.00', oi: '100.00', total: '100.00' },
  { key: '2', dim: 'Under 3 mths', aaci: '100.00', iess: '100.00', cbd: '100.00', bb: '100.00', oi: '100.00', total: '100.00' },
  { key: '3', dim: '3 to 12 mths', aaci: '100.00', iess: '100.00', cbd: '100.00', bb: '100.00', oi: '100.00', total: '100.00' },
  { key: '4', dim: '1 to 5 yrs', aaci: '100.00', iess: '100.00', cbd: '100.00', bb: '100.00', oi: '100.00', total: '100.00' },
  { key: '5', dim: '5 to 7 yrs', aaci: '100.00', iess: '100.00', cbd: '100.00', bb: '100.00', oi: '100.00', total: '100.00' },
  { key: '6', dim: '7 to 10 yrs', aaci: '100.00', iess: '100.00', cbd: '100.00', bb: '100.00', oi: '100.00', total: '100.00' },
  { key: '7', dim: 'Over 10 yrs', aaci: '100.00', iess: '100.00', cbd: '100.00', bb: '100.00', oi: '100.00', total: '100.00' },
  { key: '8', dim: 'Total', aaci: '100.00', iess: '100.00', cbd: '100.00', bb: '100.00', oi: '100.00', total: '100.00', className: 'grey-background' },
];

const InvestmentTable = ({ data }) => {
  return (
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
        {data.map((item) => (
          <tr key={item.key} className={item.className || ''}>
            <td>{item.dim}</td>
            <td>{item.aaci}</td>
            <td>{item.iess}</td>
            <td>{item.cbd}</td>
            <td>{item.bb}</td>
            <td>{item.oi}</td>
            <td className={item.key !== '0' ? 'grey-background' : ''}>{item.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const InvestmentsDepositsGrid = () => {
  const { themeClass } = useTheme();

  return (
    <div className={`${themeClass} grid-container`} style={{ width: '900px', margin: '0 auto' }}>
      <InvestmentTable data={table1Data} />
      <InvestmentTable data={table2Data} />
      <InvestmentTable data={table3Data} />
      <InvestmentTable data={table4Data} />
    </div>
  );
};

export default InvestmentsDepositsGrid;