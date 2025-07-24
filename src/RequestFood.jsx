import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import { useAuth } from './AutProvider';
import axios from 'axios';

const RequestFood = () => {
    const { user } = useAuth();
    const [foodRequests, setFoodRequests] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      if (user) {
        axios
          .get(`https://meheraj.vercel.app/food-requests?email=${user.email}`)
          .then((res) => {
            setFoodRequests(res.data);
            setLoading(false);
          })
          .catch((err) => {
            console.error(err);
            setLoading(false);
          });
      }
    }, [user]);
  
    if (loading) return <p className="text-center mt-8">Loading...</p>;
  
    if (foodRequests.length === 0)
        return (
            <div>
              <NavBar />
              <p className="text-center mt-8">No food requests found!</p>
            </div>
          );
    return (
        <div>
            <NavBar></NavBar>
            <div className="container mx-auto px-4 mt-10">
        <h1 className="text-2xl font-semibold text-center mb-6">Your Food Requests</h1>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Donator Name</th>
              <th className="border border-gray-300 px-4 py-2">Pickup Location</th>
              <th className="border border-gray-300 px-4 py-2">Expire Date</th>
              <th className="border border-gray-300 px-4 py-2">Request Date</th>
              <th className="border border-gray-300 px-4 py-2">Additional Notes</th>
            </tr>
          </thead>
          <tbody>
            {foodRequests.map((request) => (
              <tr key={request._id}>
                <td className="border border-gray-300 px-4 py-2">{request.donatorName}</td>
                <td className="border border-gray-300 px-4 py-2">{request.pickupLocation}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(request.expiredDateTime).toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(request.requestDate).toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">{request.additionalNotes || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>
    );
};

export default RequestFood;