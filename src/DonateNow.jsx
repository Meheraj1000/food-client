// DonateFood.jsx
import React, { useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { motion } from "framer-motion";

const DonateNow = () => {
  const [foodName, setFoodName] = useState("");
  const [foodImage, setFoodImage] = useState("");
  const [foodQuantity, setFoodQuantity] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [isNew, setIsNew] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!foodName || !foodQuantity || !pickupLocation || !expiryDate) {
      alert("Please fill all required fields!");
      return;
    }

    // Simulate submission
    console.log({
      foodName,
      foodImage,
      foodQuantity,
      pickupLocation,
      expiryDate,
      additionalNotes,
      isNew,
    });

    setSuccess(true);

    // Reset form
    setFoodName("");
    setFoodImage("");
    setFoodQuantity("");
    setPickupLocation("");
    setExpiryDate("");
    setAdditionalNotes("");
    setIsNew(false);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
      <NavBar />
      <div className="max-w-3xl mx-auto py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/30 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-lg"
        >
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Donate Food
          </h1>

          {success && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-green-100 text-green-800 px-4 py-3 rounded-md mb-4 text-center font-semibold"
            >
              Thank you! Your food donation has been submitted.
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Food Name"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />

            <input
              type="url"
              placeholder="Food Image URL"
              value={foodImage}
              onChange={(e) => setFoodImage(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="number"
              placeholder="Quantity"
              value={foodQuantity}
              onChange={(e) => setFoodQuantity(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />

            <input
              type="text"
              placeholder="Pickup Location"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />

            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />

            <textarea
              placeholder="Additional Notes"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isNew}
                onChange={(e) => setIsNew(e.target.checked)}
                className="accent-indigo-500"
              />
              Mark as New
            </label>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-semibold shadow-lg transition"
            >
              Submit Donation
            </motion.button>
          </form>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default DonateNow;
