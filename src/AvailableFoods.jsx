import React, { useState } from "react";
import NavBar from "./NavBar";
import FoodCard from "./FoodCard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { Search, LayoutGrid, ListFilter } from "lucide-react";

const AvailableFoods = () => {
  const [columns, setColumns] = useState(3);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");

  const { data: foods = [], isLoading, isError } = useQuery({
    queryKey: ["foods"],
    queryFn: async () => {
      const response = await axios.get("https://meheraj.vercel.app/food");
      return response.data;
    },
  });

  if (isLoading) return <p className="text-center mt-10">⏳ Loading foods...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">❌ Something went wrong!</p>;

  // 🔍 Filter + Sort
  let filteredFoods = foods.filter((food) =>
    food.foodName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (sortOption === "expiring") {
    filteredFoods = [...filteredFoods].sort(
      (a, b) => new Date(a.expiredDateTime) - new Date(b.expiredDateTime)
    );
  } else if (sortOption === "newest") {
    filteredFoods = [...filteredFoods].reverse();
  }

  return (
    <>
      <NavBar />

      <div className="container mx-auto px-4 mt-8">
        {/* 🔍 Search & Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by food name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex items-center gap-4">
            {/* Sort */}
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none"
            >
              <option value="newest">Newest</option>
              <option value="expiring">Expiring Soon</option>
            </select>

            {/* Layout Toggle */}
            <button
              onClick={() => setColumns(columns === 4 ? 2 : columns + 1)}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg shadow hover:bg-gray-100"
            >
              <LayoutGrid size={18} /> {columns} Columns
            </button>
          </div>
        </div>

        {/* 🍲 Food Cards */}
        {filteredFoods.length > 0 ? (
          <motion.div
            layout
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${columns} gap-6`}
          >
            {filteredFoods.map((food) => (
              <motion.div
                key={food._id}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
                <FoodCard food={food} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center mt-20">
            <p className="text-gray-500 text-lg">😔 No foods found matching your search.</p>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default AvailableFoods;
