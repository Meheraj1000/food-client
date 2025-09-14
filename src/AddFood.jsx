import React, { useState } from "react";
import NavBar from "./NavBar";
import { useAuth } from "./AutProvider";
import axios from "axios";
import Footer from "./Footer";
import { Image, MapPin, Calendar, FileText, Package } from "lucide-react";

const AddFood = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    foodName: "",
    foodImage: "",
    foodQuantity: "",
    pickupLocation: "",
    expiredDateTime: "",
    additionalNotes: "",
    foodStatus: "available",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You need to be logged in to add food.");
      return;
    }

    const foodData = {
      ...formData,
      donatorName: user.displayName || "Anonymous",
      donatorEmail: user.email,
      donatorImage: user.photoURL || "",
    };

    try {
      setLoading(true);
      const response = await axios.post(
        "https://meheraj.vercel.app/food",
        foodData
      );
      if (response.data.insertedId) {
        alert("🎉 Food added successfully!");
        setFormData({
          foodName: "",
          foodImage: "",
          foodQuantity: "",
          pickupLocation: "",
          expiredDateTime: "",
          additionalNotes: "",
          foodStatus: "available",
        });
      }
    } catch (error) {
      console.error(error);
      alert("Failed to add food.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
        <div className="max-w-3xl mx-auto bg-white/70 dark:bg-gray-900/80 backdrop-blur-lg shadow-2xl rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600 dark:text-indigo-400">
            🍲 Add New Food
          </h2>

          {/* Image Preview */}
          {formData.foodImage && (
            <div className="flex justify-center mb-6">
              <img
                src={formData.foodImage}
                alt="Food Preview"
                className="w-48 h-48 object-cover rounded-xl shadow-lg border"
              />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Food Name */}
            <div>
              <label className="block font-medium mb-1">Food Name</label>
              <div className="relative">
                <Package className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="foodName"
                  value={formData.foodName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  required
                  placeholder="e.g. Chicken Biryani"
                />
              </div>
            </div>

            {/* Food Image */}
            <div>
              <label className="block font-medium mb-1">Food Image URL</label>
              <div className="relative">
                <Image className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="foodImage"
                  value={formData.foodImage}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  required
                  placeholder="Paste image URL"
                />
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block font-medium mb-1">Food Quantity</label>
              <input
                type="number"
                name="foodQuantity"
                value={formData.foodQuantity}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
                placeholder="e.g. 5 plates"
              />
            </div>

            {/* Pickup Location */}
            <div>
              <label className="block font-medium mb-1">Pickup Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  required
                  placeholder="e.g. Dhanmondi 27, Dhaka"
                />
              </div>
            </div>

            {/* Expired Date/Time */}
            <div>
              <label className="block font-medium mb-1">Expired Date/Time</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="datetime-local"
                  name="expiredDateTime"
                  value={formData.expiredDateTime}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block font-medium mb-1">Additional Notes</label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
                  rows={3}
                  placeholder="Any extra details..."
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl shadow-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-60"
            >
              {loading ? "Adding..." : "🚀 Add Food"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddFood;
