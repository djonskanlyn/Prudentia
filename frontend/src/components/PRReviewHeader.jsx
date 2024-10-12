import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../components/FetchData';

const PRReviewHeader = () => {
  const { reviewId } = useParams();  // Get the reviewId from the URL
  const [firmName, setFirmName] = useState('');  // State to store firm name
  const [reportingPeriod, setReportingPeriod] = useState('');  // State to store reporting period
  const [error, setError] = useState(null);  // Handle potential errors

  useEffect(() => {
    // Fetch all review details and filter them by reviewId in the frontend
    const fetchReviewDetails = async () => {
      try {
        // Fetch all review data from the endpoint
        const data = await fetchData('pr-reviews/pr-reviews-with-details/');

        // Find the specific review by reviewId
        const reviewDetails = data.find((item) => item.id === parseInt(reviewId));

        // If the review exists, set the firm name and reporting period
        if (reviewDetails) {
          setFirmName(reviewDetails.firm || 'Unknown Firm');
          setReportingPeriod(reviewDetails.reportingDate || 'Unknown Period');
        } else {
          setError('Review not found');
        }
      } catch (err) {
        setError('Failed to load review details: ' + err.message);
      }
    };

    if (reviewId) {
      fetchReviewDetails();
    }
  }, [reviewId]);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="pr-review-header">
      <h1>{firmName}</h1>
      <h2>{reportingPeriod}</h2>
    </div>
  );
};

export default PRReviewHeader;

