
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Calendar, MapPin, Package, List } from "lucide-react";

function TripPlanner() {
  const { toast } = useToast();
  const [selectedItems, setSelectedItems] = useState({
    spots: [],
    package: "",
    date: "",
  });

  const essentialItems = [
    "Water bottle",
    "Sunscreen",
    "Hat or cap",
    "Comfortable shoes",
    "Camera",
    "Light snacks",
    "First-aid kit",
    "Power bank",
    "Cash",
    "ID proof"
  ];

  const handleSaveTrip = () => {
    // Save to localStorage
    const trips = JSON.parse(localStorage.getItem("trips") || "[]");
    trips.push(selectedItems);
    localStorage.setItem("trips", JSON.stringify(trips));

    toast({
      title: "Trip Saved!",
      description: "Your trip details have been saved successfully.",
    });
  };

  return (
    <div className="py-12">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-12"
      >
        Plan Your Trip
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            Trip Details
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Select Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                onChange={(e) => setSelectedItems(prev => ({...prev, date: e.target.value}))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Select Package</label>
              <select
                className="w-full p-2 border rounded"
                onChange={(e) => setSelectedItems(prev => ({...prev, package: e.target.value}))}
              >
                <option value="">Choose a package</option>
                <option value="basic">Basic Explorer</option>
                <option value="heritage">Heritage Special</option>
                <option value="premium">Premium Experience</option>
              </select>
            </div>

            <Button onClick={handleSaveTrip} className="w-full">
              Save Trip
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <List className="w-6 h-6" />
            Essential Items
          </h2>

          <div className="space-y-2">
            {essentialItems.map((item, index) => (
              <div key={item} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`item-${index}`}
                  className="rounded border-gray-300"
                />
                <label htmlFor={`item-${index}`}>{item}</label>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default TripPlanner;
