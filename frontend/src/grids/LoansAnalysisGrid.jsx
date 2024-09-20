import React from 'react';
import { useTheme } from '../components/ThemeContext';

const dataSourceMaturity = [
  { key: '1', dim: 'Under 1 yr', no: '90,000', ao: '9,000,000,000', na: '90,000', aa: '9,000,000,000' },
  { key: '2', dim: '1 to 3 yrs', no: '90,000', ao: '9,000,000,000', na: '90,000', aa: '9,000,000,000' },
  { key: '3', dim: '3 to 5 yrs', no: '90,000', ao: '9,000,000,000', na: '90,000', aa: '9,000,000,000'},
  { key: '4', dim: '5 to 10 yrs', no: '90,000', ao: '9,000,000,000', na: '90,000', aa: '9,000,000,000' },
  { key: '5', dim: '10 to 25 yrs', no: '90,000', ao: '9,000,000,000', na: '90,000', aa: '9,000,000,000' },
  { key: '6', dim: 'Over 25 yrs', no: '90,000', ao: '9,000,000,000', na: '90,000', aa: '9,000,000,000' },
  { key: '7', dim: 'Total', no: '90,000', ao: '9,000,000,000', na: '90,000', aa: '9,000,000,000', className: 'grey-background' },
];

const dataSourceCategory = [
  { key: '1', dim: 'Personal', no: '90,000', ao: '9,000,000,000', na: '90,000', aa: '9,000,000,000' },
  { key: '2', dim: 'House', no: '90,000', ao: '9,000,000,000', na: '90,000', aa: '9,000,000,000' },
  { key: '3', dim: 'Commercial', no: '90,000', ao: '9,000,000,000', na: '90,000', aa: '9,000,000,000'},
  { key: '4', dim: 'Community', no: '90,000', ao: '9,000,000,000', na: '90,000', aa: '9,000,000,000' },
  { key: '5', dim: 'Other', no: '90,000', ao: '9,000,000,000', na: '90,000', aa: '9,000,000,000' },
  { key: '6', dim: 'Total', no: '90,000', ao: '9,000,000,000', na: '90,000', aa: '9,000,000,000', className: 'grey-background' },
];

const LoansMaturityTable = ({ data }) => {
  return (
    <table className="custom-table" style={{ marginBottom: '20px', width: '100%', tableLayout: 'fixed' }}>
      <thead>
        {/* First header row */}
        <tr>
          <th rowSpan="2" style={{ fontWeight: 'bold', width: '20%', textAlign: 'left' }}>MATURITY</th>
          <th colSpan="1" style={{ fontWeight: 'bold', width: '20%', textAlign: 'center' }}>Number of outstanding loans</th>
          <th colSpan="1" style={{ fontWeight: 'bold', width: '20%', textAlign: 'center' }}>Amount of outstanding loans</th>
          <th colSpan="1" style={{ fontWeight: 'bold', width: '20%', textAlign: 'center' }}>Number of advanced loans</th>
          <th colSpan="1" style={{ fontWeight: 'bold', width: '20%', textAlign: 'center' }}>Amount of advanced loans</th>
        </tr>
        {/* Second header row */}
        <tr>
          <th style={{ fontWeight: 'normal', whiteSpace: 'nowrap', textAlign: 'center' }}>number</th>
          <th style={{ fontWeight: 'normal', whiteSpace: 'nowrap', textAlign: 'center' }}>euro</th>
          <th style={{ fontWeight: 'normal', whiteSpace: 'nowrap', textAlign: 'center' }}>number</th>
          <th style={{ fontWeight: 'normal', whiteSpace: 'nowrap', textAlign: 'center' }}>euro</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.key} className={item.className || ''}>
            <td>{item.dim}</td>
            <td style={{ whiteSpace: 'nowrap', textAlign: 'right' }}>{item.no}</td>
            <td style={{ whiteSpace: 'nowrap', textAlign: 'right' }}>{item.ao}</td>
            <td style={{ whiteSpace: 'nowrap', textAlign: 'right' }}>{item.na}</td>
            <td style={{ whiteSpace: 'nowrap', textAlign: 'right' }}>{item.aa}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const LoansCategoryTable = ({ data }) => {
  return (
    <table className="custom-table" style={{ marginBottom: '20px', width: '100%', tableLayout: 'fixed' }}>
      <thead>
        {/* First header row */}
        <tr>
          <th rowSpan="2" style={{ fontWeight: 'bold', width: '20%', textAlign: 'left' }}>CATEGORY</th>
          <th colSpan="1" style={{ fontWeight: 'bold', width: '20%', textAlign: 'center' }}>Number of outstanding loans</th>
          <th colSpan="1" style={{ fontWeight: 'bold', width: '20%', textAlign: 'center' }}>Amount of outstanding loans</th>
          <th colSpan="1" style={{ fontWeight: 'bold', width: '20%', textAlign: 'center' }}>Number of advanced loans</th>
          <th colSpan="1" style={{ fontWeight: 'bold', width: '20%', textAlign: 'center' }}>Amount of advanced loans</th>
        </tr>
        {/* Second header row */}
        <tr>
          <th style={{ fontWeight: 'normal', whiteSpace: 'nowrap', textAlign: 'center' }}>number</th>
          <th style={{ fontWeight: 'normal', whiteSpace: 'nowrap', textAlign: 'center' }}>euro</th>
          <th style={{ fontWeight: 'normal', whiteSpace: 'nowrap', textAlign: 'center' }}>number</th>
          <th style={{ fontWeight: 'normal', whiteSpace: 'nowrap', textAlign: 'center' }}>euro</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.key} className={item.className || ''}>
            <td>{item.dim}</td>
            <td style={{ whiteSpace: 'nowrap', textAlign: 'right' }}>{item.no}</td>
            <td style={{ whiteSpace: 'nowrap', textAlign: 'right' }}>{item.ao}</td>
            <td style={{ whiteSpace: 'nowrap', textAlign: 'right' }}>{item.na}</td>
            <td style={{ whiteSpace: 'nowrap', textAlign: 'right' }}>{item.aa}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const OutstandingLoansGrid = () => {
  const { themeClass } = useTheme();

  return (
    <div className={`${themeClass} grid-container`} style={{ width: '800px', margin: '0 auto' }}>
      <LoansMaturityTable data={dataSourceMaturity} />
      <LoansCategoryTable data={dataSourceCategory} />
    </div>
  );
};

export default OutstandingLoansGrid;