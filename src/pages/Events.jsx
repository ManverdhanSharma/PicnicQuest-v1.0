import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Clock, Users, Ticket, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/AuthContext";

function Events() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const events = [
    {
      name: "Chennai Food Festival",
      description: "Experience the ultimate collection of South Indian traditional cuisines, live culinary showcases, and global fusion stalls.",
      date: "2026-07-15",
      time: "10:00 AM - 10:00 PM",
      location: "Island Grounds, Chennai",
      capacity: "5000+ attendees",
      pricePerPerson: 350,
      image: "https://images.unsplash.com/photo-1596451984027-b5d6ea0bbc5e?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Marina Beach Cultural Night",
      description: "Traditional folk dance showcases, live instrumental symphonies, and classical arts performed under the evening stars.",
      date: "2026-07-20",
      time: "6:00 PM - 10:00 PM",
      location: "Marina Beach, Chennai",
      capacity: "2000+ attendees",
      pricePerPerson: 200,
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Mylapore Heritage Walk",
      description: "An expert-guided architectural exploration weaving through ancient temple corridors and colonial trading structures.",
      date: "2026-08-02",
      time: "7:00 AM - 10:00 AM",
      location: "Kapaleeshwarar Temple Precinct",
      capacity: "50 slots remaining",
      pricePerPerson: 600,
      image: "https://images.unsplash.com/photo-1582651957695-5506eb1f3bde?auto=format&fit=crop&w=600&q=80"
    }
  ];

  const handleRegistrationRedirect = (eventItem) => {
    if (!user) {
      // Direct unauthorized sessions to login seamlessly
      navigate("/login");
      return;
    }

    // Pass structured data down to the unified checkout page
    navigate("/book", {
      state: {
        event: {
          name: eventItem.name,
          date: eventItem.date,
          payment: eventItem.pricePerPerson
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50/60 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Block Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-xs font-black tracking-wide uppercase mb-3"
          >
            <Sparkles size={12} /> Seasonal Festivities Deck
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4"
          >
            Upcoming Experiences
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-sm md:text-base leading-relaxed"
          >
            Secure entry passes to highly anticipated regional festivals, cultural showcases, and guided group outings happening across the city.
          </motion.p>
        </div>

        {/* Responsive Events Deck Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {events.map((event, index) => (
            <motion.div
              key={event.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden flex flex-col group hover:shadow-2xl transition-all duration-300"
            >
              {/* Event Image Banner with Dynamic Price Badge */}
              <div className="h-48 w-full bg-gray-100 relative overflow-hidden">
                <img
                  src={event.image}
                  alt={event.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-4 right-4 bg-gray-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-white font-black text-sm shadow-md border border-white/10">
                  ₹{event.pricePerPerson} <span className="text-[10px] text-gray-400 font-medium">/ pass</span>
                </div>
              </div>

              {/* Information Body Block */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-black text-gray-900 mb-2 tracking-tight group-hover:text-indigo-600 transition-colors">
                  {event.name}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-5 line-clamp-3 flex-1">
                  {event.description}
                </p>

                {/* Metadata Field Deck */}
                <div className="space-y-2.5 text-xs font-semibold text-gray-600 pt-4 border-t border-gray-50 mb-6">
                  <div className="flex items-center gap-2.5">
                    <Calendar size={14} className="text-indigo-500 shrink-0" />
                    <span className="text-gray-800">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock size={14} className="text-indigo-500 shrink-0" />
                    <span className="text-gray-700">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin size={14} className="text-indigo-500 shrink-0" />
                    <span className="text-gray-700 truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Users size={14} className="text-indigo-500 shrink-0" />
                    <span className="text-indigo-600 bg-indigo-50/60 px-2 py-0.5 rounded-md text-[11px]">
                      {event.capacity}
                    </span>
                  </div>
                </div>

                {/* Navigation Routing Action Button */}
                <Button
                  onClick={() => handleRegistrationRedirect(event)}
                  className="w-full bg-gray-900 hover:bg-indigo-600 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider shadow-md"
                >
                  <Ticket size={14} /> Book Event Tickets <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Events;