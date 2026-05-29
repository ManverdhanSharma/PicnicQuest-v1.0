import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, MessageSquare, PlusCircle, CheckCircle, AlertCircle, Calendar, User, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
// Change this line in src/pages/Reviews.jsx:
import { useAuth } from "@/AuthContext";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/get-reviews`);
      if (!response.ok) throw new Error('Failed to fetch reviews');
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
      setSubmitError('Please fill in all fields before submitting.');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch(`${API_URL}/submit-review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          locationName, 
          nearestLandmark, 
          reason,
          username: user ? user.username : null
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitSuccess(data.message || 'Review submitted successfully!');
        setLocationName('');
        setNearestLandmark('');
        setReason('');
        fetchReviews(); 
      } else {
        setSubmitError(data.message || 'Submission failed.');
      }
    } catch (err) {
      setSubmitError('Error submitting review: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to extract a single cleaner initial character for profile mockups
  const getInitial = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50/60 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Main Branding Intro */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2 flex items-center justify-center md:justify-start gap-2.5">
            <MessageSquare className="text-indigo-600 w-9 h-9" /> Community Discovery Feed
          </h1>
          <p className="text-sm text-gray-500 max-w-2xl">
            Real crowd-sourced experiences and hidden picnic spot recommendations shared directly by travelers exploring the region.
          </p>
        </div>

        {/* Dashboard Split-Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Hand: Interactive Input Form Handling Block Panel */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-gray-100 shadow-xl lg:sticky lg:top-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 tracking-tight">
              <PlusCircle size={20} className="text-indigo-600" /> Share a New Spot
            </h2>
            
            {isAuthenticated ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {submitError && (
                  <div className="flex items-start gap-2 p-3 bg-rose-50 text-rose-700 rounded-xl border border-rose-100 text-xs font-semibold">
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                    <span>{submitError}</span>
                  </div>
                )}
                
                {submitSuccess && (
                  <div className="flex items-start gap-2 p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-100 text-xs font-semibold">
                    <CheckCircle size={16} className="shrink-0 mt-0.5" />
                    <span>{submitSuccess}</span>
                  </div>
                )}

                <div>
                  <label className="block mb-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Spot Destination Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Hidden Backwater Stream" 
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition font-medium text-sm text-gray-800"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block mb-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Nearest Area Landmark</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 200m past Covelong Bridge" 
                    value={nearestLandmark}
                    onChange={(e) => setNearestLandmark(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition font-medium text-sm text-gray-800"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block mb-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Your Experience Review</label>
                  <textarea 
                    rows={4}
                    placeholder="Detail the natural shade, ground safety conditions, vehicle parking space availability, and best times to visit..." 
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition font-medium text-sm text-gray-800 resize-none"
                    disabled={isSubmitting}
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition shadow-md flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" /> Publishing Review...
                    </>
                  ) : 'Publish To Feed'}
                </Button>
              </form>
            ) : (
              <div className="py-6 px-4 bg-gray-50 border border-gray-100 rounded-2xl text-center">
                <User size={32} className="mx-auto text-gray-300 mb-2" />
                <p className="text-sm font-semibold text-gray-600 mb-1">Authentication Required</p>
                <p className="text-xs text-gray-400 mb-4">Please log into your active account profile deck to share custom regional reviews.</p>
                <Button onClick={() => window.location.href = "/login"} className="w-full bg-gray-900 text-white font-bold text-xs uppercase py-2 rounded-xl">
                  Sign In Account
                </Button>
              </div>
            )}
          </div>

          {/* Right Hand: Interactive Stream Dynamic Reviews Feed List */}
          <div className="lg:col-span-8">
            {loading && (
              <div className="space-y-4">
                {[1, 2, 3].map(n => (
                  <div key={n} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm animate-pulse flex flex-col gap-3">
                    <div className="h-6 bg-gray-200 rounded-md w-1/3" />
                    <div className="h-4 bg-gray-200 rounded-md w-1/4" />
                    <div className="h-4 bg-gray-200 rounded-md w-3/4 mt-2" />
                  </div>
                ))}
              </div>
            )}

            {error && (
              <div className="p-4 bg-rose-50 text-rose-700 rounded-2xl border border-rose-100 flex items-center gap-2 text-sm font-medium">
                <AlertCircle size={18} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {!loading && !error && reviews.length === 0 && (
              <div className="text-center py-16 bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
                <MessageSquare size={44} className="mx-auto text-gray-200 mb-3" />
                <h3 className="text-lg font-bold text-gray-700 mb-1">No Reviews Shared Yet</h3>
                <p className="text-xs text-gray-400 max-w-sm mx-auto">Be the foundational pilot voice! Fill out the submission form block to index your discovered spots first.</p>
              </div>
            )}

            {!loading && !error && reviews.length > 0 && (
              <div className="space-y-4">
                <AnimatePresence>
                  {reviews.map((review, index) => (
                    <motion.div 
                      key={review._id || index}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
                      className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition duration-200 flex items-start gap-4"
                    >
                      {/* Avatar initial badge graphics configuration */}
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-black text-sm flex items-center justify-center shadow-inner shrink-0 uppercase">
                        {getInitial(review.username)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                          <h3 className="text-lg font-black text-gray-900 tracking-tight truncate">{review.locationName}</h3>
                          <div className="flex items-center gap-1 text-[11px] text-gray-400 font-bold bg-gray-50 px-2.5 py-1 rounded-md">
                            <Calendar size={12} className="text-gray-400" /> 
                            <span>{review.submittedAt ? new Date(review.submittedAt).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent'}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-xs font-bold text-indigo-600 mb-3">
                          <MapPin size={13} className="shrink-0" />
                          <span className="truncate">Landmark: {review.nearestLandmark}</span>
                        </div>

                        <p className="text-sm text-gray-600 leading-relaxed font-medium bg-gray-50/50 p-3 rounded-2xl border border-gray-100/50">
                          {review.reason}
                        </p>

                        <div className="mt-3 flex items-center justify-between text-[11px] text-gray-400 font-semibold px-1">
                          <span className="text-gray-500 flex items-center gap-1">
                            Contributed by: <span className="text-indigo-600 font-bold">@{review.username || 'anonymous'}</span>
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

export default Reviews;