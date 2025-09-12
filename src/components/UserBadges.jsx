// src/components/UserBadges.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/AuthContext';
import { motion } from 'framer-motion';

function UserBadges() {
  const { user } = useAuth();
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    if (user) {
      fetchBadges();
    }
  }, [user]);
  
  const fetchBadges = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3002/users/${user.id}/badges`);
      if (!response.ok) throw new Error('Failed to fetch badges');
      
      const data = await response.json();
      setBadges(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load badges');
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) return <div className="text-center py-8">Loading badges...</div>;
  
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6">Your Badges</h2>
      
      {badges.length === 0 ? (
        <p className="text-center py-4 text-gray-500">You haven't earned any badges yet. Start booking and reviewing to earn badges!</p>
      ) : (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {badges.filter(badge => badge.completed).map(badge => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-lg p-4 text-center shadow-md"
              >
                <div className="w-16 h-16 mx-auto mb-2">
                  <img src={badge.icon} alt={badge.name} className="w-full h-full" />
                </div>
                <h4 className="font-semibold text-md">{badge.name}</h4>
                <p className="text-xs text-gray-600">{badge.description}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Earned on {new Date(badge.earnedAt).toLocaleDateString()}
                </p>
              </motion.div>
            ))}
          </div>
          
          {badges.some(badge => !badge.completed) && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Badges In Progress</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {badges.filter(badge => !badge.completed).map(badge => (
                  <div key={badge.id} className="bg-white rounded-lg p-4 shadow-md">
                    <div className="flex items-center">
                      <div className="w-12 h-12 mr-4 opacity-50">
                        <img src={badge.icon} alt={badge.name} className="w-full h-full" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{badge.name}</h4>
                        <p className="text-xs text-gray-600">{badge.description}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-blue-600 rounded-full" 
                          style={{ width: `${Math.min(100, (badge.progress / badge.requiredValue) * 100)}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Progress: {badge.progress} / {badge.requiredValue}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UserBadges;
