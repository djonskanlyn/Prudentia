import React from 'react';
import { useTheme } from '../components/ThemeContext';

const dataSource = [
  {
    key: '1', 
    dim: 'Not impaired', 
    na: '90,000', 
    aa: '9,000,000,000',
    pa: '9,000,000,000',
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
    key: '1.9', // Unique identifier for another main row
    dim: 'Impaired', // Descriptive label for impaired loans
    na: '', // Empty field for number of loans
    aa: '', // Empty field for amount of loans
    pa: '', // Empty field for amount of provisions
    className: 'grey-background' // Apply background styling for this row
  },
  {
    key: '2', 
    dim: 'Not past due', 
    na: '90,000', 
    aa: '9,000,000,000', 
    pa: '9,000,000,000', 
  },
  {
    key: '3', 
    dim: 'Under 9 wks', 
    na: '90,000', 
    aa: '9,000,000,000', 
    pa: '9,000,000,000', 
  },
  {
    key: '4', 
    dim: '10 to 18 wks', 
    na: '90,000', 
    aa: '9,000,000,000', 
    pa: '9,000,000,000', 
  },
  {
    key: '5', 
    dim: '19 to 26 wks', 
    na: '90,000', 
    aa: '9,000,000,000', 
    pa: '9,000,000,000', 
  },
  {
    key: '6', 
    dim: '27 to 39 wks', 
    na: '90,000', 
    aa: '9,000,000,000', 
    pa: '9,000,000,000', 
  },
  {
    key: '7', 
    dim: '40 to 52 wks', 
    na: '90,000', 
    aa: '9,000,000,000', 
    pa: '9,000,000,000', 
  },
  {
    key: '8', 
    dim: 'Over 53 wks', 
    na: '90,000', 
    aa: '9,000,000,000', 
    pa: '9,000,000,000', 
  },
  {
    key: '9', 
    dim: 'Total impaired', 
    na: '90,000', 
    aa: '9,000,000,000', 
    pa: '9,000,000,000', 
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
    na: '90,000', 
    aa: '9,000,000,000', 
    pa: '9,000,000,000', 
    className: 'grey-background'
  }
];


const CreditRiskTable = ({ data }) => {
  return (
    <table className="custom-table" style={{ marginBottom: '20px', width: '100%', tableLayout: 'fixed' }}>
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
        {data.map((item) => (
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
};

const CreditRiskGrid = () => {
  const { themeClass } = useTheme();

  return (
    <div className={`${themeClass} grid-container`} style={{ width: '600px', margin: '0 auto' }}>
      <CreditRiskTable data={dataSource} />
    </div>
  );
};

export default CreditRiskGrid;
