import React, { useEffect, useState } from 'react';
import { useAuth } from './AutProvider';
import axios from 'axios';
import NavBar from './NavBar';

const ManageMyFoods = () => {
    const { user } = useAuth();
  const [foods, setFoods] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:3000/user-foods?email=${user.email}`)
        .then((res) => setFoods(res.data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this food?')) {
      try {
        await axios.delete(`http://localhost:3000/food/${id}`);
        setFoods(foods.filter((food) => food._id !== id));
        alert('Food deleted successfully!');
      } catch (error) {
        console.error(error);
        alert('Failed to delete food.');
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/food/${selectedFood._id}`, selectedFood);
      setFoods(foods.map((food) => (food._id === selectedFood._id ? selectedFood : food)));
      setIsModalOpen(false);
      alert('Food updated successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to update food.');
    }
  };

  const openUpdateModal = (food) => {
    setSelectedFood(food);
    setIsModalOpen(true);
  };

    return (
        <div>
            <NavBar></NavBar>
            <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">Manage My Foods</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Food Name</th>
            <th className="border px-4 py-2">Pickup Location</th>
            <th className="border px-4 py-2">Expire Date</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food) => (
            <tr key={food._id} className="text-center">
              <td className="border px-4 py-2">{food.foodName}</td>
              <td className="border px-4 py-2">{food.pickupLocation}</td>
              <td className="border px-4 py-2">
                {new Date(food.expiredDateTime).toLocaleString()}
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => openUpdateModal(food)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(food._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-xl font-semibold mb-4">Update Food</h2>
            <form onSubmit={handleUpdate}>
              <label className="block mb-2">
                Food Name:
                <input
                  type="text"
                  value={selectedFood.foodName}
                  onChange={(e) =>
                    setSelectedFood({ ...selectedFood, foodName: e.target.value })
                  }
                  className="block w-full border border-gray-300 rounded-lg p-2 mt-1"
                />
              </label>
              <label className="block mb-2">
                Pickup Location:
                <input
                  type="text"
                  value={selectedFood.pickupLocation}
                  onChange={(e) =>
                    setSelectedFood({ ...selectedFood, pickupLocation: e.target.value })
                  }
                  className="block w-full border border-gray-300 rounded-lg p-2 mt-1"
                />
              </label>
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>

            
        </div>
    );
};

export default ManageMyFoods;