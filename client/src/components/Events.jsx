
import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

function Events() {
  const events = [
    {
      name: "Chennai Food Festival",
      description: "Experience the best of South Indian cuisine with live cooking demonstrations and food stalls.",
      date: "2025-04-15",
      time: "10:00 AM - 10:00 PM",
      location: "Island Grounds, Chennai",
      capacity: "5000+ attendees",
      image: "https://images.unsplash.com/photo-1596451984027-b5d6ea0bbc5e"
    },
    {
      name: "Marina Beach Cultural Night",
      description: "Traditional dance performances and music shows under the stars.",
      date: "2025-04-20",
      time: "6:00 PM - 10:00 PM",
      location: "Marina Beach",
      capacity: "2000+ attendees",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7"
    },
    {
      name: "Heritage Walk",
      description: "Guided tour through historic Georgetown, exploring colonial architecture.",
      date: "2025-04-25",
      time: "7:00 AM - 10:00 AM",
      location: "Georgetown",
      capacity: "50 participants",
      image: "https://images.unsplash.com/photo-1626100134610-d0b6c5c4e534"
    },
    {
      name: "Mylapore Temple Festival",
      description: "Annual temple festival with traditional rituals and cultural programs.",
      date: "2025-05-01",
      time: "5:00 AM - 10:00 PM",
      location: "Kapaleeshwarar Temple",
      capacity: "10000+ attendees",
      image: "https://images.unsplash.com/photo-1582651957695-5506eb1f3bde"
    }
  ];

  return (
    <div className="py-12">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-12"
      >
        Upcoming Events in Chennai
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map((event, index) => (
          <motion.div
            key={event.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="h-48 relative">
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
              <p className="text-gray-600 mb-4">{event.description}</p>
              
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(event.date).toLocaleDateString("en-US", { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{event.capacity}</span>
                </div>
              </div>

              <Button className="w-full mt-6">Register Now</Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Events;
