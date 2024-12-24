import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AutProvider';

const FoodDatial = () => {
    // const { id } = useParams();
    // const navigate = useNavigate();
    // const { user } = useAuth();

    // const [food, setFood] = useState(null);
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const [notes, setNotes] = useState('');

    useEffect(() => {
        axios
            .get(`http://localhost:3000/food/${id}`)
            .then((res) => setFood(res.data))
            .catch((err) => console.error(err));
    }, [id]);

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
            await axios.post('http://localhost:3000/food-requests', requestData);
            await axios.put(`http://localhost:3000/food/${food._id}`, {
                foodStatus: 'requested',
            });

            alert('Request successfully submitted!');
            navigate('/my-requests');
        } catch (error) {
            console.error(error);
            alert('Failed to submit the request.');
        }
    };

    if (!food) return <p className="text-center mt-8">Loading...</p>;

    return (
        <>
            <NavBar></NavBar>
            <div className="flex flex-col items-center justify-center mt-10 px-4">
                <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
                    <h1 className="text-2xl font-semibold mb-4">{food.foodName}</h1>
                    <img
                        src={food.foodImage}
                        alt={food.foodName}
                        className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                    <p className="text-gray-700"><strong>Donator Name:</strong> {food.donatorName}</p>
                    <p className="text-gray-700"><strong>Donator Email:</strong> {food.donatorEmail}</p>
                    <p className="text-gray-700"><strong>Pickup Location:</strong> {food.pickupLocation}</p>
                    <p className="text-gray-700">
                        <strong>Expire Date:</strong> {new Date(food.expiredDateTime).toLocaleString()}
                    </p>
                    <p className="text-gray-700"><strong>Status:</strong> {food.foodStatus}</p>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-700"
                    >
                        Request
                    </button>
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                            <h2 className="text-xl font-semibold mb-4">Request Food</h2>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleRequest();
                                }}
                            >
                                <p className="text-gray-700"><strong>Food Name:</strong> {food.foodName}</p>
                                <p className="text-gray-700"><strong>Donator Email:</strong> {food.donatorEmail}</p>
                                <p className="text-gray-700"><strong>Your Email:</strong> {user.email}</p>
                                <textarea
                                    placeholder="Add your notes here"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg p-2 mt-2"
                                />
                                <div className="flex justify-end mt-4">
                                   
                                    <button
                                        type="submit"
                                        className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 mr-2"
                                    >
                                        Submit
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
        </>
    );
};

export default FoodDatial;