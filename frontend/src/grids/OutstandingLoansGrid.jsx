import React from 'react';
import { useTheme } from '../components/ThemeContext';

const dataSourceMaturity = [
  { key: '1', dim: 'Under 1 yr', na: '90,000', np: '100.00', aa: '9,000,000,000', ap: '100.00' },
  { key: '2', dim: '1 to 3 yrs', na: '90,000', np: '100.00', aa: '9,000,000,000', ap: '100.00' },
  { key: '3', dim: '3 to 5 yrs', na: '90,000', np: '100.00', aa: '9,000,000,000', ap: '100.00' },
  { key: '4', dim: '5 to 10 yrs', na: '90,000', np: '100.00', aa: '9,000,000,000', ap: '100.00' },
  { key: '5', dim: '10 to 25 yrs', na: '90,000', np: '100.00', aa: '9,000,000,000', ap: '100.00' },
  { key: '6', dim: 'Over 25 yrs', na: '90,000', np: '100.00', aa: '9,000,000,000', ap: '100.00' },
  { key: '7', dim: 'Total', na: '90,000', np: '100.00', aa: '9,000,000,000', ap: '100.00', className: 'grey-background' },
];

const dataSourceCategory = [
  { key: '1', dim: 'Personal', na: '90,000', np: '100.00', aa: '9,000,000,000', ap: '100.00' },
  { key: '2', dim: 'House', na: '90,000', np: '100.00', aa: '9,000,000,000', ap: '100.00' },
  { key: '3', dim: 'Commercial', na: '90,000', np: '100.00', aa: '9,000,000,000', ap: '100.00' },
  { key: '4', dim: 'Community', na: '90,000', np: '100.00', aa: '9,000,000,000', ap: '100.00' },
  { key: '5', dim: 'Other', na: '90,000', np: '100.00', aa: '9,000,000,000', ap: '100.00' },
  { key: '6', dim: 'Total', na: '90,000', np: '100.00', aa: '9,000,000,000', ap: '100.00', className: 'grey-background' },
];

const OutstandingLoansMaturityTable = ({ data }) => {
  return (
    <table className="custom-table" style={{ marginBottom: '20px', width: '100%', tableLayout: 'fixed' }}>
      <thead>
        {/* First header row */}
        <tr>
          <th rowSpan="2" style={{ fontWeight: 'bold', width: '18%', textAlign: 'left' }}>OUTSTANDING LOANS BY MATURITY</th>
          <th colSpan="2" style={{ fontWeight: 'bold', width: '25%', textAlign: 'center' }}>Number of loans</th>
          <th colSpan="2" style={{ fontWeight: 'bold', width: '30%', textAlign: 'center' }}>Amount of loans</th>
        </tr>
        {/* Second header row */}
        <tr>
          <th style={{ fontWeight: 'normal', whiteSpace: 'nowrap', textAlign: 'center' }}>euro</th>
          <th style={{ fontWeight: 'normal', whiteSpace: 'nowrap', textAlign: 'center' }}>%</th>
          <th style={{ fontWeight: 'normal', whiteSpace: 'nowrap', textAlign: 'center' }}>euro</th>
          <th style={{ fontWeight: 'normal', whiteSpace: 'nowrap', textAlign: 'center' }}>%</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.key} className={item.className || ''}>
            <td>{item.dim}</td>
            <td style={{ whiteSpace: 'nowrap', textAlign: 'center' }}>{item.na}</td>
            <td style={{ whiteSpace: 'nowrap', textAlign: 'center' }}>{item.np}</td>
            <td style={{ whiteSpace: 'nowrap', textAlign: 'center' }}>{item.aa}</td>
            <td style={{ whiteSpace: 'nowrap', textAlign: 'center' }}>{item.ap}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const OutstandingLoansCategoryTable = ({ data }) => {
  return (
    <table className="custom-table" style={{ marginBottom: '20px', width: '100%', tableLayout: 'fixed' }}>
      <thead>
        {/* First header row */}
        <tr>
          <th rowSpan="2" style={{ fontWeight: 'bold', width: '18%', textAlign: 'left' }}>OUTSTANDING LOANS BY CATEGORY</th>
          <th colSpan="2" style={{ fontWeight: 'bold', width: '25%', textAlign: 'center' }}>Number of loans</th>
          <th colSpan="2" style={{ fontWeight: 'bold', width: '30%', textAlign: 'center' }}>Amount of loans</th>
        </tr>
        {/* Second header row */}
        <tr>
          <th style={{ fontWeight: 'normal', whiteSpace: 'nowrap', textAlign: 'center' }}>euro</th>
          <th style={{ fontWeight: 'normal', whiteSpace: 'nowrap', textAlign: 'center' }}>%</th>
          <th style={{ fontWeight: 'normal', whiteSpace: 'nowrap', textAlign: 'center' }}>euro</th>
          <th style={{ fontWeight: 'normal', whiteSpace: 'nowrap', textAlign: 'center' }}>%</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.key} className={item.className || ''}>
            <td>{item.dim}</td>
            <td style={{ whiteSpace: 'nowrap', textAlign: 'center' }}>{item.na}</td>
            <td style={{ whiteSpace: 'nowrap', textAlign: 'center' }}>{item.np}</td>
            <td style={{ whiteSpace: 'nowrap', textAlign: 'center' }}>{item.aa}</td>
            <td style={{ whiteSpace: 'nowrap', textAlign: 'center' }}>{item.ap}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const OutstandingLoansGrid = () => {
  const { themeClass } = useTheme();

  return (
    <div className={`${themeClass} grid-container`} style={{ width: '700px', margin: '0 auto' }}>
      <OutstandingLoansMaturityTable data={dataSourceMaturity} />
      <OutstandingLoansCategoryTable data={dataSourceCategory} />
    </div>
  );
};

export default OutstandingLoansGrid;