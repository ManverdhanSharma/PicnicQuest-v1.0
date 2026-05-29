import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, ShieldCheck, Compass } from "lucide-react";

function Packages() {
  const navigate = useNavigate();

  const packages = [
    {
      name: "Basic Explorer",
      price: "999",
      tagline: "Ideal for solo travelers & quick weekend city escapes.",
      features: [
        "Half-day curated city tour",
        "Guided visit to Marina Beach",
        "Local street food tasting vouchers",
        "Certified professional bilingual guide"
      ],
      popular: false
    },
    {
      name: "Heritage Special",
      price: "2499",
      tagline: "Dive deep into regional history and premium coastal dining.",
      features: [
        "Full-day comprehensive cultural tour",
        "Dedicated Mahabalipuram historical visit",
        "Traditional organic South Indian lunch",
        "Air-conditioned luxury transport included",
        "All historical monument entry fees covered"
      ],
      popular: true
    },
    {
      name: "Premium Experience",
      price: "4999",
      tagline: "An elite, worry-free vacation package spanning across 48 hours.",
      features: [
        "2-day fully customized private tour",
        "VIP fast-track access to all major attractions",
        "Luxury private sedan with dedicated chauffeur",
        "4-star heritage hotel luxury stay",
        "All gourmet meals & local drinks included",
        "Exclusive evening cultural art show tickets"
      ],
      popular: false
    }
  ];

  const handleBookingRedirect = (pkg) => {
    navigate("/book", {
      state: {
        event: {
          name: pkg.name,
          payment: parseInt(pkg.price, 10),
          date: ""
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50/60 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Branding Intro */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-xs font-bold tracking-wide uppercase mb-3"
          >
            <Compass size={12} className="animate-spin duration-3000" /> Fixed Tier Itineraries
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4"
          >
            All-Inclusive Tour Packages
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-sm md:text-base"
          >
            Skip the planning headaches. Choose a professionally managed bundle featuring guaranteed passes, premium transport, and certified local hosting teams.
          </motion.p>
        </div>

        {/* Pricing Matrix Deck Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className={`bg-white rounded-3xl p-8 shadow-xl border relative flex flex-col transition-all duration-300 hover:shadow-2xl ${
                pkg.popular 
                  ? "border-indigo-500 ring-2 ring-indigo-500/10 lg:scale-105 z-10" 
                  : "border-gray-100"
              }`}
            >
              {/* Highlight Tag Condition */}
              {pkg.popular && (
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md flex items-center gap-1 whitespace-nowrap">
                  <Sparkles size={12} /> Most Popular Select
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">{pkg.name}</h3>
                <p className="text-gray-400 text-xs mt-1 leading-relaxed">{pkg.tagline}</p>
              </div>

              <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-gray-100">
                <span className="text-4xl font-black text-gray-900 tracking-tight">₹{pkg.price}</span>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">/ traveler</span>
              </div>

              {/* Feature Map Checklist */}
              <ul className="space-y-4 mb-8 flex-1">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-gray-600 leading-snug">
                    <Check className={`w-5 h-5 shrink-0 mt-0.5 ${pkg.popular ? "text-indigo-600" : "text-emerald-500"}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Functional Interactive Trigger Booking Route Link */}
              <Button 
                onClick={() => handleBookingRedirect(pkg)}
                className={`w-full py-6 rounded-2xl font-bold tracking-wide transition-all ${
                  pkg.popular 
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-100" 
                    : "bg-gray-900 hover:bg-indigo-950 text-white"
                }`}
              >
                Book Package Pass
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Guarantees Trust Banner footer */}
        <div className="mt-16 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-wrap gap-6 items-center justify-center text-xs font-bold text-gray-400 uppercase tracking-widest text-center">
          <div className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-indigo-500" /> 100% Free Cancellation Up To 24h Prior</div>
          <div className="hidden sm:block text-gray-200">|</div>
          <div className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-indigo-500" /> Verified Tourism Board Vendor</div>
        </div>

      </div>
    </div>
  );
}

export default Packages;