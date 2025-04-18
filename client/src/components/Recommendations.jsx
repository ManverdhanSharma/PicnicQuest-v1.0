
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, MapPin, Clock, Phone, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";

function Recommendations() {
  const [activeTab, setActiveTab] = useState("restaurants");

  const restaurants = [
    {
      name: "Saravana Bhavan",
      description: "Famous South Indian vegetarian restaurant chain known for authentic dishes.",
      cuisine: "South Indian",
      rating: 4.5,
      priceRange: "₹₹",
      timing: "6:00 AM - 11:00 PM",
      location: "Anna Nagar",
      contact: "+91 44 2628 3344",
      mustTry: ["Masala Dosa", "Filter Coffee", "Ghee Pongal"]
    },
    {
      name: "Murugan Idli Shop",
      description: "Popular for soft idlis and variety of chutneys.",
      cuisine: "South Indian",
      rating: 4.3,
      priceRange: "₹",
      timing: "7:00 AM - 10:00 PM",
      location: "T. Nagar",
      contact: "+91 44 2434 5555",
      mustTry: ["Idli", "Podi Dosa", "Sweet Pongal"]
    },
    {
      name: "Bombay Brasserie",
      description: "Modern Indian cuisine with a contemporary twist.",
      cuisine: "North Indian, Continental",
      rating: 4.6,
      priceRange: "₹₹₹",
      timing: "12:00 PM - 11:00 PM",
      location: "Phoenix Market City",
      contact: "+91 44 6666 7777",
      mustTry: ["Butter Chicken", "Biryani", "Kulfi"]
    }
  ];

  const streetFood = [
    {
      name: "Atho Man",
      description: "Famous Burmese street food stall.",
      specialty: "Atho (Burmese Noodles)",
      rating: 4.4,
      priceRange: "₹",
      timing: "4:00 PM - 10:00 PM",
      location: "Sowcarpet",
      mustTry: ["Atho", "Masala Noodles", "Mohinga"]
    },
    {
      name: "Karthik Sandwich",
      description: "Popular sandwich stall with unique combinations.",
      specialty: "Grilled Sandwiches",
      rating: 4.2,
      priceRange: "₹",
      timing: "3:00 PM - 11:00 PM",
      location: "Besant Nagar",
      mustTry: ["Cheese Sandwich", "Mushroom Sandwich", "Cold Coffee"]
    },
    {
      name: "Beach Sundal Corner",
      description: "Traditional beach snacks and sundal varieties.",
      specialty: "Sundal",
      rating: 4.3,
      priceRange: "₹",
      timing: "3:00 PM - 9:00 PM",
      location: "Marina Beach",
      mustTry: ["Peanut Sundal", "Masala Corn", "Mango Slice"]
    }
  ];

  return (
    <div className="py-12">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-12"
      >
        Food & Drink Recommendations
      </motion.h1>

      <div className="flex justify-center mb-8">
        <div className="flex space-x-4">
          <Button
            variant={activeTab === "restaurants" ? "default" : "outline"}
            onClick={() => setActiveTab("restaurants")}
          >
            Restaurants
          </Button>
          <Button
            variant={activeTab === "streetFood" ? "default" : "outline"}
            onClick={() => setActiveTab("streetFood")}
          >
            Street Food
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(activeTab === "restaurants" ? restaurants : streetFood).map((place, index) => (
          <motion.div
            key={place.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{place.name}</h3>
              <p className="text-gray-600 mb-4">{place.description}</p>

              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{place.rating}</span>
                  </div>
                  <span className="text-primary">{place.priceRange}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{place.timing}</span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{place.location}</span>
                </div>

                {place.contact && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{place.contact}</span>
                  </div>
                )}

                <div className="mt-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <Utensils className="w-4 h-4" />
                    Must Try
                  </h4>
                  <ul className="mt-2 list-disc list-inside">
                    {place.mustTry.map((item) => (
                      <li key={item} className="text-gray-600">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Recommendations;
