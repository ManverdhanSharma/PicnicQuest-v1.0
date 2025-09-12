import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Package,
  Star,
  Info,
  Calendar,
  Utensils,
  PartyPopper,
  User
} from "lucide-react";

// 🔐 Mock auth (replace with real logic or context)
const isAuthenticated = true; // Replace this with actual auth logic

function Navbar() {
  const location = useLocation();

  const links = [
    { to: "/", label: "Home" },
    { to: "/spots", label: "Spots", icon: MapPin },
    { to: "/packages", label: "Packages", icon: Package },
    { to: "/recommendations", label: "Food & Drinks", icon: Utensils },
    { to: "/events", label: "Events", icon: PartyPopper },
    { to: "/reviews", label: "Reviews", icon: Star },
    { to: "/about", label: "About", icon: Info },
    { to: "/planner", label: "Trip Planner", icon: Calendar },
  ];

  // 👉 Conditionally add Profile link if authenticated
  if (isAuthenticated) {
    links.push({ to: "/profile", label: "Profile", icon: User });
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-primary">
            Chennai Picnics
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex space-x-8 items-center">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="relative flex items-center space-x-1 text-gray-600 hover:text-primary transition-colors"
              >
                {link.icon && <link.icon className="w-4 h-4" />}
                <span>{link.label}</span>
                {location.pathname === link.to && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Login/Signup Buttons */}
          {!isAuthenticated && (
            <div className="hidden md:flex space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-full hover:bg-primary-dark transition"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
