import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Spline from "@splinetool/react-spline";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  MapPin,
  Clock,
  Star,
  Navigation,
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Set custom user marker icon
const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
  iconSize: [32, 32],
});

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function Home() {
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState(null);
  const chennaiCenter = [13.0827, 80.2707];

  const topSpots = [
    {
      name: "Marina Beach",
      description: "World's second-longest urban beach",
      rating: 4.8,
      timing: "24/7",
      image: "/images/spots/marina.jpg",
      coordinates: [13.0499, 80.2824],
      departureTime: "8:00 AM",
      arrivalTime: "8:30 AM",
    },
    {
      name: "Mahabalipuram",
      description: "Ancient temples and rock carvings",
      rating: 4.9,
      timing: "6 AM - 6 PM",
      image: "/images/spots/mahabalipuram.jpg",
      coordinates: [12.6269, 80.1927],
      departureTime: "9:00 AM",
      arrivalTime: "10:30 AM",
    },
    {
      name: "Kapaleeshwarar Temple",
      description: "Historic Dravidian architecture",
      rating: 4.7,
      timing: "5 AM - 12 PM",
      image: "/images/spots/kalapeeshwara.jpg",
      coordinates: [13.0334, 80.2687],
      departureTime: "7:00 AM",
      arrivalTime: "7:30 AM",
    },
  ];

  const otherSpots = [
    {
      name: "Elliot's Beach",
      description: "Serene beach for peaceful evenings",
      coordinates: [13.0008, 80.2662],
    },
    {
      name: "Guindy National Park",
      description: "One of the few national parks in a city",
      coordinates: [13.0108, 80.2296],
    },
    {
      name: "Valluvar Kottam",
      description: "Monument to Tamil poet Thiruvalluvar",
      coordinates: [13.0505, 80.2356],
    },
    {
      name: "Fort St. George",
      description: "Historic fort built by British East India Company",
      coordinates: [13.0805, 80.2879],
    },
    {
      name: "Birla Planetarium",
      description: "Popular science and space education center",
      coordinates: [13.0104, 80.2378],
    },
    {
      name: "Theosophical Society",
      description: "Peaceful campus with a 450-year-old banyan tree",
      coordinates: [13.0043, 80.2551],
    },
    {
      name: "DakshinaChitra",
      description: "Living museum of South Indian heritage",
      coordinates: [12.8342, 80.2413],
    },
    {
      name: "MGR Film City",
      description: "Film production complex and tourist attraction",
      coordinates: [12.9779, 80.2171],
    },
    {
      name: "Cholamandal Artists' Village",
      description: "Artists’ community showcasing modern art",
      coordinates: [12.8674, 80.2505],
    },
  ];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => console.error("Geolocation error:", error)
      );
    }
  }, []);

  const calculateDistance = (coord1, coord2) => {
    const R = 6371;
    const dLat = ((coord2[0] - coord1[0]) * Math.PI) / 180;
    const dLon = ((coord2[1] - coord1[1]) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((coord1[0] * Math.PI) / 180) *
        Math.cos((coord2[0] * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(1);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div
        className="relative h-[80vh] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url('/images/hero-bg.jpg')`,
        }}
      >
        <div className="absolute inset-0 z-10">
          <Spline scene="https://prod.spline.design/6PYwuxdpHUYHkqXL/scene.splinecode" />
        </div>
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6 text-white"
          >
            Discover Chennai
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 max-w-2xl text-gray-200"
          >
            Experience the perfect blend of tradition and modernity
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4"
          >
            <Button onClick={() => navigate("/spots")}>Explore Spots</Button>
            <Button variant="outline" onClick={() => navigate("/packages")}>
              View Packages
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-8 text-center"
          >
            Explore on the Map
          </motion.h2>
          <div className="h-[400px] rounded-lg overflow-hidden mb-12 shadow-md">
            <MapContainer center={chennaiCenter} zoom={11} style={{ height: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
              />
              {userLocation && (
                <Marker position={userLocation} icon={userIcon}>
                  <Popup>Your Location</Popup>
                </Marker>
              )}
              {[...topSpots, ...otherSpots].map((spot) => (
                <Marker key={spot.name} position={spot.coordinates}>
                  <Popup>
                    <h3 className="font-bold">{spot.name}</h3>
                    <p className="text-sm text-gray-600">{spot.description}</p>
                    {userLocation && (
                      <p className="text-sm mt-2">
                        Distance: {calculateDistance(userLocation, spot.coordinates)} km
                      </p>
                    )}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Top Spots Display */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Top Favorite Spots</h2>
            <Button variant="ghost" onClick={() => navigate("/spots")}>
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topSpots.map((spot, index) => (
              <motion.div
                key={spot.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <img
                  src={spot.image}
                  alt={spot.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{spot.name}</h3>
                  <p className="text-gray-600 mb-3">{spot.description}</p>
                  <div className="text-sm text-gray-500 space-y-2">
                    <div className="flex justify-between">
                      <div className="flex gap-1 items-center">
                        <Star className="w-4 h-4 text-yellow-400" />
                        {spot.rating}
                      </div>
                      <div className="flex gap-1 items-center">
                        <Clock className="w-4 h-4" />
                        {spot.timing}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex gap-1 items-center">
                        <MapPin className="w-4 h-4" />
                        {spot.departureTime}
                      </div>
                      <div className="flex gap-1 items-center">
                        <Navigation className="w-4 h-4" />
                        {spot.arrivalTime}
                      </div>
                    </div>
                    {userLocation && (
                      <div className="flex gap-1 items-center mt-1">
                        <MapPin className="w-4 h-4" />
                        Distance: {calculateDistance(userLocation, spot.coordinates)} km
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;