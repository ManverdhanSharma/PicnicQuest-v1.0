
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

function Packages() {
  const packages = [
    {
      name: "Basic Explorer",
      price: "₹999",
      features: [
        "Half-day city tour",
        "Visit to Marina Beach",
        "Local street food tasting",
        "Professional guide"
      ]
    },
    {
      name: "Heritage Special",
      price: "₹2499",
      features: [
        "Full-day tour",
        "Mahabalipuram visit",
        "Traditional lunch",
        "Transport included",
        "Professional guide",
        "Monument entry fees"
      ]
    },
    {
      name: "Premium Experience",
      price: "₹4999",
      features: [
        "2-day comprehensive tour",
        "All major attractions",
        "Luxury transport",
        "4-star hotel stay",
        "All meals included",
        "Professional guide",
        "Evening cultural show"
      ]
    }
  ];

  return (
    <div className="py-12">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-12"
      >
        Tour Packages
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h3 className="text-2xl font-semibold mb-4">{pkg.name}</h3>
            <div className="text-4xl font-bold mb-6">{pkg.price}</div>
            <ul className="space-y-3 mb-8">
              {pkg.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full">Book Now</Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Packages;
