// src/components/BadgeNotification.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function BadgeNotification({ badge, onClose }) {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    // Auto-hide notification after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (!isVisible && onClose) {
      onClose();
    }
  }, [isVisible, onClose]);
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.3 }}
          className="fixed top-20 right-4 z-50 bg-white rounded-lg shadow-lg p-4 max-w-xs"
        >
          <div className="flex items-center">
            <div className="w-16 h-16 mr-3">
              <img src={badge.icon} alt={badge.name} className="w-full h-full" />
            </div>
            <div>
              <h4 className="font-bold text-lg">Badge Unlocked!</h4>
              <p className="font-medium text-blue-600">{badge.name}</p>
              <p className="text-sm text-gray-600">{badge.description}</p>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default BadgeNotification;
