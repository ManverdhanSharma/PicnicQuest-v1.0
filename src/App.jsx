import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

import Home from "@/pages/Home";
import Spots from "@/pages/Spots";
import Packages from "@/pages/Packages";
import About from "@/pages/About";
import TripPlanner from "@/pages/TripPlanner";
import Events from "@/pages/Events";
import Profile from "@/pages/Profile";
import FoodDrinks from "@/pages/FoodDrinks"; 
import Reviews from "@/pages/Reviews";
import LoginForm from "@/LoginForm";
import SignupForm from "@/SignupForm";
import Book from "@/Book";

import {
  AuthProvider,
  useAuth,
} from "@/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Navbar />

          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />

              <Route
                path="/spots"
                element={<Spots />}
              />

              <Route
                path="/packages"
                element={<Packages />}
              />

              <Route
                path="/reviews"
                element={<Reviews />}
              />

              <Route
                path="/about"
                element={<About />}
              />

              <Route
                path="/events"
                element={<Events />}
              />

              {/* Direct Route Map for regular links */}
              <Route 
                path="/food-drinks" 
                element={<FoodDrinks />} 
              />

              {/* Added: Explicit Route mapping to fix the console fallback error */}
              <Route 
                path="/recommendations" 
                element={<FoodDrinks />} 
              />

              <Route
                path="/planner"
                element={
                  <ProtectedRoute>
                    <TripPlanner />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/book"
                element={
                  <ProtectedRoute>
                    <Book />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/login"
                element={<LoginForm />}
              />

              <Route
                path="/signup"
                element={<SignupForm />}
              />

              {/* Global Wildcard Catch-all Fallback: Prevents blank screen crashes */}
              <Route 
                path="*" 
                element={<Navigate to="/" replace />} 
              />
            </Routes>
          </main>

          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;