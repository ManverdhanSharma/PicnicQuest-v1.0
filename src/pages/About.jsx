import React from "react";
import { motion } from "framer-motion";
import { Target, ShieldCheck, Award, Heart, Compass, Users2, HelpCircle } from "lucide-react";

function About() {
  const coreValues = [
    {
      icon: <Target className="w-6 h-6 text-indigo-600" />,
      title: "Our Mission",
      description: "To connect explorers with authentic, sustainable, and memorable outdoor experiences throughout Chennai's rich coastal ecosystem."
    },
    {
      icon: <Award className="w-6 h-6 text-indigo-600" />,
      title: "Local Expertise",
      description: "Over a decade of field mastery identifying safe, scenic, and legally compliant recreation spaces for seamless group itineraries."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-indigo-600" />,
      title: "Our Commitment",
      description: "Uncompromising premium guest support, structural park vetting transparency, and absolute gate clearance delivery."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50/60 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Decorative Badge Link */}
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
            <Compass size={12} className="animate-spin" style={{ animationDuration: '6s' }} /> Corporate Identity Profile
          </span>
        </div>

        {/* Dynamic Title */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black text-center text-gray-900 tracking-tight mb-16"
        >
          About PicnicQuest
        </motion.h1>

        {/* Hero Segment Matrix Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left Block Image Banner Overlay */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-5 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-3xl transform rotate-3 scale-102 opacity-10 blur-xl" />
            <div className="h-80 md:h-96 w-full rounded-3xl overflow-hidden shadow-2xl border border-white/40 relative">
              <img 
                alt="Chennai coastal landscape cityscape" 
                className="w-full h-full object-cover transform hover:scale-102 transition duration-500" 
                src="https://images.unsplash.com/photo-1585981150423-97444313aae9?auto=format&fit=crop&w=600&q=80" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/40 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Right Block Copy Description Panel */}
          <div className="lg:col-span-7 space-y-6 text-gray-600 text-base md:text-lg font-medium leading-relaxed">
            <p className="text-xl font-black text-gray-900 tracking-tight leading-snug">
              Welcome to PicnicQuest, your ultimate companion guide for charting paths, securing reservations, and discovering elite travel spaces inside the cultural capital of South India.
            </p>
            
            <p>
              We solve the common logistical frustrations of planning group outings. By mapping out certified picnic layouts, scheduling active festival timelines, and organizing fixed multi-day tour modules under one roof, we eliminate blind arrivals.
            </p>

            <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm flex gap-4 items-start">
              <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600 mt-1 shrink-0">
                <Users2 size={20} />
              </div>
              <div>
                <h4 className="text-sm font-black text-gray-900 uppercase tracking-wide mb-0.5">Tailored Itineraries</h4>
                <p className="text-xs text-gray-400 font-medium leading-normal">
                  Whether you are managing a solo retreat footprint, a family escape, or deep cultural exploration modules, our system standardizes entry data so you can focus entirely on making memories.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Value Propositions Split Grid Deck Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coreValues.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="bg-white border border-gray-100 p-6 rounded-3xl shadow-lg shadow-gray-100/40 flex flex-col items-center text-center group hover:border-indigo-500/30 transition duration-300"
            >
              <div className="p-3 bg-gray-50 group-hover:bg-indigo-50 group-hover:scale-105 rounded-2xl mb-4 transition duration-300">
                {value.icon}
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-2 tracking-tight">
                {value.title}
              </h3>
              <p className="text-gray-400 text-xs font-semibold leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Simple Interactive Trust Footer Section */}
        <div className="mt-20 border-t border-gray-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
          <div className="flex items-center gap-1.5">
            <Heart size={14} className="text-rose-500 fill-rose-100" /> Curated inside Chennai, TN
          </div>
          <div className="flex items-center gap-1">
            <HelpCircle size={14} className="text-gray-400" /> Need coordination support? contact@picnicquest.com
          </div>
        </div>

      </div>
    </div>
  );
}

export default About;