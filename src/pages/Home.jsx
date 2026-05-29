import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  MapPin,
  Clock,
  Star,
  Navigation,
  Search,
  Filter,
  Compass,
  Sparkles
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
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function Home() {
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const chennaiCenter = [13.0827, 80.2707];

  const topSpots = [
    {
      name: "Marina Beach",
      description: "World's second-longest urban beach, perfect for morning strolls and local street food.",
      rating: 4.8,
      timing: "24/7",
      category: "Beaches",
      image: "https://images.unsplash.com/photo-1589979485602-16abc4a8a0e0?auto=format&fit=crop&w=800&q=80",
      coordinates: [13.0499, 80.2824],
      departureTime: "8:00 AM",
      arrivalTime: "8:30 AM",
    },
    {
      name: "Mahabalipuram",
      description: "Ancient UNESCO World Heritage temples and intricate rock carvings by the sea.",
      rating: 4.9,
      timing: "6 AM - 6 PM",
      category: "Heritage",
      image: "https://images.unsplash.com/photo-1600100397608-f010170fa602?auto=format&fit=crop&w=800&q=80",
      coordinates: [12.6269, 80.1927],
      departureTime: "9:00 AM",
      arrivalTime: "10:30 AM",
    },
    {
      name: "Kapaleeshwarar Temple",
      description: "Historic 7th-century Dravidian architectural marvel nestled in classic Mylapore.",
      rating: 4.7,
      timing: "5 AM - 12 PM",
      category: "Heritage",
      image: "https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&w=800&q=80",
      coordinates: [13.0334, 80.2687],
      departureTime: "7:00 AM",
      arrivalTime: "7:30 AM",
    },
  ];

  const otherSpots = [
    {
      name: "Elliot's Beach",
      description: "Serene beach for peaceful evenings and clean coastal walks.",
      category: "Beaches",
      coordinates: [13.0008, 80.2662],
    },
    {
      name: "Guindy National Park",
      description: "One of the few national parks situated completely inside a metropolis.",
      category: "Nature",
      coordinates: [13.0108, 80.2296],
    },
    {
      name: "Valluvar Kottam",
      description: "Monument dedicated to the legendary Tamil poet and philosopher Thiruvalluvar.",
      category: "Heritage",
      coordinates: [13.0505, 80.2356],
    },
    {
      name: "Fort St. George",
      description: "Historic fort built by the British East India Company in 1644.",
      category: "Heritage",
      coordinates: [13.0805, 80.2879],
    },
    {
      name: "Birla Planetarium",
      description: "Popular interactive science and space education astronomy center.",
      category: "Nature",
      coordinates: [13.0104, 80.2378],
    },
    {
      name: "Theosophical Society",
      description: "Peaceful forest campus featuring a monumental 450-year-old banyan tree.",
      category: "Nature",
      coordinates: [13.0043, 80.2551],
    },
  ];

  const allSpots = [...topSpots, ...otherSpots];

  // Geolocation handling
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.warn("Location unavailable using fallback");
          setUserLocation(chennaiCenter);
        }
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

  // Live filter computation
  const filteredSpots = allSpots.filter((spot) => {
    const matchesSearch = spot.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          spot.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || spot.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "Beaches", "Heritage", "Nature"];

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      
      {/* High-Performance Modern Parallax Hero Section */}
      <div className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0 select-none pointer-events-none scale-105 animate-pulse duration-10000">
          <img 
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1920&q=80" 
            alt="Scenic Travel Layout" 
            className="w-full h-full object-cover opacity-40 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-slate-950/70 to-gray-50" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center max-w-4xl px-4 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4 flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-white text-xs font-semibold uppercase tracking-wider"
          >
            <Sparkles size={14} className="text-yellow-400" /> Plan Your Next Gateway
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-8xl font-black mb-6 text-white tracking-tight leading-none"
          >
            Discover <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-200 to-white">Chennai</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-base md:text-2xl mb-10 max-w-2xl text-gray-300 font-light"
          >
            Experience a pristine curation of coastal architecture, historic heritage structures, and hidden nature trails.
          </motion.p>

          {/* Interactive Search Bar Element */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-xl bg-white p-2 rounded-2xl shadow-2xl border border-gray-100 flex items-center gap-2"
          >
            <div className="flex items-center gap-2 flex-1 px-2">
              <Search className="text-gray-400 shrink-0" size={20} />
              <input 
                type="text" 
                placeholder="Search beach, park, heritage temple..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm bg-transparent outline-none text-gray-800 placeholder-gray-400"
              />
            </div>
            <Button size="sm" onClick={() => navigate("/spots")} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">
              Find Spots
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Modern Metrics Ticker — Responsive columns layout */}
      <section className="relative z-20 -mt-10 max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-extrabold text-indigo-600">15+</div>
            <div className="text-xs md:text-sm font-medium text-gray-500 mt-1">Curated Spaces</div>
          </div>
          <div className="border-y sm:border-y-0 sm:border-x border-gray-100 py-4 sm:py-0">
            <div className="text-3xl md:text-4xl font-extrabold text-indigo-600">4.8★</div>
            <div className="text-xs md:text-sm font-medium text-gray-500 mt-1">Average Rating</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-extrabold text-indigo-600">10k+</div>
            <div className="text-xs md:text-sm font-medium text-gray-500 mt-1">Happy Explorers</div>
          </div>
        </div>
      </section>

      {/* Dynamic Filter Layout Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 mt-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex items-center gap-3 self-start">
            <Filter size={18} className="text-indigo-600" />
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-xl transition ${
                    selectedCategory === category 
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div className="text-xs font-semibold text-gray-400 bg-gray-50 px-3 py-1 rounded-lg self-end md:self-auto">
            Showing {filteredSpots.length} unique targets
          </div>
        </div>

        {/* Dynamic Interactive Map Module — FIXED with container depth restraint logic */}
        <div className="h-[450px] rounded-3xl overflow-hidden mb-16 shadow-2xl border border-gray-100 relative z-0">
          <MapContainer center={chennaiCenter} zoom={11} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />
            {userLocation && (
              <Marker position={userLocation} icon={userIcon}>
                <Popup><span className="font-bold text-indigo-600">Your Current Position</span></Popup>
              </Marker>
            )}
            {filteredSpots.map((spot) => (
              <Marker key={spot.name} position={spot.coordinates}>
                <Popup>
                  <div className="p-1 max-w-xs">
                    <h4 className="font-bold text-gray-900 text-sm mb-0.5">{spot.name}</h4>
                    <p className="text-xs text-gray-500 mb-2">{spot.description || "Scenic location spot"}</p>
                    {userLocation && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        <Compass size={10} /> {calculateDistance(userLocation, spot.coordinates)} km away
                      </span>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Favorite Spots Display Cards */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Top Favorite Spots</h2>
            <p className="text-xs md:text-sm text-gray-500 mt-1">Handpicked experiences prioritizing safety, route connectivity, and aesthetics.</p>
          </div>
          <Button variant="ghost" onClick={() => navigate("/spots")} className="font-bold text-indigo-600 hover:text-indigo-700 shrink-0 text-xs md:text-sm">
            View All <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredSpots.filter(s => s.image).map((spot, index) => (
              <motion.div
                key={spot.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col group hover:shadow-2xl transition-all duration-300"
              >
                <div className="h-52 w-full object-cover relative overflow-hidden bg-gray-100">
                  <img
                    src={spot.image}
                    alt={spot.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-xl text-xs font-bold shadow-sm">
                    {spot.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-indigo-600 transition-colors">{spot.name}</h3>
                  <p className="text-gray-500 text-sm mb-4 flex-1 line-clamp-2">{spot.description}</p>
                  
                  <div className="text-xs text-gray-500 space-y-2.5 pt-4 border-t border-gray-50">
                    <div className="flex justify-between font-medium">
                      <div className="flex gap-1 items-center text-amber-600">
                        <Star className="w-4 h-4 fill-amber-500 stroke-amber-500" />
                        {spot.rating} Core Score
                      </div>
                      <div className="flex gap-1 items-center text-gray-600">
                        <Clock className="w-4 h-4" />
                        {spot.timing}
                      </div>
                    </div>

                    <div className="flex justify-between text-gray-400">
                      <div className="flex gap-1 items-center">
                        <MapPin className="w-3.5 h-3.5" />
                        Leaves: {spot.departureTime}
                      </div>
                      <div className="flex gap-1 items-center">
                        <Navigation className="w-3.5 h-3.5" />
                        Returns: {spot.arrivalTime}
                      </div>
                    </div>

                    {userLocation && (
                      <div className="flex gap-1 items-center text-indigo-600 font-bold bg-indigo-50/70 p-2 rounded-xl mt-1">
                        <Compass className="w-4 h-4" />
                        Distance: {calculateDistance(userLocation, spot.coordinates)} kilometers away
                      </div>
                    )}
                  </div>

                  {/* Direct Route Action Link to Updated Checkout Form */}
                  <Button 
                    onClick={() => navigate("/book", { state: { event: { name: spot.name, date: "", payment: 500 } } })}
                    className="w-full mt-5 bg-gray-900 hover:bg-indigo-600 text-white font-bold py-2.5 rounded-xl shadow-md transition-all"
                  >
                    Book Experience
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

export default Home;