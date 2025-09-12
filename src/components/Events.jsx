import React, { useState } from "react"; // Added useState import
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Users, X } from "lucide-react"; // Added X icon for modal close button
import { Button } from "@/components/ui/button";
import { useAuth } from "@/AuthContext"; // Added import for authentication check

function Events() {
  const events = [
    {
      name: "Chennai Food Festival",
      description: "Experience the best of South Indian cuisine with live cooking demonstrations and food stalls.",
      date: "2025-04-15",
      time: "10:00 AM - 10:00 PM",
      location: "Island Grounds, Chennai",
      capacity: "5000+ attendees",
      image: "https://images.unsplash.com/photo-1596451984027-b5d6ea0bbc5e"
    },
    {
      name: "Marina Beach Cultural Night",
      description: "Traditional dance performances and music shows under the stars.",
      date: "2025-04-20",
      time: "6:00 PM - 10:00 PM",
      location: "Marina Beach",
      capacity: "2000+ attendees",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7"
    },
    {
      name: "Heritage Walk",
      description: "Guided tour through historic Georgetown, exploring colonial architecture.",
      date: "2025-04-25",
      time: "7:00 AM - 10:00 AM",
      location: "Georgetown",
      capacity: "50 participants",
      image: "https://images.unsplash.com/photo-1626100134610-d0b6c5c4e534"
    },
    {
      name: "Mylapore Temple Festival",
      description: "Annual temple festival with traditional rituals and cultural programs.",
      date: "2025-05-01",
      time: "5:00 AM - 10:00 PM",
      location: "Kapaleeshwarar Temple",
      capacity: "10000+ attendees",
      image: "https://images.unsplash.com/photo-1582651957695-5506eb1f3bde"
    }
  ];

  // ADDED: State variables for booking functionality
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    date: "",
    people: 1,
    payment: 500
  });
  const [bookingStatus, setBookingStatus] = useState({ success: "", error: "" });
  
  // ADDED: Get authentication status
  const { isAuthenticated } = useAuth();

  // ADDED: Function to handle opening the booking modal
  const handleOpenBooking = (event) => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      window.location.href = "/login";
      return;
    }
    
    setSelectedEvent(event);
    // Pre-fill form with event date
    setBookingForm({
      ...bookingForm,
      date: event.date
    });
    setIsBookingOpen(true);
  };

  // ADDED: Function to close the booking modal
  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setSelectedEvent(null);
    setBookingStatus({ success: "", error: "" });
  };

  // ADDED: Handle form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setBookingForm({
      ...bookingForm,
      [name]: value
    });
  };

  // ADDED: Handle booking form submission
  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!bookingForm.name || !bookingForm.date || !bookingForm.people) {
      setBookingStatus({ ...bookingStatus, error: "Please fill all required fields" });
      return;
    }
    
    try {
      // Submit to MongoDB using the backend API
      const response = await fetch("http://localhost:3002/book-picnic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: bookingForm.name,
          date: new Date(bookingForm.date),
          people: Number(bookingForm.people),
          payment: Number(bookingForm.payment),
          // Additional info (not in schema but useful for reference)
          eventName: selectedEvent.name
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setBookingStatus({ success: data.message, error: "" });
        // Reset form after successful submission
        setBookingForm({
          name: "",
          date: "",
          people: 1,
          payment: 500
        });
        
        // Close the form after 2 seconds
        setTimeout(() => {
          handleCloseBooking();
        }, 2000);
      } else {
        setBookingStatus({ success: "", error: data.message || "Failed to book event" });
      }
    } catch (error) {
      setBookingStatus({ success: "", error: "Network error. Please try again." });
    }
  };

  return (
    <div className="py-12">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-12"
      >
        Upcoming Events in Chennai
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map((event, index) => (
          <motion.div
            key={event.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="h-48 relative">
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
              <p className="text-gray-600 mb-4">{event.description}</p>
              
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(event.date).toLocaleDateString("en-US", { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{event.capacity}</span>
                </div>
              </div>

              {/* MODIFIED: Added onClick handler to Register button */}
              <Button 
                className="w-full mt-6" 
                onClick={() => handleOpenBooking(event)}
              >
                Register Now
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ADDED: Booking Modal */}
      {isBookingOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Book: {selectedEvent.name}</h2>
              <button 
                onClick={handleCloseBooking}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* ADDED: Status messages */}
            {bookingStatus.error && (
              <div className="mb-4 p-2 bg-red-50 text-red-500 rounded">
                {bookingStatus.error}
              </div>
            )}

            {bookingStatus.success && (
              <div className="mb-4 p-2 bg-green-50 text-green-500 rounded">
                {bookingStatus.success}
              </div>
            )}

            {/* ADDED: Booking form */}
            <form onSubmit={handleSubmitBooking}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="name">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={bookingForm.name}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="date">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={bookingForm.date}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="people">
                  Number of People
                </label>
                <input
                  type="number"
                  id="people"
                  name="people"
                  value={bookingForm.people}
                  onChange={handleFormChange}
                  min="1"
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-1" htmlFor="payment">
                  Payment Amount (₹)
                </label>
                <input
                  type="number"
                  id="payment"
                  name="payment"
                  value={bookingForm.payment}
                  onChange={handleFormChange}
                  min="500"
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>

              {/* ADDED: Form submission buttons */}
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseBooking}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Confirm Booking
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Events;
