import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "John Doe",
    image: "https://i.ibb.co/4gSkc5D/user1.png",
    feedback: "This platform has helped me share surplus food and reduce waste!",
    badge: "Top Contributor",
    rating: 5,
  },
  {
    name: "Jane Smith",
    image: "https://i.ibb.co/NxQ8VGC/user2.png",
    feedback: "I love how easy it is to find and request food in my area.",
    badge: "Verified",
    rating: 4,
  },
  {
    name: "Michael Brown",
    image: "https://i.ibb.co/TLP1rGM/user3.png",
    feedback: "A fantastic initiative for building a stronger community!",
    badge: "Community Star",
    rating: 5,
  },
];

const UserTestimonials = () => {
  return (
    <section className="my-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        What Our Users Say
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="relative p-6 rounded-2xl shadow-lg bg-white/20 backdrop-blur-md border border-white/30 hover:scale-105 hover:shadow-2xl transition-transform duration-500"
          >
            {/* Badge */}
            {testimonial.badge && (
              <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-semibold animate-pulse">
                {testimonial.badge}
              </span>
            )}

            {/* User Info */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {testimonial.name}
                </h3>
                <div className="flex gap-1 text-yellow-400 text-sm mt-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Feedback */}
            <p className="text-gray-700 dark:text-gray-200">{testimonial.feedback}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default UserTestimonials;