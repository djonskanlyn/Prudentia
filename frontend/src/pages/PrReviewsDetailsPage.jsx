import React from 'react';
import CapitalKeyMeasuresGrid from '../grids/CapitalKeyMeasuresGrid';
import LiquidityKeyMeasuresGrid from '../grids/LiquidityKeyMeasuresGrid';
import InvestmentsKeyMeasuresGrid from '../grids/InvestmentsKeyMeasuresGrid';
import CreditKeyMeasuresGrid from '../grids/CreditKeyMeasuresGrid';
import PRCommentsSection from '../components/PRCommentsSection';
import PRReviewHeader from '../components/PRReviewHeader';  

const PrReviewsDetailsPage = () => {
  return (
    <div className="grid-page">

    <PRReviewHeader />

      <div className="grid-container">

        <h6>Capital Key Measures</h6>
        <div className="grid-item"> <CapitalKeyMeasuresGrid /> </div>
        <h5>Capital Summary Comment:</h5>
        <div className="grid-item"> <PRCommentsSection commentType="capital_comment" label="Capital Comment" /> </div>

        <h6>Liquidity Key Measures</h6>
        <div className="grid-item"> <LiquidityKeyMeasuresGrid /> </div>
        <h5>Liquidity Summary Comment:</h5>
        <div className="grid-item"> <PRCommentsSection commentType="liquidity_comment" label="Liquidity Comment" /> </div>

        <h6>Investments Key Measures</h6>
        <div className="grid-item"> <InvestmentsKeyMeasuresGrid /> </div>
        <h5>Investments Summary Comment:</h5>
        <div className="grid-item"> <PRCommentsSection commentType="investments_comment" label="Investments Comment" /> </div>

        <h6>Credit Key Measures</h6>
        <div className="grid-item"> <CreditKeyMeasuresGrid /> </div>
        <h5>Credit Summary Comment:</h5>
        <div className="grid-item"> <PRCommentsSection commentType="credit_comment" label="Credit Comment" /> </div>

        <h6>Final Summary Comment:</h6>
        <div className="grid-item"> <PRCommentsSection commentType="final_comment" label="Final Comment" /> </div>

      </div>

    </div>
  );
};

export default PrReviewsDetailsPage;