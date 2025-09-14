import React, { useEffect, useState } from "react";
import { useAuth } from "./AutProvider";
import axios from "axios";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { motion, AnimatePresence } from "framer-motion";

const ManageMyFoods = () => {
  const { user } = useAuth();
  const [foods, setFoods] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (user) {
      axios
        .get(`https://meheraj.vercel.app/user-foods?email=${user.email}`)
        .then((res) => setFoods(res.data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this food?")) {
      try {
        await axios.delete(`https://meheraj.vercel.app/food/${id}`);
        setFoods(foods.filter((food) => food._id !== id));
        alert("Food deleted successfully!");
      } catch (error) {
        console.error(error);
        alert("Failed to delete food.");
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://meheraj.vercel.app/food/${selectedFood._id}`,
        selectedFood
      );
      setFoods(
        foods.map((food) =>
          food._id === selectedFood._id ? selectedFood : food
        )
      );
      setIsModalOpen(false);
      alert("Food updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update food.");
    }
  };

  const openUpdateModal = (food) => {
    setSelectedFood(food);
    setIsModalOpen(true);
  };

  // filter by search
  const filteredFoods = foods.filter((food) =>
    food.foodName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="container mx-auto mt-10 flex-1 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Manage My Foods 🍽️
        </h1>

        {/* Search bar */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search your foods..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-400"
          />
        </div>

        {/* Grid cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFoods.map((food) => (
            <motion.div
              key={food._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200"
            >
              <img
                src={food.foodImage || "https://via.placeholder.com/400x250"}
                alt={food.foodName}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 space-y-2">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {food.foodName}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  📍 {food.pickupLocation}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  ⏳ {new Date(food.expiredDateTime).toLocaleString()}
                </p>

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => openUpdateModal(food)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(food._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Update Modal */}
        <AnimatePresence>
          {isModalOpen && selectedFood && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-96 p-6 relative"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              >
                <h2 className="text-2xl font-semibold mb-4">Update Food</h2>
                <form onSubmit={handleUpdate} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Food Name</label>
                    <input
                      type="text"
                      value={selectedFood.foodName}
                      onChange={(e) =>
                        setSelectedFood({
                          ...selectedFood,
                          foodName: e.target.value,
                        })
                      }
                      className="w-full border rounded-lg p-2 mt-1 focus:ring focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Pickup Location
                    </label>
                    <input
                      type="text"
                      value={selectedFood.pickupLocation}
                      onChange={(e) =>
                        setSelectedFood({
                          ...selectedFood,
                          pickupLocation: e.target.value,
                        })
                      }
                      className="w-full border rounded-lg p-2 mt-1 focus:ring focus:ring-blue-400"
                    />
                  </div>
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="submit"
                      className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
};

export default ManageMyFoods;
