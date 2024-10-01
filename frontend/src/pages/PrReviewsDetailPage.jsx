import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom'; // Import useLocation
import { fetchData } from '../components/FetchData'; // Import the fetchData utility

const PrReviewsDetailPage = () => {
  const { reviewId } = useParams(); // Extract the reviewId from the URL
  const { state } = useLocation(); // Get the passed data from the navigate function
  const [reviewMeasures, setReviewMeasures] = useState([]); // State to store PR Review Measures
  const [error, setError] = useState(null); // State to store any errors

  // Fetch review measures
  useEffect(() => {
    const fetchReviewMeasures = async () => {
      try {
        // Fetch PR Review Measures for the given reviewId
        const data = await fetchData(`pr-reviews/pr-reviews-details/${reviewId}/`);
        setReviewMeasures(data); // Store the measures in the state
      } catch (err) {
        setError(err.message); // Capture and display any errors
      }
    };

    fetchReviewMeasures(); // Trigger the fetch operation on component mount
  }, [reviewId]);

  if (error) return <div>Error: {error}</div>; // Display an error if one occurs
  if (!reviewMeasures.length) return <div>Loading...</div>; // Show a loading message until data is available

  return (
    <div className="outer-placeholder">
      <div className="temp-inner-placeholder">
        <h1>PR Review Details for Review ID: {reviewId}</h1>

        {/* Display Review Details from the passed state */}
        <div>
          <p><strong>Firm Name:</strong> {state?.firm}</p>
          <p><strong>Return ID:</strong> {state?.returnId}</p>
          <p><strong>Reporting Date:</strong> {new Date(state?.reportingDate).toLocaleDateString()}</p>
          <p><strong>State:</strong> {state?.returnState}</p>
        </div>

        <h2>PR Review Measures:</h2>
        <table>
          <thead>
            <tr>
              <th>Measure</th>
              <th>Source</th>
              <th>Current Q0</th>
              <th>Prior Q1</th>
              <th>Prior Q2</th>
              <th>Prior Q3</th>
              <th>Prior Q4</th>
              <th>Percentage Diff PQ</th>
              <th>Percentage Diff PY</th>
              <th>Average</th>
            </tr>
          </thead>
          <tbody>
            {reviewMeasures.map((measure) => (
              <tr key={measure.id}>
                <td>{measure.measure}</td>
                <td>{measure.source}</td>
                <td>{measure.current_Q0}</td>
                <td>{measure.prior_Q1}</td>
                <td>{measure.prior_Q2}</td>
                <td>{measure.prior_Q3}</td>
                <td>{measure.prior_Q4}</td>
                <td>{measure.perc_diff_pq}</td>
                <td>{measure.perc_diff_py}</td>
                <td>{measure.average}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrReviewsDetailPage;




