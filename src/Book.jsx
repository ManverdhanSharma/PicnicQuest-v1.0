import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/AuthContext"; // <-- use this if alias is set, else "./AuthContext"

function Book() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const eventInfo = location.state?.event || {};

  const [form, setForm] = useState({
    name: "",
    date: eventInfo.date || "",
    people: "",
    payment: eventInfo.payment || "",
    eventName: eventInfo.name || "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.name || !form.date || !form.people || !form.payment) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      const requestData = {
        ...form,
        people: Number(form.people),
        payment: Number(form.payment),
        username: user?.username,
      };

      const response = await fetch("http://localhost:3002/book-picnic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData)
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess(data.message);
        setForm({ ...form, name: "", people: "", payment: "" });
        setTimeout(() => navigate("/"), 2000);
      } else {
        setError(data.message || "Booking failed.");
      }
    } catch {
      setError("Failed to connect to server.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Book Your Spot</h2>
      {form.eventName && (
        <div className="mb-4 text-center text-lg font-semibold text-blue-700">
          {form.eventName}
        </div>
      )}
      {success && <div className="mb-4 text-green-600">{success}</div>}
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="name">Your Name</label>
          <input
            className="w-full border px-3 py-2 rounded"
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="date">Date</label>
          <input
            className="w-full border px-3 py-2 rounded"
            type="date"
            id="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="people">Number of People</label>
          <input
            className="w-full border px-3 py-2 rounded"
            type="number"
            id="people"
            name="people"
            value={form.people}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium" htmlFor="payment">Payment Amount (₹)</label>
          <input
            className="w-full border px-3 py-2 rounded"
            type="number"
            id="payment"
            name="payment"
            value={form.payment}
            onChange={handleChange}
            min="0"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-2 rounded font-semibold hover:bg-blue-800 transition"
        >
          Book Now
        </button>
      </form>
    </div>
  );
}

export default Book;
