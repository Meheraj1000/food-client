import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FoodCard from "./FoodCard";

const AllFoodsCarousel = ({ foods }) => {
  const foodsData = foods || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCards(4);
        setIsLargeScreen(true);
      } else if (window.innerWidth >= 768) {
        setVisibleCards(3);
        setIsLargeScreen(false);
      } else if (window.innerWidth >= 640) {
        setVisibleCards(2);
        setIsLargeScreen(false);
      } else {
        setVisibleCards(1);
        setIsLargeScreen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isLargeScreen) return;
    const interval = setInterval(() => nextSlide(), 4000);
    return () => clearInterval(interval);
  }, [currentIndex, isLargeScreen]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % foodsData.length);
  };
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + foodsData.length) % foodsData.length);
  };

  if (!foodsData.length)
    return <p className="text-center py-10">No foods available.</p>;

  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < visibleCards; i++) {
      const index = (currentIndex + i) % foodsData.length;
      cards.push(foodsData[index]);
    }
    return cards;
  };

  return (
    <div className="relative w-full">
      {isLargeScreen ? (
        <div className="grid grid-cols-4 gap-6">
          {foodsData.map((food) => (
            <FoodCard key={food._id} food={food} />
          ))}
        </div>
      ) : (
        <div className="overflow-hidden relative">
          <div className="flex gap-4 transition-transform duration-500">
            {getVisibleCards().map((food) => (
              <motion.div
                key={food._id}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className={`flex-shrink-0 w-full sm:w-1/2 md:w-1/3`}
              >
                <FoodCard food={food} />
              </motion.div>
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-200 dark:bg-gray-700 p-2 rounded-full shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition z-10"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-200 dark:bg-gray-700 p-2 rounded-full shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition z-10"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default AllFoodsCarousel;
