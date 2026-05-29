import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/AuthContext";
import {
  MapPin, Package, Star, Info, Calendar, Utensils, PartyPopper, User, LogOut, Menu, X
} from "lucide-react";

function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isAuthenticated = !!user;
  const [isOpen, setIsOpen] = useState(false); // 📱 Mobile menu state

  const links = [
    { to: "/", label: "Home" },
    { to: "/spots", label: "Spots", icon: MapPin },
    { to: "/packages", label: "Packages", icon: Package },
    { to: "/recommendations", label: "Food & Drinks", icon: Utensils },
    { to: "/events", label: "Events", icon: PartyPopper },
    { to: "/reviews", label: "Reviews", icon: Star },
    { to: "/planner", label: "Trip Planner", icon: Calendar },
    { to: "/about", label: "About", icon: Info },
  ];

  if (isAuthenticated) {
    links.push({ to: "/profile", label: "Profile", icon: User });
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-xl font-black tracking-tight text-gray-900">
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Chennai Picnics
          </span>
        </Link>

        {/* 🖥️ DESKTOP NAVIGATION (Hidden on screens smaller than XL) */}
        <nav className="hidden xl:flex items-center bg-gray-100/60 p-1.5 rounded-2xl border border-gray-200/20">
          {links.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-4 py-2 rounded-xl text-xs font-bold tracking-wide uppercase flex items-center gap-1.5 z-10 ${
                  isActive ? "text-gray-900" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {link.icon && <link.icon size={13} className={isActive ? "text-indigo-600" : "text-gray-400"} />}
                <span>{link.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="premium-nav-pill"
                    className="absolute inset-0 bg-white shadow-sm border border-gray-100 rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* 🖥️ DESKTOP AUTH BUTTONS (Hidden on Mobile) */}
        <div className="hidden xl:flex items-center gap-3">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="text-xs font-bold uppercase tracking-wider text-gray-700 px-3 py-2">Sign In</Link>
              <Link to="/signup" className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-gray-950 rounded-xl">Join Club</Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/profile" className="flex items-center gap-2 bg-gray-50 border px-3 py-1.5 rounded-xl text-xs font-bold text-gray-700">
                <span>@{user?.username?.split("@")[0]}</span>
              </Link>
              <button onClick={logout} className="p-2 text-gray-400 hover:text-rose-600"><LogOut size={16} /></button>
            </div>
          )}
        </div>

        {/* 📱 MOBILE HAMBURGER BUTTON (Hidden on Desktop) */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="xl:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* 📱 MOBILE DROPDOWN MENU PANEL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden border-t border-gray-100 bg-white overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1 max-h-[calc(100vh-5rem)] overflow-y-auto">
              {links.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsOpen(false)} // Close menu on click
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold tracking-wide uppercase transition-all ${
                      isActive ? "bg-indigo-50 text-indigo-600" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {link.icon && <link.icon size={16} />}
                    <span>{link.label}</span>
                  </Link>
                );
              })}
              
              <hr className="my-3 border-gray-100" />
              
              {/* Mobile Auth Actions */}
              {!isAuthenticated ? (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Link to="/login" onClick={() => setIsOpen(false)} className="py-3 text-center text-sm font-bold uppercase tracking-wider text-gray-700 bg-gray-50 rounded-xl">Sign In</Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)} className="py-3 text-center text-sm font-bold uppercase tracking-wider text-white bg-gray-950 rounded-xl">Join Club</Link>
                </div>
              ) : (
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-xl">
                  <span className="text-sm font-bold text-gray-700 pl-2">@{user?.username?.split("@")[0]}</span>
                  <button onClick={() => { logout(); setIsOpen(false); }} className="flex items-center gap-1 text-sm font-bold text-rose-600 bg-rose-50 px-3 py-2 rounded-lg"><LogOut size={14} /> Leave</button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;