import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../components/FetchData';

const PrReviewsDetailPage = () => {
  const { reviewId } = useParams(); // Extract the reviewId from the URL
  const [reviewDetails, setReviewDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviewDetails = async () => {
      try {
        const data = await fetchData(`pr-reviews/pr-review-detail/${reviewId}/`);
        setReviewDetails(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchReviewDetails();
  }, [reviewId]);

  if (error) return <div>Error: {error}</div>;
  if (!reviewDetails) return <div>Loading...</div>;

  return (
    <div className="outer-placeholder">
      <div className="temp-inner-placeholder">
        <h1>PR Review Details for Review ID: {reviewId}</h1>
        <p>Firm: {reviewDetails.firm}</p>
        <p>Return ID: {reviewDetails.returnId}</p>
        <p>State: {reviewDetails.returnState}</p>
        {/* Add more fields as needed */}
      </div>
    </div>
  );
};

export default PrReviewsDetailPage;
