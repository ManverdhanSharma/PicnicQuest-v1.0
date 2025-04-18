import { useState, useEffect } from 'react';
import { useAuth } from "./AuthContext";

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

  const { isAuthenticated } = useAuth();

  // Fetch all reviews on component mount
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3002/get-reviews');
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
      const response = await fetch('http://localhost:3002/submit-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locationName, nearestLandmark, reason }),
      });
      const data = await response.json();
      if (response.ok) {
        setSubmitSuccess(data.message);
        setLocationName('');
        setNearestLandmark('');
        setReason('');
        fetchReviews();
      } else {
        setSubmitError(data.message);
      }
    } catch (err) {
      setSubmitError('Error submitting review: ' + err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Picnic Spot Reviews</h2>

      {/* Submit Review Form - Only show to authenticated users */}
      {isAuthenticated ? (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-semibold mb-4 text-center">Submit a New Review</h3>
          {submitError && <div className="mb-2 text-red-600 font-medium">{submitError}</div>}
          {submitSuccess && <div className="mb-2 text-green-600 font-medium">{submitSuccess}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="location" className="block text-gray-700 mb-1 font-medium">Location Name</label>
              <input
                type="text"
                id="location"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="landmark" className="block text-gray-700 mb-1 font-medium">Nearest Landmark</label>
              <input
                type="text"
                id="landmark"
                value={nearestLandmark}
                onChange={(e) => setNearestLandmark(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="reason" className="block text-gray-700 mb-1 font-medium">Why You Recommend It</label>
              <textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
            >
              Submit Review
            </button>
          </form>
        </div>
      ) : (
        <p className="text-center text-gray-600 mb-8">
          Please <a href="/login" className="text-blue-600 underline">login</a> to submit a review.
        </p>
      )}

      {/* Display Reviews */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Recent Reviews</h3>
        {loading && <p className="text-center text-gray-500">Loading reviews...</p>}
        {error && <div className="text-red-600 font-medium text-center mb-4">{error}</div>}

        {!loading && !error && reviews.length === 0 && (
          <p className="text-center text-gray-500">No reviews yet. Be the first to review a picnic spot!</p>
        )}

        {!loading && !error && reviews.length > 0 && (
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg shadow">
                <h4 className="font-bold text-lg">{review.locationName}</h4>
                <p className="text-gray-700"><span className="font-semibold">Landmark:</span> {review.nearestLandmark}</p>
                <p className="mt-1">{review.reason}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(review.submittedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Reviews;
