import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BreweryDetails.css'; // Import the CSS file for styling

const BreweryDetails = () => {
  const { id } = useParams();
  const [brewery, setBrewery] = useState(null);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [existingReviews, setExistingReviews] = useState([]);

  // Parse the userId from localStorage
  const storedUserId = JSON.parse(localStorage.getItem('userId'));
  const userId = storedUserId ? storedUserId.value : null;

  const username = localStorage.getItem('username');
  const breweryId = id; // Use the id from the URL as the breweryId

  useEffect(() => {
    // Fetch brewery details
    axios.get(`https://api.openbrewerydb.org/v1/breweries/${id}`)
      .then(response => {
        setBrewery(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the brewery details!", error);
      });

    // Fetch existing reviews
    axios.get(`https://brewery-api-qjzd.onrender.com/api/reviews/${breweryId}`)
      .then(response => {
        const reviewsData = response.data;
        if (Array.isArray(reviewsData)) {
          setExistingReviews(reviewsData);
        } else if (reviewsData) {
          setExistingReviews([reviewsData]);
        } else {
          setExistingReviews([]);
        }
        const userReview = reviewsData.find(review => review.userId === userId);
        if (userReview) {
          setReview(userReview.review);
          setRating(userReview.rating);
        }
      })
      .catch(error => {
        console.error("There was an error fetching the reviews!", error);
      });
  }, [id, userId, breweryId]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const reviewData = { userId, breweryId, review, rating, username };
    axios.post(`https://brewery-api-qjzd.onrender.com/api/reviews/${userId}/${breweryId}`, reviewData)
      .then(response => {
        setExistingReviews(prevReviews => [...prevReviews, response.data]);
        setReview('');
        setRating(0);
        alert('Review submitted successfully!');
      })
      .catch(error => {
        console.error("There was an error submitting the review!", error);
        alert('Failed to submit review.');
      });
  };

  return (
    <div className="brewery-details">
      {brewery ? (
        <div className="brewery-card">
          <div className="brewery-card-body">
            <h2 className="brewery-card-title">{brewery.name}</h2>
            <p className="brewery-card-text"><strong>Type:</strong> {brewery.brewery_type}</p>
            <p className="brewery-card-text"><strong>Address:</strong> {brewery.street}, {brewery.city}, {brewery.state} {brewery.postal_code}</p>
            <p className="brewery-card-text"><strong>Phone:</strong> {brewery.phone ? brewery.phone : "N/A"}</p>
            {brewery.website_url && (
              <p className="brewery-card-text">
                <strong>Website:</strong> <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">{brewery.website_url}</a>
              </p>
            )}

            <div className="brewery-review-section">
              <h3>Reviews</h3>
              {existingReviews.length > 0 ? (
                <div className="brewery-existing-reviews">
                  <ul>
                    {existingReviews.map((review, index) => (
                      <li key={index}>
                        <p>{review.review} - Rating: {review.rating} by <strong>{review.username}</strong></p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>No reviews yet. Be the first to review!</p>
              )}
              
              <form onSubmit={handleReviewSubmit} className="brewery-review-form">
              <h3 className='brewery-review-section'>Submit YOUR Rating and Review-</h3>
                <div className="form-group">
                  <label htmlFor="review">Your Review</label>
                  <textarea
                    id="review"
                    className="form-control"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                  />
                </div>
                <div className="form-group">
                 
                  <label htmlFor="rating">Your Rating</label>
                  <input
                    type="number"
                    id="rating"
                    className="form-control"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    min="0"
                    max="5"
                  />
                </div>
                <button type="submit" className="btn btn-primary">Submit Review</button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BreweryDetails;
