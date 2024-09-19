import React from 'react';
import { useTheme } from '../components/ThemeContext';

const dataSource = [
  { key: '1', dim: 'Not impaired', na: '90,000', np: '100.00', aa: '9,000,000,000', ap: '100.00', pa: '9,000,000,000', pp: '100.00', className: 'grey-background' },
  { key: '1.1', dim: '', na: '', np: '', aa: '', ap: '', pa: '', pp: '' },
  { key: '1.9', dim: 'Impaired', na: '', np: '', aa: '', ap: '', pa: '', pp: '', className: 'grey-background' },
  { key: '2', dim: 'Not past due', na: '90,000', np: '100.00', aa: '9,000,000,000', ap: '100.00', pa: '9,000,000,000', pp: '100.00' },
  { key: '3', dim: 'Under 9 wks', na: '90,000', np: '100.00', aa: '9,000,000,000', ap: '100.00', pa: '9,000,000,000', pp: '100.00' },
  { key: '4', dim: '10 to 18 wks', na: '90,000', np: '100.00', aa: '9,000,000,000', ap: '100.00', pa: '9,000,000,000', pp: '100.00' },
  { key: '5', dim: '19 to 26 wks', na: '90,000', np: '100.00', aa: '9,000,000,000', ap: '100.00', pa: '9,000,000,000', pp: '100.00' },
  { key: '6', dim: '27 to 39 wks', na: '90,000', np: '100.00', aa: '9,000,000,000', ap: '100.00', pa: '9,000,000,000', pp: '100.00' },
  { key: '7', dim: '40 to 52 wks', na: '90,000', np: '100.00', aa: '9,000,000,000', ap: '100.00', pa: '9,000,000,000', pp: '100.00' },
  { key: '8', dim: 'Over 53 wks', na: '90,000', np: '100.00', aa: '9,000,000,000', ap: '100.00', pa: '9,000,000,000', pp: '100.00' },
  { key: '9', dim: 'Total impaired', na: '90,000', np: '100.00', aa: '9,000,000,000', ap: '100.00', pa: '9,000,000,000', pp: '100.00', className: 'grey-background' },
  { key: '9.1', dim: '', na: '', np: '', aa: '', ap: '', pa: '', pp: '' },
  { key: '10', dim: 'Total loans', na: '90,000', np: '100.00', aa: '9,000,000,000', ap: '100.00', pa: '9,000,000,000', pp: '100.00', className: 'grey-background' },
];

const CreditRiskTable = ({ data }) => {
  return (
    <table className="custom-table" style={{ marginBottom: '20px', width: '100%', tableLayout: 'fixed' }}>
      <thead>
        {/* First header row */}
        <tr>
          <th rowSpan="2" style={{ fontWeight: 'bold', width: '18%', textAlign: 'left' }}>CREDIT RISK DISCLOSURES</th>
          <th colSpan="2" style={{ fontWeight: 'bold', width: '25%', textAlign: 'center' }}>Number of loans</th>
          <th colSpan="2" style={{ fontWeight: 'bold', width: '30%', textAlign: 'center' }}>Amount of loans</th>
          <th rowSpan="1" style={{ fontWeight: 'bold', width: '14%', textAlign: 'center' }}>Amount of provisions</th>
          <th rowSpan="1" style={{ fontWeight: 'bold', width: '13%', textAlign: 'center' }}>Percentage provisions coverage</th>
        </tr>
        {/* Second header row */}
        <tr>
          <th style={{ fontWeight: 'normal', whiteSpace: 'nowrap', textAlign: 'center' }}>euro</th>
          <th style={{ fontWeight: 'normal', whiteSpace: 'nowrap', textAlign: 'center' }}>%</th>
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
            <td style={{ whiteSpace: 'nowrap', textAlign: 'center' }}>{item.pa}</td>
            <td style={{ whiteSpace: 'nowrap', textAlign: 'center' }}>{item.pp}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const CreditRiskGrid = () => {
  const { themeClass } = useTheme();

  return (
    <div className={`${themeClass} grid-container`} style={{ width: '900px', margin: '0 auto' }}>
      <CreditRiskTable data={dataSource} />
    </div>
  );
};

export default CreditRiskGrid;


