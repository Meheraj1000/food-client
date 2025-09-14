import React, { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Edit3, LogOut, Heart, Utensils, Share2 } from "lucide-react";
import { useAuth } from "./AutProvider";

const Profile = () => {
  const { user, handleLogout } = useAuth();

  // Fake stats (later you can fetch from API)
  const [stats] = useState({
    likes: 25,
    requests: 12,
    sharedFoods: 8,
  });

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl bg-white/10 dark:bg-gray-800/40 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8"
      >
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative">
            <img
              src={
                user?.photoURL ||
                "https://i.ibb.co/2dq3WfP/default-avatar.png"
              }
              alt="profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <button className="absolute bottom-2 right-2 bg-indigo-600 text-white p-2 rounded-full shadow hover:bg-indigo-700 transition">
              <Camera size={18} />
            </button>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-white">
              {user?.displayName || "Anonymous User"}
            </h2>
            <p className="text-gray-200">{user?.email || "No email provided"}</p>
            <p className="text-sm text-gray-300 mt-1">
              Role: <span className="font-semibold">Food Donor</span>
            </p>

            {/* Buttons */}
            <div className="mt-4 flex justify-center md:justify-start gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-md"
              >
                <Edit3 size={16} className="inline mr-2" />
                Edit Profile
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold shadow-md hover:bg-red-600"
              >
                <LogOut size={16} className="inline mr-2" />
                Logout
              </motion.button>
            </div>
          </div>
        </div>

        {/* About Me */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-white mb-2">About Me</h3>
          <p className="text-gray-200 text-sm">
            Hi! I love sharing food with my community. Reducing food waste is my
            passion. Let’s make the world a better place together! 🌍🍲
          </p>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 p-4 rounded-xl shadow text-center text-white"
          >
            <Heart className="mx-auto text-pink-400 mb-2" size={28} />
            <p className="text-2xl font-bold">{stats.likes}</p>
            <p className="text-sm opacity-80">Total Likes</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 p-4 rounded-xl shadow text-center text-white"
          >
            <Utensils className="mx-auto text-green-400 mb-2" size={28} />
            <p className="text-2xl font-bold">{stats.requests}</p>
            <p className="text-sm opacity-80">Requests</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 p-4 rounded-xl shadow text-center text-white"
          >
            <Share2 className="mx-auto text-blue-400 mb-2" size={28} />
            <p className="text-2xl font-bold">{stats.sharedFoods}</p>
            <p className="text-sm opacity-80">Shared Foods</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
