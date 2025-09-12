import { useState, useEffect } from 'react';
import { useAuth } from "./AuthContext";

// Define the API URL using the environment variable for deployment, with a fallback for local development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // New review form state
  const [locationName, setLocationName] = useState('');
  const [nearestLandmark, setNearestLandmark] = useState('');
  const [reason, setReason] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  
  const { isAuthenticated, user } = useAuth();

  // Fetch all reviews on component mount
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      // Use the API_URL variable
      const response = await fetch(`${API_URL}/get-reviews`);
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      const data = await response.json();
      setReviews(data);
      setError(null);
    } catch (err) {
      setError('Error loading reviews: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess('');

    if (!locationName || !nearestLandmark || !reason) {
      setSubmitError('Please fill in all fields');
      return;
    }

    try {
      // Use the API_URL variable
      const response = await fetch(`${API_URL}/submit-review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          locationName, 
          nearestLandmark, 
          reason,
          username: user ? user.username : null // Pass username for badge logic
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitSuccess(data.message);
        setLocationName('');
        setNearestLandmark('');
        setReason('');
        fetchReviews(); // Refresh the reviews list
      } else {
        setSubmitError(data.message);
      }
    } catch (err) {
      setSubmitError('Error submitting review: ' + err.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Picnic Spot Reviews</h1>
      
      {/* Submit Review Form */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-2">Submit a Review</h2>
          {submitError && <p className="text-red-500">{submitError}</p>}
          {submitSuccess && <p className="text-green-500">{submitSuccess}</p>}
          <div className="mb-2">
            <input 
              type="text" 
              placeholder="Location Name" 
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-2">
            <input 
              type="text" 
              placeholder="Nearest Landmark" 
              value={nearestLandmark}
              onChange={(e) => setNearestLandmark(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-2">
            <textarea 
              placeholder="Why is it a good spot?" 
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
        </form>
      ) : (
        <p className="mb-8 text-center text-gray-600">Please login to submit a review.</p>
      )}

      {/* Display Reviews */}
      <div>
        {loading && <p>Loading reviews...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && reviews.length === 0 && <p>No reviews yet. Be the first to review a picnic spot!</p>}
        {!loading && !error && reviews.length > 0 && (
          <div className="space-y-4">
            {reviews.map(review => (
              <div key={review._id} className="p-4 border rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold">{review.locationName}</h3>
                <p className="text-sm text-gray-500">Landmark: {review.nearestLandmark}</p>
                <p className="mt-2">{review.reason}</p>
                <p className="text-xs text-gray-400 mt-2">Submitted on: {new Date(review.submittedAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Reviews;
