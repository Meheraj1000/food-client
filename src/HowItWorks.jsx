import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    id: 1,
    title: "Add Food",
    description: "Add surplus food to the platform and share with the community.",
    imgSrc: "https://i.ibb.co/9NpT5kL/step1.png",
  },
  {
    id: 2,
    title: "Browse & Request",
    description: "Browse available options and request food from others.",
    imgSrc: "https://i.ibb.co/GsNv2MR/step2.png",
  },
  {
    id: 3,
    title: "Connect & Pickup",
    description: "Connect and coordinate for pickup or delivery.",
    imgSrc: "https://i.ibb.co/TkXmTCn/step3.png",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="my-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        How It Works
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="relative p-6 rounded-2xl shadow-lg bg-white/20 backdrop-blur-md border border-white/30 hover:scale-105 hover:shadow-2xl transition-transform duration-500 cursor-pointer"
          >
            <div className="mb-4">
              <img
                src={step.imgSrc}
                alt={step.title}
                className="w-24 h-24 mx-auto animate-fadeIn"
              />
            </div>

            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold shadow-lg">
              {step.id}
            </div>

            <h3 className="text-xl font-semibold mt-8 mb-2 text-center">
              {step.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-center">
              {step.description}
            </p>

            {/* Animated Badge */}
            {index === 0 && (
              <span className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs animate-pulse">
                Popular
              </span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Step Progress Indicator */}
      <div className="flex justify-center mt-10 gap-3">
        {steps.map((_, i) => (
          <motion.div
            key={i}
            className="w-4 h-4 rounded-full bg-blue-300 dark:bg-blue-500"
            animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
          />
        ))}
      </div>

      <div className="text-center mt-12">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition duration-300 shadow-lg"
        >
          Get Started
        </motion.button>
      </div>
    </section>
  );
};

export default HowItWorks;
