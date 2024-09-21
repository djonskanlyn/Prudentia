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

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className={`${themeClass} tab-container`}>
      <div className="tab-buttons">
        <button
          className={activeTab === 'IncomeExpenditure' ? 'active-tab' : ''}
          onClick={() => handleTabClick('IncomeExpenditure')}
        >
          Income & Expenditure
        </button>
        <button
          className={activeTab === 'BalanceSheet' ? 'active-tab' : ''}
          onClick={() => handleTabClick('BalanceSheet')}
        >
          Balance Sheet
        </button>
        <button
          className={activeTab === 'InvestmentsDeposits' ? 'active-tab' : ''}
          onClick={() => handleTabClick('InvestmentsDeposits')}
        >
          Deposits & Investments
        </button>
        <button
          className={activeTab === 'CreditRisk' ? 'active-tab' : ''}
          onClick={() => handleTabClick('CreditRisk')}
        >
          Credit Risk Disclosures
        </button>
        <button
          className={activeTab === 'LoansAnalysis' ? 'active-tab' : ''}
          onClick={() => handleTabClick('LoansAnalysis')}
        >
          Loans Analysis
        </button>
      </div>

      <div className="tab-content">
        <div id="income-expenditure-table" className={activeTab === 'IncomeExpenditure' ? '' : 'hidden'}>
          <IncomeExpenditureGrid />
        </div>
        <div id="balance-sheet-table" className={activeTab === 'BalanceSheet' ? '' : 'hidden'}>
          <BalanceSheetGrid />
        </div>
        <div id="investments-deposits-table" className={activeTab === 'InvestmentsDeposits' ? '' : 'hidden'}>
          <InvestmentsDepositsGrid />
        </div>
        <div id="credit-risk-table" className={activeTab === 'CreditRisk' ? '' : 'hidden'}>
          <CreditRiskGrid />
        </div>
        <div id="loans-analysis-table" className={activeTab === 'LoansAnalysis' ? '' : 'hidden'}>
          <LoansAnalysisGrid />
        </div>
      </div>
    </div>
  );
};

export default TabStructure;


