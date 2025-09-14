import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div
      className="relative h-[85vh] flex items-center justify-center text-white"
      style={{
        backgroundImage:
           "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80')",
          // "url(https://i.ibb.co.com/JH2f6sT/istockphoto-1181460583-612x612.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-6"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          Share <span className="text-yellow-400">Food</span>,  
          Spread <span className="text-green-400">Smiles</span>
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto text-gray-200">
          Join a community of kind hearts. Reduce food waste, help those in need, and make every meal count.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <NavLink to="/available-foods">
            <button className="px-6 py-3 rounded-full bg-yellow-400 text-black font-semibold shadow-lg hover:shadow-yellow-500/50 hover:scale-105 transition-all">
              Explore Foods 🍲
            </button>
          </NavLink>
          <NavLink to="/donate-food">
            <button className="px-6 py-3 rounded-full bg-green-500 text-white font-semibold shadow-lg hover:shadow-green-500/50 hover:scale-105 transition-all">
              Donate Now ❤️
            </button>
          </NavLink>
        </div>

        {/* Stats Section */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="backdrop-blur-lg bg-white/10 p-6 rounded-xl shadow-md"
          >
            <h2 className="text-3xl font-bold text-yellow-300">500+</h2>
            <p className="text-sm text-gray-200">Meals Shared</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="backdrop-blur-lg bg-white/10 p-6 rounded-xl shadow-md"
          >
            <h2 className="text-3xl font-bold text-green-300">200+</h2>
            <p className="text-sm text-gray-200">Donors Joined</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="backdrop-blur-lg bg-white/10 p-6 rounded-xl shadow-md"
          >
            <h2 className="text-3xl font-bold text-blue-300">1K+</h2>
            <p className="text-sm text-gray-200">Happy Families</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Banner;
