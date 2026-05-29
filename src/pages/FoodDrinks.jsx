import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { 
  Utensils, 
  Coffee, 
  ShoppingBag, 
  CheckCircle2, 
  Calculator, 
  Flame, 
  Clock, 
  PlusCircle, 
  MinusCircle, 
  Layers 
} from "lucide-react";

function FoodDrinks() {
  const { toast } = useToast();
  const [headcount, setHeadcount] = useState(1);
  const [selectedHamper, setSelectedHamper] = useState("beachside");
  const [addonQuantities, setAddonQuantities] = useState({});

  const hampers = {
    beachside: {
      name: "Marina Breeze Basket",
      tagline: "Light, refreshing coastal assortment optimal for beach climates.",
      ratePerHead: 349,
      estCalories: 650,
      items: ["Chilled Rose Milk", "Spiced raw mango slices", "Podhi idli skewers", "Mint-lime coolers"]
    },
    heritage: {
      name: "Mylapore Heritage Feast",
      tagline: "Authentic, premium South Indian legacy delicacies wrapped traditionally.",
      ratePerHead: 549,
      estCalories: 950,
      items: ["Filter Coffee Flask", "Mini ghee pongal blocks", "Medhu vada bites", "Traditional sweet boli"]
    },
    carnival: {
      name: "Santhome Elite Grill",
      tagline: "High-protein signature modern barbecue and continental finger fuel.",
      ratePerHead: 799,
      estCalories: 1200,
      items: ["Smoked paneer/chicken wraps", "Loaded peri-peri potato wedges", "Craft root beers", "Fudgy brownie boxes"]
    }
  };

  const addons = [
    { id: "filter_coffee", name: "Extra Filter Coffee Flask (Serves 4)", price: 180, calories: 120 },
    { id: "sundal", name: "Traditional Beach-style Corn Sundal Cup", price: 60, calories: 140 },
    { id: "tender_coconut", name: "Chilled Organic Tender Coconut Water", price: 80, calories: 45 },
    { id: "murukku", name: "Crunchy Madras Kai Murukku Packet", price: 45, calories: 210 }
  ];

  const currentHamperInfo = hampers[selectedHamper] || hampers.beachside;
  
  const baseHamperCost = currentHamperInfo.ratePerHead * headcount;
  const baseCalories = currentHamperInfo.estCalories * headcount;
  
  const addonsCost = addons.reduce((sum, item) => {
    const qty = addonQuantities[item.id] || 0;
    return sum + (item.price * qty);
  }, 0);

  const addonsCalories = addons.reduce((sum, item) => {
    const qty = addonQuantities[item.id] || 0;
    return sum + (item.calories * qty);
  }, 0);

  const totalCost = baseHamperCost + addonsCost;
  const totalCalories = baseCalories + addonsCalories;

  const handleQtyChange = (id, direction) => {
    setAddonQuantities(prev => {
      const currentQty = prev[id] || 0;
      let newQty = direction === "inc" ? currentQty + 1 : currentQty - 1;
      return { ...prev, [id]: Math.max(0, newQty) };
    });
  };

  const handleLockCatering = () => {
    const receiptPayload = {
      hamperId: selectedHamper,
      hamperName: currentHamperInfo.name,
      headcount,
      addonsDraft: addonQuantities,
      finalCostMetrics: totalCost
    };

    try {
      localStorage.setItem("catering_blueprint", JSON.stringify(receiptPayload));
    } catch (e) {
      console.warn("Storage access restricted by browser settings:", e);
    }

    toast({
      title: "Menu Module Staged!",
      description: `Provision package compiled for ${headcount} explorer(s) successfully.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50/60 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Block Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-100 text-amber-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-3">
            <Utensils size={12} /> Culinary Provisions Board
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-3">
            Food & Refreshments
          </h1>
          <p className="text-gray-500 text-sm">
            Configure premium, climate-insulated catering matrices managed dynamically by top verified neighborhood artisanal kitchens in Chennai.
          </p>
        </div>

        {/* Primary Layout Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Block: Hamper Selection Profiles */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-lg font-black text-gray-900 tracking-tight flex items-center gap-2 mb-4">
              <Layers className="w-5 h-5 text-amber-600" /> Step 1: Choose Base Hamper
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(hampers).map(([id, hamper]) => (
                <div
                  key={id}
                  onClick={() => setSelectedHamper(id)}
                  className={`bg-white border p-5 rounded-3xl cursor-pointer select-none transition-all relative flex flex-col justify-between ${
                    selectedHamper === id
                      ? "ring-2 ring-amber-500 border-transparent shadow-xl"
                      : "border-gray-100 shadow-sm hover:border-gray-200"
                  }`}
                >
                  {selectedHamper === id && (
                    <div className="absolute top-3 right-3 text-amber-600">
                      <CheckCircle2 size={18} />
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-black text-gray-900 tracking-tight mb-1">
                      {hamper.name}
                    </h3>
                    <p className="text-[11px] text-gray-400 font-medium leading-relaxed mb-4">
                      {hamper.tagline}
                    </p>
                  </div>

                  <div>
                    <div className="bg-gray-50 p-2.5 rounded-xl space-y-1 mb-4">
                      {hamper.items.map((foodItem, i) => (
                        <div key={i} className="text-[10px] font-semibold text-gray-600 flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-amber-400" /> {foodItem}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-baseline justify-between pt-2 border-t border-gray-50">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Rate Layout</span>
                      <span className="text-sm font-black text-gray-900">₹{hamper.ratePerHead}<span className="text-[10px] font-medium text-gray-400">/head</span></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Step 2: A-La-Carte Addons Section */}
            <div className="pt-6">
              <h2 className="text-lg font-black text-gray-900 tracking-tight flex items-center gap-2 mb-4">
                <Coffee className="w-5 h-5 text-amber-600" /> Step 2: Custom A-La-Carte Addons
              </h2>
              
              <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xl space-y-3">
                {addons.map((item) => {
                  const currentQty = addonQuantities[item.id] || 0;
                  return (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-2xl bg-gray-50/40 border border-gray-100/60 hover:border-gray-200 transition gap-4">
                      <div>
                        <h4 className="text-xs font-black text-gray-800 leading-tight">{item.name}</h4>
                        <span className="text-[10px] text-gray-400 font-semibold">₹{item.price} • +{item.calories} kcal</span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button 
                          onClick={() => handleQtyChange(item.id, "dec")}
                          className="text-gray-400 hover:text-amber-600 transition"
                        >
                          <MinusCircle size={18} />
                        </button>
                        <span className="w-6 text-center text-xs font-black text-gray-900">{currentQty}</span>
                        <button 
                          onClick={() => handleQtyChange(item.id, "inc")}
                          className="text-gray-400 hover:text-amber-600 transition"
                        >
                          <PlusCircle size={18} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Panel: Summary Ledger */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-gray-100 shadow-xl space-y-6 self-start lg:sticky lg:top-6">
            <h2 className="text-lg font-black text-gray-900 tracking-tight flex items-center gap-2 pb-3 border-b border-gray-50">
              <ShoppingBag className="w-5 h-5 text-amber-600" /> Provision Specs
            </h2>

            <div>
              <label className="block mb-1.5 text-[11px] font-black uppercase tracking-wider text-gray-400">Headcount Factor</label>
              <input
                type="number"
                min="1"
                max="50"
                value={headcount}
                onChange={(e) => setHeadcount(Math.max(1, parseInt(e.target.value, 10) || 1))}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition font-black text-sm text-gray-800"
              />
            </div>

            <div className="space-y-3 bg-gray-50 p-4 rounded-2xl border border-gray-100 text-xs font-semibold text-gray-600">
              <div className="flex justify-between">
                <span>Selected Hamper:</span>
                <span className="text-gray-900 font-black">{currentHamperInfo.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Base Servings:</span>
                <span className="text-gray-900 font-bold">{headcount} Servings</span>
              </div>
              
              <hr className="border-gray-200/60" />

              <div className="grid grid-cols-2 gap-2 pt-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                <div className="flex items-center gap-1 bg-white border border-gray-200/60 p-2 rounded-xl">
                  <Flame size={12} className="text-orange-500" />
                  <div>
                    <div className="leading-none text-gray-400">Total Yield</div>
                    <span className="text-xs text-gray-800 font-black tracking-tight">{totalCalories.toLocaleString()} kcal</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-white border border-gray-200/60 p-2 rounded-xl">
                  <Clock size={12} className="text-blue-500" />
                  <div>
                    <div className="leading-none text-gray-400">Fresh Lock</div>
                    <span className="text-xs text-gray-800 font-black tracking-tight">Insulated</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-gray-900 to-amber-950 text-white shadow-inner space-y-2">
              <div className="flex items-center justify-between text-[10px] font-bold text-amber-300 uppercase tracking-widest">
                <span className="flex items-center gap-1"><Calculator size={12} /> Culinary Ledger</span>
                <span>GST Inclusive</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-gray-300 font-medium">Estimated Cost:</span>
                <span className="text-2xl font-black tracking-tight text-white">₹{totalCost.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <Button onClick={handleLockCatering} className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-xl transition text-xs uppercase tracking-widest shadow-md">
              Stage Provision Receipt
            </Button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default FoodDrinks;