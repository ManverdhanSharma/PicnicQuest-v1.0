import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/AuthContext";
import UserBadges from "@/components/UserBadges";
import { 
  User, ShieldCheck, Mail, Calendar, AlertCircle, LogIn, 
  Terminal, BarChart3, ShieldAlert, Zap 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  ResponsiveContainer, ComposedChart, Line, Area, XAxis, YAxis, 
  Tooltip, Legend, PieChart, Pie, Cell 
} from "recharts";

function Profile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("analytics");

  // Dynamic analytic hooks linked directly to your true database schemas
  const [chartData, setChartData] = useState([]);
  const [donutData, setDonutData] = useState([]);
  const [isChartsLoading, setIsChartsLoading] = useState(false);
  
  // Activity tracking state hooks
  const [auditLogs, setAuditLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 📡 PIPELINE 1 — Live Activity Fetch Pipeline
  useEffect(() => {
    if (!user?.username) return;

    setIsLoading(true);
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3002";

    fetch(`${API_URL}/activity/${user.username}`)
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.json();
      })
      .then((data) => {
        setAuditLogs(data);
      })
      .catch((err) => {
        console.error("Activity UI Fetch Error:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user]);

  // 📡 PIPELINE 2 — Live Business Analytics Processing Engine
  useEffect(() => {
    if (!user?.username) return;

    setIsChartsLoading(true);
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3002";

    fetch(`${API_URL}/analytics/${user.username}`)
      .then((res) => {
        if (!res.ok) throw new Error("Analytics stream failed");
        return res.json();
      })
      .then((data) => {
        setChartData(data.chartData);
        setDonutData(data.donutData);
      })
      .catch((err) => {
        console.error("Analytics Fetch Error:", err);
      })
      .finally(() => {
        setIsChartsLoading(false);
      });
  }, [user, activeTab]);

  const getInitial = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  const userRole = user?.role || "Explorer"; 
  const isSystemAdmin = userRole.toLowerCase() === "admin";

  return (
    <div className="min-h-screen bg-gray-50/40 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Profile Header Block */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-500 via-amber-500 to-emerald-500" />

          {user ? (
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mt-2">
              
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-gray-900 to-indigo-950 text-white font-black text-4xl flex items-center justify-center shadow-lg uppercase shrink-0 border border-gray-800">
                {getInitial(user.username)}
              </div>

              <div className="flex-1 text-center md:text-left space-y-4 w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1">
                      <h1 className="text-3xl font-black text-gray-900 tracking-tight">@{user.username}</h1>
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border border-emerald-100">
                        <ShieldCheck size={12} /> Connected
                      </span>
                      {isSystemAdmin && (
                        <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border border-rose-100">
                          <ShieldAlert size={12} /> Admin Mode
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 font-bold tracking-wide uppercase">
                      Identity Context Block: <span className="text-indigo-600">{userRole}</span> Node ID
                    </p>
                  </div>
                  
                  {/* Tab Toggles */}
                  <div className="flex bg-gray-100 p-1 rounded-xl self-center md:self-auto">
                    <button 
                      onClick={() => setActiveTab("analytics")}
                      className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition ${activeTab === "analytics" ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
                    >
                      <BarChart3 size={14} className="inline mr-1" /> Metrics
                    </button>
                    <button 
                      onClick={() => setActiveTab("activity")}
                      className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition ${activeTab === "activity" ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
                    >
                      <Terminal size={14} className="inline mr-1" /> Activity
                    </button>
                  </div>
                </div>

                <hr className="border-gray-100" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="flex items-center gap-3 text-sm font-medium text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100/60">
                    <Mail size={16} className="text-gray-400" />
                    <div className="text-left">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-none">Communication Endpoint</div>
                      <span className="text-xs font-bold text-gray-800">{user.email}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100/60">
                    <Calendar size={16} className="text-gray-400" />
                    <div className="text-left">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-none">Account Authority Creation</div>
                      <span className="text-xs font-bold text-gray-800">Secured Node Instance</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 flex flex-col items-center">
              <div className="p-3 bg-rose-50 rounded-2xl text-rose-600 mb-3 border border-rose-100">
                <AlertCircle size={28} />
              </div>
              <h3 className="text-lg font-black text-gray-900 tracking-tight mb-1">Authorization Context Empty</h3>
              <p className="text-xs text-gray-400 max-w-sm mx-auto mb-4 font-medium">
                Please verify credentials to pull system matrix records.
              </p>
              <Button onClick={() => window.location.href = "/login"} className="bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-xl transition flex items-center gap-1.5 shadow-md">
                <LogIn size={14} /> Initialize Sign In Gateway
              </Button>
            </div>
          )}
        </motion.div>

        {/* Workspace Panels */}
        {user && (
          <AnimatePresence mode="wait">
            {activeTab === "analytics" ? (
              <motion.div 
                key="analytics-deck"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                {/* Recharts Live Monthly Composite Area Graph */}
                <div className="lg:col-span-8 bg-white border border-gray-100 p-6 rounded-3xl shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-1">
                      <Zap size={12} className="fill-indigo-50" /> Live Interaction Tracker
                    </div>
                    <h2 className="text-xl font-black text-gray-900 tracking-tight mb-4">Monthly Engagement Metrics</h2>
                  </div>
                  
                  <div className="h-72 w-full text-xs font-semibold">
                    {isChartsLoading ? (
                      <div className="text-center text-gray-400 py-24 animate-pulse">Computing user metrics...</div>
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={chartData} margin={{ top: 10, right: -5, left: -15, bottom: 0 }}>
                          <XAxis dataKey="month" stroke="#9ca3af" tickLine={false} fontSize={10} />
                          <YAxis yAxisId="left" stroke="#6366f1" label={{ value: 'Bookings Count', angle: -90, position: 'insideLeft', offset: 10 }} tickLine={false} fontSize={10} />
                          <YAxis yAxisId="right" orientation="right" stroke="#f59e0b" label={{ value: 'Reviews Submitted', angle: 90, position: 'insideRight', offset: 10 }} tickLine={false} fontSize={10} />
                          {/* Change this inside the PieChart wrapper */}
<Tooltip 
  contentStyle={{ 
    background: "#111827", 
    borderRadius: "12px", 
    color: "#fff", 
    border: "none" 
  }}
  itemStyle={{ color: "#fff" }} // 👈 Force the list item text to be white
/>
                          <Legend wrapperStyle={{ fontSize: "11px", pt: "10px" }} />
                          <Area yAxisId="left" type="monotone" dataKey="Bookings" fill="#e0e7ff" stroke="#6366f1" strokeWidth={2.5} name="Active Bookings" />
                          <Line yAxisId="right" type="monotone" dataKey="Reviews" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} name="Feedback Reviews" />
                        </ComposedChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </div>

                {/* Recharts Categorical Pie Analysis Block */}
                <div className="lg:col-span-4 bg-white border border-gray-100 p-6 rounded-3xl shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-1">
                      <Zap size={12} /> Preference Analysis Engine
                    </div>
                    <h2 className="text-xl font-black text-gray-900 tracking-tight mb-4">Spot Type Breakdown</h2>
                  </div>

                  <div className="h-48 relative flex items-center justify-center">
                    {isChartsLoading ? (
                      <div className="text-gray-400 animate-pulse text-xs">Loading categories...</div>
                    ) : (
                      <>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie data={donutData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={4} dataKey="value">
                              {donutData.map((entry, idx) => (
                                <Cell key={`cell-${idx}`} fill={entry.color} />
                              ))}
                            </Pie>
                           {/* Change this inside the ComposedChart wrapper */}
<Tooltip 
  contentStyle={{ 
    background: "#111827", 
    borderRadius: "16px", 
    color: "#fff", 
    border: "none" 
  }} 
  itemStyle={{ color: "#fff" }} // 👈 Force the line/area values text to be white
/>
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute text-center pointer-events-none">
                          <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Explore</div>
                          <div className="text-[10px] text-indigo-500 font-black uppercase tracking-widest">Ratio</div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="space-y-2 text-xs font-bold text-gray-600 pt-4 border-t border-gray-50">
                    {donutData.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                          {item.name}
                        </span>
                        <span className="text-gray-900 font-black">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              /* CLEAN ARCHITECTURAL ACTIVITY TIMELINE LOOK (No AI Glows or Terminal Brackets) */
              <motion.div 
                key="activity-deck"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xl"
              >
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100 mb-6">
                  <Terminal size={20} className="text-gray-400" />
                  <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                    Activity Timeline
                  </h2>
                </div>

                {isLoading ? (
                  <div className="text-center text-gray-500 py-6 animate-pulse">
                    Fetching historical logs...
                  </div>
                ) : auditLogs.length === 0 ? (
                  <div className="text-center text-gray-400 py-6">
                    No runtime activity records found on this profile context.
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                    {auditLogs.map((log) => (
                      <div 
                        key={log._id || Math.random()} 
                        className="bg-gray-50 border border-gray-100/60 rounded-xl p-4 text-sm"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                          <span className="font-semibold text-gray-900">
                            {log.action}
                          </span>
                          <span className="text-xs text-gray-400">
                            {log.timestamp 
                              ? new Date(log.timestamp).toLocaleDateString("en-IN", {
                                  day: "numeric",
                                  month: "short",
                                  hour: "2-digit",
                                  minute: "2-digit"
                                }) 
                              : "TIME_UNKNOWN"
                            }
                          </span>
                        </div>
                        <p className="text-gray-600">
                          {log.details || "System event verified with default attributes."}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Global Gamified Badge Component Layer */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xl"
        >
          <UserBadges />
        </motion.div>

      </div>
    </div>
  );
}

export default Profile;