import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FoodCard from "./FoodCard";

const FoodCarousel = ({ foods, autoplay = true, interval = 3000 }) => {
  const [current, setCurrent] = useState(0);
  const length = foods.length;

  useEffect(() => {
    if (!autoplay) return;
    const slider = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, interval);
    return () => clearInterval(slider);
  }, [length, interval, autoplay]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + length) % length);

  return (
    <div className="relative w-full max-w-7xl mx-auto overflow-hidden">
      {/* Cards */}
      <div className="flex gap-4 relative">
        <AnimatePresence initial={false}>
          {foods.map((food, index) =>
            index === current ? (
              <motion.div
                key={food._id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
              >
                <FoodCard food={food} />
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-200 dark:bg-gray-700 p-2 rounded-full shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-200 dark:bg-gray-700 p-2 rounded-full shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default FoodCarousel;
