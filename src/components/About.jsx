
import React from "react";
import { motion } from "framer-motion";

function About() {
  return (
    <div className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-12">About Chennai Picnics</h1>
        
        <div className="mb-12">
          <img  alt="Chennai cityscape" className="w-full h-64 object-cover rounded-lg mb-8" src="https://images.unsplash.com/photo-1585981150423-97444313aae9" />
          
          <p className="text-lg text-gray-700 mb-6">
            Welcome to Chennai Picnics, your ultimate guide to exploring the cultural capital of South India. We specialize in creating memorable experiences that blend the city's rich heritage with modern attractions.
          </p>

          <p className="text-lg text-gray-700 mb-6">
            Our team of experienced local guides and travel experts work tirelessly to curate the perfect itineraries that showcase the best of Chennai - from its stunning beaches and historical monuments to its vibrant culture and delicious cuisine.
          </p>

          <p className="text-lg text-gray-700">
            Whether you're a solo traveler, family, or group of friends, we have the perfect package to make your Chennai visit unforgettable. Join us in exploring this beautiful city and create memories that will last a lifetime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p className="text-gray-600">To provide authentic and memorable Chennai experiences to visitors from around the world.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Experience</h3>
            <p className="text-gray-600">Over 10 years of expertise in organizing tours and cultural experiences.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Commitment</h3>
            <p className="text-gray-600">Dedicated to providing high-quality service and ensuring customer satisfaction.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default About;
