import React, { useState } from 'react';
import NavBar from './NavBar';
import { useAuth } from './AutProvider';
import axios from 'axios';
import Footer from './Footer';

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

    // Add logged-in user's details to form data
    const foodData = {
      ...formData,
      donatorName: user.displayName || "Anonymous",
      donatorEmail: user.email,
      donatorImage: user.photoURL || "",
    };

    try {
      const response = await axios.post("http://localhost:3000/food", foodData);
      if (response.data.insertedId) {
        alert("Food added successfully!");
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
    }
  };
    return (
        <>
        <NavBar></NavBar>
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Food</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Food Name:</label>
          <input
            type="text"
            name="foodName"
            value={formData.foodName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Food Image URL:</label>
          <input
            type="text"
            name="foodImage"
            value={formData.foodImage}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Food Quantity:</label>
          <input
            type="text"
            name="foodQuantity"
            value={formData.foodQuantity}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Pickup Location:</label>
          <input
            type="text"
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Expired Date/Time:</label>
          <input
            type="datetime-local"
            name="expiredDateTime"
            value={formData.expiredDateTime}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Additional Notes:</label>
          <textarea
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Food
        </button>
      </form>
    </div>
    <Footer></Footer>
        </>
    );
};

export default AddFood;