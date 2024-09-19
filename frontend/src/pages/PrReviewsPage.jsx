import React, { useState } from 'react';
import { useTheme } from '../components/ThemeContext';

// Assuming these are your existing table components
import IncomeExpenditure from '../grids/IncomeExpenditureGrid';
import BalanceSheet from '../grids/BalanceSheetGrid';
import InvestmentsDepositsGrid from '../grids/InvestmentsDepositsGrid';

const PrReviewsPage = () => {
  const { themeClass } = useTheme();
  const [activeTab, setActiveTab] = useState('IncomeExpenditure');

  // Function to handle tab switching
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className={`${themeClass} tab-container`} style={{ width: '100%', margin: '0 auto' }}>
      {/* Tabs Navigation */}
      <div className="tab-buttons" style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <button
          className={activeTab === 'IncomeExpenditure' ? 'active-tab' : ''}
          onClick={() => handleTabClick('IncomeExpenditure')}
          style={{ padding: '10px 20px', margin: '0 10px' }}
        >
          Income & Expenditure
        </button>
        <button
          className={activeTab === 'BalanceSheet' ? 'active-tab' : ''}
          onClick={() => handleTabClick('BalanceSheet')}
          style={{ padding: '10px 20px', margin: '0 10px' }}
        >
          Balance Sheet
        </button>
        <button
          className={activeTab === 'InvestmentsDeposits' ? 'active-tab' : ''}
          onClick={() => handleTabClick('InvestmentsDeposits')}
          style={{ padding: '10px 20px', margin: '0 10px' }}
        >
          Deposits & Investments
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">

      </div>
    </div>
  );
};

export default PrReviewsPage;

