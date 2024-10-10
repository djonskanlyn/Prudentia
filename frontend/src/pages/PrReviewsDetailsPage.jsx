import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../components/FetchData';  
import CapitalKeyMeasuresGrid from '../grids/CapitalKeyMeasuresGrid';
import LiquidityKeyMeasuresGrid from '../grids/LiquidityKeyMeasuresGrid';
import InvestmentsKeyMeasuresGrid from '../grids/InvestmentsKeyMeasuresGrid';
import CreditKeyMeasuresGrid from '../grids/CreditKeyMeasuresGrid';
import PRCommentsSection from '../components/PRCommentsSection';
import PRReviewHeader from '../components/PRReviewHeader';
import PRReviewSignOffButtons from '../components/PRReviewSignOffButtons';  

const PrReviewsDetailsPage = () => {
  const { reviewId } = useParams();  // Get the reviewId from the URL params
  const [supervisorSignOff, setSupervisorSignOff] = useState(false);
  const [seniorSupervisorSignOff, setSeniorSupervisorSignOff] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSignOffStatus = async () => {
      try {
        // Fetch all PR reviews (assuming the API returns a list of reviews)
        const allData = await fetchData('/pr-reviews/pr-reviews-with-details/');

        // Filter the review based on the reviewId from the URL params
        const review = allData.find((item) => item.id === parseInt(reviewId));

        if (review) {
          setSupervisorSignOff(!!review.supervisor_so_by);  // Check if supervisor has signed off
          setSeniorSupervisorSignOff(!!review.senior_supervisor_so_by);  // Check if senior supervisor has signed off
        } else {
          setError('Review not found');
        }
      } catch (err) {
        setError('Failed to load review details: ' + err.message);
      }
    };

    fetchSignOffStatus();
  }, [reviewId]);  // Re-run this effect when reviewId changes

  if (error) return <div>Error: {error}</div>;



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

        <div className="grid-item">
          <PRReviewSignOffButtons supervisorSignOff={supervisorSignOff} seniorSupervisorSignOff={seniorSupervisorSignOff} />
        </div>

      </div>

    </div>
  );
};

export default PrReviewsDetailsPage;