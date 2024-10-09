import React, { useState, useEffect } from 'react';
import { fetchData, updateData } from '../components/FetchData'; // Import the functions from FetchData.jsx
import { useParams } from 'react-router-dom';
import { useTheme } from '../components/ThemeContext';

const PRCommentsSection = ({ commentType, label }) => {
  const { reviewId } = useParams(); // Get the reviewId from the URL
  const { themeClass } = useTheme();
  const [comment, setComment] = useState(''); // State to store the specific comment
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the specific comment data based on the type
  useEffect(() => {
    const fetchComment = async () => {
      try {
        const data = await fetchData(`pr-reviews/pr-reviews-with-comments/${reviewId}/`);
        setComment(data[commentType] || ''); // Set the appropriate comment or an empty string
        setLoading(false);
      } catch (err) {
        setError('Failed to load comment: ' + err.message);
        setLoading(false);
      }
    };

    if (reviewId) {
      fetchComment();
    }
  }, [reviewId, commentType]);

  // Handle comment change
  const handleCommentChange = async (e) => {
    const newComment = e.target.value;
    setComment(newComment);
  
    const payload = { [commentType]: newComment };  // Construct the payload with the specific comment
    console.log('Payload:', payload);  // Log payload to confirm
  
    try {
      const response = await updateData(`pr-reviews/pr-reviews-with-comments/${reviewId}/`, payload);
      console.log(`${label} updated successfully`, response);
    } catch (err) {
      setError('Failed to update comment: ' + err.message);
      console.error('Error details:', err.response ? err.response.data : err.message);
    }
  };

  if (loading) return <p>Loading {label}...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={themeClass}>
      <textarea
        name={commentType}
        value={comment || ''}  // Ensure value is never null
        onChange={handleCommentChange}  // Automatically update when data changes
        rows="4"
        style={{
          width: '100%',  // Full width of the container
          padding: '10px',
          height: '150px',
          borderRadius: '10px',
          resize: 'vertical',
          borderColor: '#6E6E6E',
          boxSizing: 'border-box',  // Include padding in the element's total width
        }}
      />
      </div>
  );
};

export default PRCommentsSection;


