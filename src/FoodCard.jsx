import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Share2, MessageCircle, Star } from "lucide-react";

const FoodCard = ({ food }) => {
  if (!food) return null;

  const {
    _id,
    foodName,
    foodImage,
    foodQuantity,
    pickupLocation,
    expiredDate,
    additionalNotes,
    foodStatus,
    isNew,
  } = food;

  const statusStyles = {
    available: "bg-green-500/20 text-green-400 border border-green-400/30",
    requested: "bg-yellow-500/20 text-yellow-400 border border-yellow-400/30",
    expired: "bg-red-500/20 text-red-400 border border-red-400/30",
  };

  const [likes, setLikes] = useState(0);
  const [rating, setRating] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [comments] = useState([
    "Looks delicious!",
    "Can I pick it up tomorrow?",
  ]);
  const [requestsCount] = useState(Math.floor(Math.random() * 10) + 1);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative rounded-2xl overflow-hidden 
      bg-white/10 dark:bg-gray-800/40 backdrop-blur-lg border border-white/20
      shadow-md hover:shadow-2xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative group">
        <img
          src={foodImage || "https://via.placeholder.com/400x250"}
          alt={foodName}
          className="w-full h-56 object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-105"
        />

        {/* New Badge */}
        {isNew && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 text-xs rounded-full font-semibold shadow-lg">
            New
          </span>
        )}

        {/* Hover Buttons */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition duration-300">
          <button
            onClick={() => setLikes(likes + 1)}
            className="flex items-center gap-1 bg-white/80 dark:bg-gray-700/80 px-3 py-1 rounded-full shadow hover:scale-110 transition"
          >
            <Heart size={16} className="text-pink-500" /> {likes}
          </button>
          <button
            onClick={() =>
              navigator.share && navigator.share({ title: foodName })
            }
            className="flex items-center gap-1 bg-white/80 dark:bg-gray-700/80 px-3 py-1 rounded-full shadow hover:scale-110 transition"
          >
            <Share2 size={16} className="text-blue-500" /> Share
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1 bg-white/80 dark:bg-gray-700/80 px-3 py-1 rounded-full shadow hover:scale-110 transition"
          >
            <MessageCircle size={16} className="text-green-500" />{" "}
            {comments.length}
          </button>
        </div>
      </div>

      {/* Food Info */}
      <div className="p-5 flex flex-col gap-2 text-gray-900 dark:text-gray-100">
        <h2 className="text-xl font-bold truncate">{foodName}</h2>
        <p className="text-sm opacity-80">📍 {pickupLocation}</p>
        <p className="text-sm opacity-80">⏳ Expires: {expiredDate}</p>
        {foodQuantity && (
          <p className="text-sm opacity-80">🍽 Quantity: {foodQuantity}</p>
        )}
        {additionalNotes && (
          <p className="text-sm opacity-80">📝 {additionalNotes}</p>
        )}

        {/* Status */}
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 
          ${statusStyles[foodStatus?.toLowerCase()] || "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"}`}
        >
          {foodStatus || "Unknown"}
        </span>

        {/* Rating */}
        <div className="flex items-center mt-2 gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={20}
              className={`cursor-pointer transition-colors ${
                star <= rating
                  ? "text-yellow-400"
                  : "text-gray-300 dark:text-gray-600"
              }`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>

        {/* Requests */}
        <p className="text-sm mt-1 opacity-80">
          🔔 Requests: {requestsCount}
        </p>

        {/* Button */}
        <Link to={`/food/${_id}`} className="mt-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-2 rounded-lg font-semibold text-white 
            bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
            hover:from-indigo-500 hover:to-pink-500 transition-all duration-500
            shadow-md hover:shadow-xl"
          >
            View Details
          </motion.button>
        </Link>

        {/* Comments */}
        {showComments && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-3 bg-gray-100/70 dark:bg-gray-700/70 p-3 rounded-lg max-h-36 overflow-y-auto"
          >
            {comments.length === 0 ? (
              <p className="text-sm opacity-70">No comments yet.</p>
            ) : (
              comments.map((comment, idx) => (
                <p
                  key={idx}
                  className="text-sm mb-1 text-gray-800 dark:text-gray-200"
                >
                  {comment}
                </p>
              ))
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default FoodCard;
