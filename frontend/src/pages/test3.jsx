
import React, { useState, useRef } from 'react';
import { useTheme } from './ThemeContext';

import IncomeExpenditureGrid from '../grids/IncomeExpenditureGrid';
import BalanceSheetGrid from '../grids/BalanceSheetGrid';
import InvestmentsDepositsGrid from '../grids/InvestmentsDepositsGrid';
import CreditRiskGrid from '../grids/CreditRiskGrid';
import LoansAnalysisGrid from '../grids/LoansAnalysisGrid';

const TabStructure = ({ incomeTableRef, balanceSheetTableRef, investmentsTableRef, creditRiskTableRef, loansAnalysisTableRef }) => {
  const { themeClass } = useTheme();
  const [activeTab, setActiveTab] = useState('IncomeExpenditure');

  // Function to handle tab switching
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className={`${themeClass} tab-container`}>
      
      {/* Tabs Navigation */}
      <div className="tab-buttons">
        <button className={activeTab === 'IncomeExpenditure' ? 'active-tab' : ''} onClick={() => handleTabClick('IncomeExpenditure')}>Income & Expenditure</button>
        <button className={activeTab === 'BalanceSheet' ? 'active-tab' : ''} onClick={() => handleTabClick('BalanceSheet')}>Balance Sheet</button>
        <button className={activeTab === 'InvestmentsDeposits' ? 'active-tab' : ''} onClick={() => handleTabClick('InvestmentsDeposits')}>Deposits & Investments</button>
        <button className={activeTab === 'CreditRisk' ? 'active-tab' : ''} onClick={() => handleTabClick('CreditRisk')}>Credit Risk Disclosures</button>
        <button className={activeTab === 'LoansAnalysis' ? 'active-tab' : ''} onClick={() => handleTabClick('LoansAnalysis')}>Loans Analysis</button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'IncomeExpenditure' && <IncomeExpenditureGrid ref={incomeTableRef} />}
        {activeTab === 'BalanceSheet' && <BalanceSheetGrid ref={balanceSheetTableRef} />}
        {activeTab === 'InvestmentsDeposits' && <InvestmentsDepositsGrid ref={investmentsTableRef} />}
        {activeTab === 'CreditRisk' && <CreditRiskGrid ref={creditRiskTableRef} />}
        {activeTab === 'LoansAnalysis' && <LoansAnalysisGrid ref={loansAnalysisTableRef} />}
      </div>

    </div>
  );
};

export default TabStructure;