import React, { useEffect, useState } from 'react';
import { useAuth } from '@/AuthContext';
import { motion } from 'framer-motion';

function UserBadges() {

  const { user } = useAuth();

  const [badges,setBadges]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState('');

  useEffect(()=>{

    if(user?.username){
      fetchBadges();
    }

  },[user]);

  const fetchBadges = async()=>{

    setLoading(true);

    try{

      const API_URL =
        import.meta.env.VITE_API_URL
        || "http://localhost:3002";

      console.log(
        "BADGES API:",
        API_URL
      );

      const response =
        await fetch(
          `${API_URL}/users/${user.username}/badges`
        );

      if(!response.ok){

        throw new Error(
          "Failed to fetch badges"
        );

      }

      const data =
        await response.json();

      console.log(data);

      setBadges(data);

    }
    catch(err){

      console.error(err);

      setError(
        "Failed to load badges"
      );

    }
    finally{

      setLoading(false);

    }

  };

  if(loading){

    return (
      <div className="text-center py-8">
        Loading badges...
      </div>
    );

  }

  if(error){

    return (
      <div className="text-center py-8 text-red-500">
        {error}
      </div>
    );

  }

  return (

    <div className="py-8">

      <h2 className="text-2xl font-bold mb-6">
        Your Badges
      </h2>

      {badges.length===0 ? (

        <p className="text-center py-4 text-gray-500">
          No badges earned yet.
        </p>

      ) : (

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

          {badges.map((badge,index)=>(

            <motion.div
              key={index}
              initial={{
                opacity:0,
                scale:0.8
              }}
              animate={{
                opacity:1,
                scale:1
              }}
              className="bg-white rounded-lg p-4 text-center shadow-md"
            >

              <div className="w-16 h-16 mx-auto mb-2">

                <img
                  src={badge.icon}
                  alt={badge.name}
                  className="w-full h-full"
                />

              </div>

              <h4 className="font-semibold">

                {badge.name}

              </h4>

              <p className="text-xs text-gray-600">

                {badge.description}

              </p>

              {badge.earnedAt && (

                <p className="text-xs text-gray-400 mt-1">

                  Earned on{" "}
                  {new Date(
                    badge.earnedAt
                  ).toLocaleDateString()}

                </p>

              )}

            </motion.div>

          ))}

        </div>

      )}

    </div>

  );

}

export default UserBadges;