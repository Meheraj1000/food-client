import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AutProvider';
import { Heart, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

const FoodDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [food, setFood] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState('');
  const [likes, setLikes] = useState(0);
  const [timeLeft, setTimeLeft] = useState('');

  // Fetch food data
  useEffect(() => {
    axios
      .get(`https://meheraj.vercel.app/food/${id}`)
      .then((res) => {
        setFood(res.data);
        setLikes(res.data.likes || 0);
      })
      .catch((err) => console.error(err));
  }, [id]);

  // Countdown timer
  useEffect(() => {
    if (!food) return;
    const interval = setInterval(() => {
      const expiry = new Date(food.expiredDateTime).getTime();
      const now = new Date().getTime();
      const diff = expiry - now;

      if (diff <= 0) {
        setTimeLeft('Expired');
        clearInterval(interval);
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [food]);

  const handleRequest = async () => {
    if (!user) {
      alert('Please log in to make a request.');
      return;
    }

    const requestData = {
      foodId: food._id,
      foodName: food.foodName,
      foodImage: food.foodImage,
      donatorName: food.donatorName,
      donatorEmail: food.donatorEmail,
      userEmail: user.email,
      requestDate: new Date().toISOString(),
      pickupLocation: food.pickupLocation,
      expiredDateTime: food.expiredDateTime,
      additionalNotes: notes,
    };

    try {
      await axios.post('https://meheraj.vercel.app/food-requests', requestData);
      await axios.put(`https://meheraj.vercel.app/food/${food._id}`, {
        foodStatus: 'requested',
      });

      alert('Request successfully submitted!');
      navigate('/my-requests');
    } catch (error) {
      console.error(error);
      alert('Failed to submit the request.');
    }
  };

  const handleLike = () => {
    setLikes(likes + 1);
    axios.put(`https://meheraj.vercel.app/food/${food._id}`, { likes: likes + 1 });
  };

  if (!food) return <p className="text-center mt-8 text-lg">Loading...</p>;

  return (
    <>
      <NavBar />
      <div className="max-w-5xl mx-auto mt-10 px-4 flex flex-col gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row gap-8 bg-white dark:bg-gray-800 shadow-2xl rounded-xl overflow-hidden"
        >
          {/* Food Image */}
          <div className="lg:w-1/2 w-full relative">
            <img
              src={food.foodImage}
              alt={food.foodName}
              className="w-full h-80 object-cover"
            />
            <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-lg font-semibold shadow-lg">
              {food.foodStatus}
            </div>
            <div className="absolute bottom-3 right-3 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg font-semibold shadow-lg">
              {timeLeft}
            </div>
          </div>

          {/* Food Info */}
          <div className="lg:w-1/2 w-full flex flex-col gap-4 p-6">
            <h1 className="text-3xl font-bold">{food.foodName}</h1>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Donator:</strong> {food.donatorName} ({food.donatorEmail})
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Pickup Location:</strong> {food.pickupLocation}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Requests:</strong> {food.requestsCount || 0}
            </p>

            {/* Like & Share Buttons */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleLike}
                className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition"
              >
                <Heart size={20} /> {likes}
              </button>
              <button
                onClick={() => navigator.share && navigator.share({ title: food.foodName })}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                <Share2 size={20} /> Share
              </button>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green-600 text-white py-2 px-6 rounded-lg mt-6 hover:bg-green-700 font-semibold transition"
            >
              Request Food
            </button>
          </div>
        </motion.div>

        {/* Request Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-96 p-6"
            >
              <h2 className="text-xl font-semibold mb-4">Request Food</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleRequest();
                }}
              >
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Food Name:</strong> {food.foodName}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Donator Email:</strong> {food.donatorEmail}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Your Email:</strong> {user.email}
                </p>
                <textarea
                  placeholder="Add your notes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 mt-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                <div className="flex justify-end mt-4 gap-2">
                  <button
                    type="submit"
                    className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
};

export default FoodDetail;
