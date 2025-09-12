import React from 'react';
import { useAuth } from '@/AuthContext';
import UserBadges from './UserBadges';

function Profile() {
  const { user, logout } = useAuth();
  
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
        <p>Username: {user.username}</p>
        <button 
          onClick={logout}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Your Badges</h2>
        <UserBadges />
      </div>
    </div>
  );
}

export default Profile;
