import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/AuthContext"; 
import { Button } from "@/components/ui/button";
import { Calendar, Users, CreditCard, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

function Book() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Extract navigation parameters safely
  const eventInfo = location.state?.event || {};
  const BASE_PRICE = eventInfo.payment || 500;

  // Form State initialized safely
  const [form, setForm] = useState({
    name: user?.name || "",
    date: eventInfo.date || "",
    people: 1,
    payment: BASE_PRICE,
    eventName: eventInfo.name || "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // FIX: Force form updates whenever the router navigation state changes
  useEffect(() => {
    if (location.state?.event) {
      const updatedEvent = location.state.event;
      setForm({
        name: user?.name || "",
        date: updatedEvent.date || "",
        people: 1,
        payment: updatedEvent.payment || BASE_PRICE,
        eventName: updatedEvent.name || "",
      });
    }
  }, [location.state, user]);

  // Auth Guard protection
  useEffect(() => {
    if (!user) {
      setError("Authentication required. Redirecting to login...");
      const timer = setTimeout(() => navigate("/login"), 2000);
      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setForm((prevForm) => {
      const updatedForm = { ...prevForm, [name]: value };
      
      // Dynamic automated entry price multiplication 
      if (name === "people") {
        const headcount = Math.max(1, parseInt(value) || 1);
        updatedForm.payment = headcount * BASE_PRICE;
      }
      return updatedForm;
    });

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name || !form.date || !form.people || !form.payment) {
      setError("Please fill out all fields before submitting.");
      return;
    }

    try {
      const requestData = {
        ...form,
        people: Number(form.people),
        payment: Number(form.payment),
        username: user?.username,
      };

      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3002";

      const response = await fetch(`${API_URL}/book-picnic`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message || "Booking confirmed successfully!");
        setForm({
          name: "",
          date: "",
          people: 1,
          payment: BASE_PRICE,
          eventName: "",
        });
        setTimeout(() => navigate("/"), 2000);
      } else {
        setError(data.message || "Booking failed.");
      }
    } catch (err) {
      setError("Failed to connect to the booking server.");
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 flex items-center justify-center bg-gray-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl border border-gray-100"
      >
        <button 
          type="button"
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition mb-6"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <h2 className="text-3xl font-black mb-2 text-gray-900 tracking-tight text-center">Confirm Booking</h2>
        <p className="text-sm text-gray-400 text-center mb-6">Complete entry details for your path clearance</p>
        
        {form.eventName && (
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 text-center border border-blue-100/50">
            <span className="text-xs uppercase tracking-wider font-bold text-indigo-600 block mb-0.5">Selected Destination</span>
            <div className="text-xl font-black text-gray-900">{form.eventName}</div>
          </div>
        )}

        {success && (
          <div className="mb-4 flex items-center gap-2 p-3.5 bg-green-50 text-green-700 rounded-xl border border-green-200 text-sm font-medium">
            <CheckCircle size={18} className="shrink-0" />
            <span>{success}</span>
          </div>
        )}
        {error && (
          <div className="mb-4 flex items-center gap-2 p-3.5 bg-red-50 text-red-700 rounded-xl border border-red-200 text-sm font-medium">
            <AlertCircle size={18} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-gray-500" htmlFor="name">Your Name</label>
            <input
              className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition font-medium text-sm"
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5" htmlFor="date">
              <Calendar size={14} className="text-gray-400" /> Target Date
            </label>
            <input
              className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition font-medium text-sm"
              type="date"
              id="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5" htmlFor="people">
                <Users size={14} className="text-gray-400" /> Headcount
              </label>
              <input
                className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition font-medium text-sm"
                type="number"
                id="people"
                name="people"
                value={form.people}
                onChange={handleChange}
                min="1"
                required
              />
            </div>

            <div>
              <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5" htmlFor="payment">
                <CreditCard size={14} className="text-gray-400" /> Pass Price (₹)
              </label>
              <input
                className="w-full border border-gray-200 bg-gray-50 px-4 py-3 rounded-xl font-bold text-gray-700 text-sm focus:outline-none cursor-not-allowed"
                type="number"
                id="payment"
                name="payment"
                value={form.payment}
                readOnly
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-indigo-100 transition-all"
          >
            Confirm & Secure Pass
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

export default Book;