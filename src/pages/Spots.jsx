import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Clock, 
  Phone, 
  Search, 
  Filter, 
  Sparkles, 
  CalendarDays, 
  ArrowRight 
} from "lucide-react";

function Spots() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const spots = [
    {
      name: "Marina Beach",
      image: "/images/spots/marina.jpg",
      description: "The second-longest urban beach in the world, perfect for evening walks, sea breezes, and local street food culture.",
      category: "Beaches",
      timings: "24/7",
      contact: "044-2538-4520",
      location: "Marina Beach Road, Chennai"
    },
    {
      name: "Mahabalipuram",
      image: "/images/spots/mahabalipuram.jpg",
      description: "Stunning UNESCO World Heritage site featuring ancient monolithic rock temples and intricate rock carvings by the sea.",
      category: "Heritage",
      timings: "6:00 AM - 6:00 PM",
      contact: "044-2746-2193",
      location: "Mahabalipuram, Chennai"
    },
    {
      name: "Elliot's Beach",
      image: "/images/spots/elliots.jpg",
      description: "A calmer, serene beach in Besant Nagar perfect for relaxing weekend picnics and watching beautiful coastal sunsets.",
      category: "Beaches",
      timings: "24/7",
      contact: "044-2538-4521",
      location: "Besant Nagar, Chennai"
    },
    {
      name: "Guindy National Park",
      image: "/images/spots/guindy.jpg",
      description: "A lush green escape completely within the city bounds, equipped with a mini zoo, avian exhibits, and clear nature trails.",
      category: "Nature",
      timings: "9:00 AM - 5:30 PM",
      contact: "044-2230-1698",
      location: "Guindy, Chennai"
    },
    {
      name: "Kapaleeshwarar Temple",
      description: "Historic 7th-century temple showcase known for towering colorful Dravidian architecture and a deep spiritual ambiance.",
      category: "Heritage",
      image: "/images/spots/kabali.jpg",
      timings: "5:00 AM - 9:00 PM",
      contact: "044-2464-1670",
      location: "Mylapore, Chennai"
    },
    {
      name: "Crocodile Bank",
      image: "/images/spots/crocodile.jpg",
      description: "A premier wildlife conservation center focused on breeding rare crocodiles, alligators, and coastal reptiles.",
      category: "Nature",
      timings: "8:30 AM - 5:30 PM",
      contact: "044-2745-2496",
      location: "East Coast Road, Chennai"
    },
    {
      name: "VGP Universal Kingdom",
      image: "/images/spots/vgp.jpg",
      description: "Massive popular amusement park located on ECR featuring premium water rides, rollercoasters, and family entertainment centers.",
      category: "Amusement",
      timings: "11:00 AM - 7:30 PM",
      contact: "044-2747-2023",
      location: "ECR, Chennai"
    },
    {
      name: "Snake Park",
      image: "/images/spots/snakepark.jpg",
      description: "An educational and highly interactive specialized reptile park situated right beside Guindy National Park.",
      category: "Nature",
      timings: "9:00 AM - 5:30 PM",
      contact: "044-2235-1471",
      location: "Sardar Patel Road, Chennai"
    },
    {
      name: "Tholkappia Poonga",
      image: "/images/spots/tholkappia.jpg",
      description: "Eco-restoration park ecosystem preserving native wetland plants, dense mangrove foliage, and peaceful trails.",
      category: "Nature",
      timings: "10:00 AM - 5:00 PM",
      contact: "044-2461-3652",
      location: "Adyar, Chennai"
    },
    {
      name: "Arignar Anna Zoological Park",
      image: "/images/spots/arignar.jpg",
      description: "One of South Asia's largest expansive zoos, featuring vast forested enclosures, wild animal safaris, and educational hubs.",
      category: "Nature",
      timings: "9:00 AM - 5:00 PM (Closed Tue)",
      contact: "044-2953-0032",
      location: "Vandalur, Chennai"
    },
    {
      name: "Valluvar Kottam",
      image: "/images/spots/valluvar.jpg",
      description: "A monumental structural auditorium dedicated to the classical Tamil poet-philosopher Thiruvalluvar.",
      category: "Heritage",
      timings: "8:00 AM - 6:00 PM",
      contact: "044-2814-2345",
      location: "Nungambakkam, Chennai"
    },
    {
      name: "Semmozhi Poonga",
      image: "/images/spots/semmozhi.jpg",
      description: "A meticulously landscaped central botanical garden with rare medicinal plant varieties and serene water fountains.",
      category: "Nature",
      timings: "10:00 AM - 7:30 PM",
      contact: "044-2852-0032",
      location: "Cathedral Road, Chennai"
    }
  ];

  const categories = ["All", "Beaches", "Heritage", "Nature", "Amusement"];

  // Handle Filtering Logic
  const filteredSpots = spots.filter((spot) => {
    const matchesSearch = 
      spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.location.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = selectedCategory === "All" || spot.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50/50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-xs font-bold tracking-wide uppercase mb-3"
          >
            <Sparkles size={12} /> Curated Catalog Explore
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4"
          >
            Popular Picnic Spots
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-base md:text-lg"
          >
            Discover beautiful public sanctuaries, pristine heritage environments, and tailored adventure destinations around Chennai.
          </motion.p>
        </div>

        {/* Unified Command & Filter Center */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 mb-12 space-y-6">
          {/* Live Search Input Element */}
          <div className="relative w-full max-w-xl mx-auto bg-gray-50 border border-gray-100 rounded-2xl flex items-center px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition">
            <Search className="text-gray-400 shrink-0 mr-3" size={20} />
            <input
              type="text"
              placeholder="Search spots by title, description, or landmark location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400 font-medium"
            />
          </div>

          {/* Interactive Tag Filter Line */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider mr-2">
              <Filter size={14} className="text-indigo-600" /> Filter:
            </div>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 rounded-xl text-xs font-extrabold tracking-tight transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-100 scale-105"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Catalog Yield Cards Display */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredSpots.map((spot, index) => (
              <motion.div
                key={spot.name}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-3xl shadow-md border border-gray-100/80 overflow-hidden flex flex-col group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Spot Cover Thumbnail Image */}
                <div className="h-52 w-full bg-gray-100 relative overflow-hidden">
                  <img
                    loading="lazy"
                    alt={spot.name}
                    src={spot.image}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm shadow-sm font-black text-[11px] text-indigo-700 tracking-wider uppercase px-3 py-1 rounded-xl border border-white/40">
                    {spot.category}
                  </div>
                </div>

                {/* Info Payload Block */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight group-hover:text-indigo-600 transition-colors">
                    {spot.name}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3 flex-1">
                    {spot.description}
                  </p>

                  {/* Directory Attributes Metadata */}
                  <div className="space-y-2.5 text-xs font-medium text-gray-600 pt-4 border-t border-gray-50 mb-5">
                    <div className="flex items-center gap-2.5">
                      <Clock size={15} className="text-indigo-500 shrink-0" />
                      <span className="text-gray-700"><strong>Hours:</strong> {spot.timings}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone size={15} className="text-indigo-500 shrink-0" />
                      <span className="text-gray-700"><strong>Enquiry:</strong> {spot.contact}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <MapPin size={15} className="text-indigo-500 shrink-0" />
                      <span className="text-gray-500 line-clamp-1">{spot.location}</span>
                    </div>
                  </div>

                  {/* Book Spot Route CTA Trigger button to updated Book checkout pathway */}
                  <Button
                    onClick={() => navigate("/book", { state: { event: { name: spot.name, date: "", payment: 500 } } })}
                    className="w-full bg-gray-900 hover:bg-indigo-600 text-white font-bold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <CalendarDays size={16} /> Book Entry Pass
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty Search Result Fallback Indicator */}
        {filteredSpots.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-200 shadow-sm max-w-md mx-auto mt-6"
          >
            <p className="text-gray-400 font-bold text-lg mb-1">No matches discovered</p>
            <p className="text-gray-400 text-xs px-6">We couldn't find anything matching your explicit search. Try resetting filters or modifying keywords.</p>
          </motion.div>
        )}

      </div>
    </div>
  );
}

export default Spots;