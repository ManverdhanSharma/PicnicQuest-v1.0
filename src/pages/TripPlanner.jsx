import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"; 
import { Calendar, Package, ClipboardList, Sparkles, Briefcase, Calculator, Trash2, CheckSquare } from "lucide-react";

function TripPlanner() {
  const { toast } = useToast();
  
  // Persistent local states loaded from system cache tracking
  const [selectedItems, setSelectedItems] = useState(() => {
    const saved = localStorage.getItem("current_blueprint");
    return saved ? JSON.parse(saved) : { package: "", date: "", headcount: 1 };
  });

  const [savedTrips, setSavedTrips] = useState(() => {
    const saved = localStorage.getItem("trips");
    return saved ? JSON.parse(saved) : [];
  });

  const [packingList, setPackingList] = useState([
    { id: 1, name: "Reusable Water Bottle", checked: false, tier: "essentials" },
    { id: 2, name: "UV Sunscreen Protection", checked: false, tier: "essentials" },
    { id: 3, name: "Wide-brim Hat or Cap", checked: false, tier: "essentials" },
    { id: 4, name: "Comfortable Walking Shoes", checked: false, tier: "essentials" },
    { id: 5, name: "Digital Camera / Smartphone", checked: false, tier: "gear" },
    { id: 6, name: "High-energy Snacks", checked: false, tier: "essentials" },
    { id: 7, name: "Compact First-Aid Kit", checked: false, tier: "safety" },
    { id: 8, name: "Fully Charged Power Bank", checked: false, tier: "gear" },
    { id: 9, name: "Physical Cash (Local Vendors)", checked: false, tier: "safety" },
    { id: 10, name: "Government ID Proof Copy", checked: false, tier: "safety" }
  ]);

  // Sync working drafts directly to prevent cross-tab refresh data loss
  useEffect(() => {
    localStorage.setItem("current_blueprint", JSON.stringify(selectedItems));
  }, [selectedItems]);

  useEffect(() => {
    localStorage.setItem("trips", JSON.stringify(savedTrips));
  }, [savedTrips]);

  // Pricing Matrix Config Map
  const packagePrices = {
    basic: { name: "Basic Explorer", rate: 999 },
    heritage: { name: "Heritage Special", rate: 2499 },
    premium: { name: "Premium Experience", rate: 4999 }
  };

  const currentPackageInfo = packagePrices[selectedItems.package];
  const totalCost = currentPackageInfo ? currentPackageInfo.rate * selectedItems.headcount : 0;

  // Checklist handler counters
  const completedItemsCount = packingList.filter(t => t.checked).length;
  const packingProgressPercent = Math.round((completedItemsCount / packingList.length) * 100);

  const togglePackingItem = (id) => {
    setPackingList(prev => prev.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const handleSaveTrip = () => {
    if (!selectedItems.date || !selectedItems.package) {
      toast({
        variant: "destructive",
        title: "Configuration Incomplete",
        description: "Please assign a targeted calendar execution date and base tour package.",
      });
      return;
    }

    const brandNewTripRecord = {
      id: Date.now(),
      ...selectedItems,
      packageName: packagePrices[selectedItems.package].name,
      estimatedCost: totalCost,
      timestamp: new Date().toLocaleDateString()
    };

    setSavedTrips(prev => [brandNewTripRecord, ...prev]);
    
    // Clear out current primary draft selection
    setSelectedItems({ package: "", date: "", headcount: 1 });
    
    toast({
      title: "Itinerary Secured!",
      description: "Your structured route draft has been indexed successfully.",
    });
  };

  const handleDeleteSavedTrip = (id) => {
    setSavedTrips(prev => prev.filter(t => t.id !== id));
    toast({
      title: "Record Purged",
      description: "The specified custom travel block was dropped from local indexing storage.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50/60 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Block Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-xs font-black tracking-wide uppercase mb-3">
            <Sparkles size={12} /> Interactive Travel Architect
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-3">
            Blueprint Your Journey
          </h1>
          <p className="text-gray-500 text-sm">
            Simulate financial tier projections, coordinate essential pack tracking assets, and structure robust route frameworks prior to completing checkout gates.
          </p>
        </div>

        {/* Primary Functional Control Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left Panel: Parameters Setup Form */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-4 bg-white rounded-3xl p-6 border border-gray-100 shadow-xl space-y-6"
          >
            <h2 className="text-lg font-black text-gray-900 tracking-tight flex items-center gap-2 pb-3 border-b border-gray-50">
              <Calendar className="w-5 h-5 text-indigo-600" /> Parameter Matrix
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block mb-1.5 text-[11px] font-black uppercase tracking-wider text-gray-400">Target Date</label>
                <input
                  type="date"
                  value={selectedItems.date || ""}
                  onChange={(e) => setSelectedItems(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition font-medium text-sm text-gray-800"
                />
              </div>

              <div>
                <label className="block mb-1.5 text-[11px] font-black uppercase tracking-wider text-gray-400">Tier Package Select</label>
                <select
                  value={selectedItems.package || ""}
                  onChange={(e) => setSelectedItems(prev => ({ ...prev, package: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-200 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition font-medium text-sm text-gray-800"
                >
                  <option value="">Select a package tier...</option>
                  <option value="basic">Basic Explorer — ₹999</option>
                  <option value="heritage">Heritage Special — ₹2499</option>
                  <option value="premium">Premium Experience — ₹4999</option>
                </select>
              </div>

              <div>
                <label className="block mb-1.5 text-[11px] font-black uppercase tracking-wider text-gray-400">Total Group Headcount</label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={selectedItems.headcount || 1}
                  onChange={(e) => setSelectedItems(prev => ({ ...prev, headcount: Math.max(1, parseInt(e.target.value, 10) || 1) }))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition font-black text-sm text-gray-800"
                />
              </div>
            </div>

            {/* Dynamic Cost Projection Component Widget */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-gray-900 to-indigo-950 text-white shadow-inner space-y-2">
              <div className="flex items-center justify-between text-[10px] font-bold text-indigo-300 uppercase tracking-widest">
                <span className="flex items-center gap-1"><Calculator size={12} /> Live Cost Ledger</span>
                <span>INR Base Metrics</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-gray-300 font-medium">Estimated Total:</span>
                <span className="text-2xl font-black tracking-tight text-white">₹{totalCost.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <Button onClick={handleSaveTrip} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition text-xs uppercase tracking-widest shadow-md">
              Index Itinerary Sheet
            </Button>
          </motion.div>

          {/* Right Panel: Interactive Smart Packing Module Deck */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-8 bg-white rounded-3xl p-6 border border-gray-100 shadow-xl flex flex-col justify-between self-stretch"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-gray-50 mb-6">
                <h2 className="text-lg font-black text-gray-900 tracking-tight flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-indigo-600" /> Smart Gear Checklist
                </h2>
                
                {/* Visual Progress percentage tracking node metrics */}
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-xl border border-gray-100">
                  <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Ready State:</span>
                  <span className="text-xs font-black text-indigo-600">{packingProgressPercent}%</span>
                  <div className="w-16 bg-gray-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full transition-all duration-300" style={{ width: `${packingProgressPercent}%` }} />
                  </div>
                </div>
              </div>

              {/* Grid map array layout deck list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {packingList.map((item) => (
                  <label 
                    key={item.id} 
                    className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer select-none transition-all duration-150 ${
                      item.checked 
                        ? "bg-emerald-50/40 border-emerald-200 text-gray-500" 
                        : "bg-gray-50/50 border-gray-100 hover:border-gray-200 text-gray-800"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => togglePackingItem(item.id)}
                      className="rounded-md border-gray-300 text-indigo-600 focus:ring-indigo-500/30 w-4 h-4 shrink-0 transition"
                    />
                    <span className={`text-xs font-semibold tracking-tight ${item.checked ? 'line-through text-gray-400' : ''}`}>
                      {item.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-50 text-[11px] font-semibold text-gray-400 flex items-center gap-1.5">
              <CheckSquare size={14} className="text-emerald-500" /> Checked parameters auto-cache securely within current session modules.
            </div>
          </motion.div>
        </div>

        {/* Lower Section: Custom Saved Dynamic Cards Track Deck */}
        <div className="mt-12">
          <h2 className="text-xl font-black text-gray-900 tracking-tight mb-6 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-indigo-600" /> Formulated Draft Indexes ({savedTrips.length})
          </h2>

          {savedTrips.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-gray-200 p-8">
              <Package size={36} className="mx-auto text-gray-300 mb-2" />
              <p className="text-sm font-semibold text-gray-600">No Drafts Structured</p>
              <p className="text-xs text-gray-400 max-w-xs mx-auto mt-0.5">Adjust setup parameter matrices on the dashboard configuration deck and save entries to populate this segment block view.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {savedTrips.map((trip) => (
                  <motion.div
                    key={trip.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md relative group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-4 mb-3">
                        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                          {trip.packageName || "Custom Package"}
                        </span>
                        <button
                          onClick={() => handleDeleteSavedTrip(trip.id)}
                          className="text-gray-400 hover:text-rose-600 p-1 rounded-lg transition"
                          title="Purge Itinerary Record"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="space-y-1.5 mb-4 text-xs font-semibold text-gray-600">
                        <div className="text-gray-400 text-[10px] uppercase tracking-wider font-bold">Planned Metrics</div>
                        <div>Target Execution Date: <span className="text-gray-900 font-bold">{trip.date || "Not Scheduled"}</span></div>
                        <div>Assigned Attendee Headcount: <span className="text-gray-900 font-bold">{trip.headcount || 1} traveler(s)</span></div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-50 flex items-center justify-between text-xs font-bold">
                      <span className="text-gray-400">Cost Evaluation:</span>
                      {/* Fixed: Fallback protection applied below to bypass old array data formats */}
                      <span className="text-gray-900">₹{(trip.estimatedCost ?? 0).toLocaleString("en-IN")}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default TripPlanner;