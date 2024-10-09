import React from 'react';
import CapitalKeyMeasuresGrid from '../grids/CapitalKeyMeasuresGrid';
import LiquidityKeyMeasuresGrid from '../grids/LiquidityKeyMeasuresGrid';
import InvestmentsKeyMeasuresGrid from '../grids/InvestmentsKeyMeasuresGrid';
import CreditKeyMeasuresGrid from '../grids/CreditKeyMeasuresGrid';

const PrReviewsDetailsPage = () => {
  return (
    <div className="grid-page">

      <div className="grid-container">

        <h6>Capital Key Measures</h6>
        <div className="grid-item"> <CapitalKeyMeasuresGrid /> </div>

        <h6>Liquidity Key Measures</h6>
        <div className="grid-item"> <LiquidityKeyMeasuresGrid /> </div>

        <h6>Investments Key Measures</h6>
        <div className="grid-item"> <InvestmentsKeyMeasuresGrid /> </div>

        <h6>Credit Key Measures</h6>
        <div className="grid-item"> <CreditKeyMeasuresGrid /> </div>


      </div>

    </div>
  );
};

export default PrReviewsDetailsPage;