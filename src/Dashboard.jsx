import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PlusCircle, List, Heart, Utensils, Share2 } from "lucide-react";
import { useAuth } from "./AutProvider";

const Dashboard = () => {
  const { user } = useAuth();

  // Sample stats (later can fetch from API)
  const stats = [
    { title: "Total Foods", value: 12, icon: Utensils, color: "bg-green-500" },
    { title: "Requests", value: 8, icon: Heart, color: "bg-pink-500" },
    { title: "Shared Foods", value: 5, icon: Share2, color: "bg-blue-500" },
  ];

  const actions = [
    { title: "Add Food", path: "/add-food", icon: PlusCircle, color: "bg-indigo-500" },
    { title: "My Foods", path: "/manage-foods", icon: List, color: "bg-yellow-500" },
    { title: "Request Food", path: "/request-food", icon: Utensils, color: "bg-pink-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-6">
      <div className="container mx-auto">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white mb-8 text-center"
        >
          <h1 className="text-4xl font-bold">
            Welcome, {user?.displayName || "User"}!
          </h1>
          <p className="mt-2 opacity-90">
            Here's a summary of your activities and quick actions.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.3)" }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 flex flex-col items-center justify-center shadow border border-white/20 text-white"
              >
                <div className={`p-4 rounded-full mb-3 ${stat.color} bg-opacity-70`}>
                  <Icon size={32} />
                </div>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p className="opacity-80">{stat.title}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {actions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255,255,255,0.4)" }}
                className="bg-white/20 backdrop-blur-lg rounded-xl p-6 flex flex-col items-center justify-center shadow border border-white/20 text-white hover:shadow-lg transition"
              >
                <Link to={action.path} className="flex flex-col items-center justify-center w-full">
                  <div className={`p-4 rounded-full mb-3 ${action.color} bg-gradient-to-r from-indigo-400 to-indigo-600 shadow-lg`}>
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-semibold">{action.title}</h3>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
