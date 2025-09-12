import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Home from "@/components/Home";
import Spots from "@/components/Spots";
import Packages from "@/components/Packages";
import About from "@/components/About";
import TripPlanner from "@/components/TripPlanner";
import Events from "@/components/Events";
import { Toaster } from "@/components/ui/toaster";
import Profile from "@/components/Profile";
import Reviews from "@/Reviews";
import LoginForm from "@/LoginForm";
import SignupForm from "@/SignupForm";
import Book from "@/Book";
import { AuthProvider, useAuth } from "@/AuthContext";

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
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
              <Route path="/" element={<Home />} />
              <Route path="/spots" element={<Spots />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/about" element={<About />} />
              <Route path="/planner" element={
                <ProtectedRoute>
                  <TripPlanner />
                </ProtectedRoute>
              } />
              <Route path="/events" element={<Events />} />
              <Route path="/book" element={
                <ProtectedRoute>
                  <Book />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignupForm />} />
            </Routes>
          </main>
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
