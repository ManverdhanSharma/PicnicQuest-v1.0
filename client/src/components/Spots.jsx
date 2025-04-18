import React from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Phone } from "lucide-react";

function Spots() {
  const spots = [
    {
      name: "Marina Beach",
      image: "/images/spots/marina.jpg",
      description: "The second-longest urban beach in the world, perfect for evening walks and street food.",
      timings: "24/7",
      contact: "044-2538-4520",
      location: "Marina Beach Road, Chennai"
    },
    {
      name: "Mahabalipuram",
      image: "/images/spots/mahabalipuram.jpg",
      description: "UNESCO World Heritage site featuring ancient temples and rock carvings.",
      timings: "6:00 AM - 6:00 PM",
      contact: "044-2746-2193",
      location: "Mahabalipuram, Chennai"
    },
    {
      name: "Elliot's Beach",
      image: "/images/spots/elliots.jpg",
      description: "A serene beach perfect for picnics and watching beautiful sunsets.",
      timings: "24/7",
      contact: "044-2538-4521",
      location: "Besant Nagar, Chennai"
    },
    {
      name: "Guindy National Park",
      image: "/images/spots/guindy.jpg",
      description: "A green escape in the city with a mini zoo and nature trails.",
      timings: "9:00 AM - 5:30 PM",
      contact: "044-2230-1698",
      location: "Guindy, Chennai"
    },
    {
      name: "Kapaleeshwarar Temple",
      image: "/images/spots/kabali.jpg",
      description: "Historic temple known for Dravidian architecture and spiritual ambiance.",
      timings: "5:00 AM - 9:00 PM",
      contact: "044-2464-1670",
      location: "Mylapore, Chennai"
    },
    {
      name: "Crocodile Bank",
      image: "/images/spots/crocodile.jpg",
      description: "Conservation center for crocodiles and reptiles, perfect for kids.",
      timings: "8:30 AM - 5:30 PM",
      contact: "044-2745-2496",
      location: "East Coast Road, Chennai"
    },
    {
      name: "VGP Universal Kingdom",
      image: "/images/spots/vgp.jpg",
      description: "Popular amusement park with water rides and entertainment for all ages.",
      timings: "11:00 AM - 7:30 PM",
      contact: "044-2747-2023",
      location: "ECR, Chennai"
    },
    {
      name: "Snake Park",
      image: "/images/spots/snakepark.jpg",
      description: "Educational and interactive reptile park beside Guindy National Park.",
      timings: "9:00 AM - 5:30 PM",
      contact: "044-2235-1471",
      location: "Sardar Patel Road, Chennai"
    },
    {
      name: "Tholkappia Poonga",
      image: "/images/spots/tholkappia.jpg",
      description: "Ecological park with lush greenery and peaceful picnic spots.",
      timings: "10:00 AM - 5:00 PM",
      contact: "044-2461-3652",
      location: "Adyar, Chennai"
    },
    {
      name: "Arignar Anna Zoological Park",
      image: "/images/spots/arignar.jpg",
      description: "One of India’s largest zoos featuring exotic animals and safari rides.",
      timings: "9:00 AM - 5:00 PM (Closed on Tuesday)",
      contact: "044-2953-0032",
      location: "Vandalur, Chennai"
    },
    {
      name: "Valluvar Kottam",
      image: "/images/spots/valluvar.jpg",
      description: "A monument dedicated to Tamil poet Thiruvalluvar with cultural importance.",
      timings: "8:00 AM - 6:00 PM",
      contact: "044-2814-2345",
      location: "Nungambakkam, Chennai"
    },
    {
      name: "Semmozhi Poonga",
      image: "/images/spots/semmozhi.jpg",
      description: "A beautiful botanical garden with rare plant species and landscaped paths.",
      timings: "10:00 AM - 7:30 PM",
      contact: "044-2852-0032",
      location: "Cathedral Road, Chennai"
    }
  ];

  return (
    <div className="py-12">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-12"
      >
        Popular Picnic Spots
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {spots.map((spot, index) => (
          <motion.div
            key={spot.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="h-48 relative">
              <img
                loading="lazy"
                alt={spot.name}
                src={spot.image}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{spot.name}</h3>
              <p className="text-gray-600 mb-4">{spot.description}</p>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{spot.timings}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{spot.contact}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{spot.location}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Spots;