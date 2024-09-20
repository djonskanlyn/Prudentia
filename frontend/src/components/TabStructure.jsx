
import React, { useState } from 'react';
import { useTheme } from './ThemeContext';

import IncomeExpenditureGrid from '../grids/IncomeExpenditureGrid';
import BalanceSheetGrid from '../grids/BalanceSheetGrid';
import InvestmentsDepositsGrid from '../grids/InvestmentsDepositsGrid';
import CreditRiskGrid from '../grids/CreditRiskGrid';
import LoansAnalysisGrid from '../grids/LoansAnalysisGrid';

const TabStructure = () => {
  const { themeClass } = useTheme();
  const [activeTab, setActiveTab] = useState('IncomeExpenditure');

  // Function to handle tab switching
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className={`${themeClass} tab-container`} style={{ width: '100%', margin: '0 auto', padding: '20px' }}>
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
        <button
          className={activeTab === 'CreditRisk' ? 'active-tab' : ''}
          onClick={() => handleTabClick('CreditRisk')}
          style={{ padding: '10px 20px', margin: '0 10px' }}
        >
          Credit Risk Disclosures
        </button>
        <button
          className={activeTab === 'LoansAnalysis' ? 'active-tab' : ''}
          onClick={() => handleTabClick('LoansAnalysis')}
          style={{ padding: '10px 20px', margin: '0 10px' }}
        >
          Loans Analysis
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'IncomeExpenditure' && <IncomeExpenditureGrid />}
        {activeTab === 'BalanceSheet' && <BalanceSheetGrid />}
        {activeTab === 'InvestmentsDeposits' && <InvestmentsDepositsGrid />}
        {activeTab === 'CreditRisk' && <CreditRiskGrid />}
        {activeTab === 'LoansAnalysis' && <LoansAnalysisGrid />}
      </div>
    </div>
  );
};

export default TabStructure;
