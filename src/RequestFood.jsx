import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useAuth } from "./AutProvider";
import axios from "axios";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Footer from "./Footer";

const RequestFood = () => {
  const { user } = useAuth();
  const [foodRequests, setFoodRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://meheraj.vercel.app/food-requests?email=${user.email}`)
        .then((res) => {
          setFoodRequests(res.data || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  if (loading)
    return <p className="text-center mt-8 animate-pulse">Loading...</p>;

  if (!foodRequests.length)
    return (
      <div>
        <NavBar />
        <p className="text-center mt-8 text-gray-500">
          No food requests found!
        </p>
      </div>
    );

  // Safe filtering
  const filteredRequests = foodRequests.filter((request) =>
    (request?.donatorName || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
    <NavBar></NavBar>
    <div>
      <div className="container mx-auto px-4  mt-10">
        <h1 className="text-3xl font-bold text-center mb-6">
          Your Food Requests
        </h1>

        {/* Search box */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search by donator..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>

        {/* Modern Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-x-auto shadow-lg rounded-lg"
        >
          <table className="w-full border border-gray-200">
            <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Donator</th>
                <th className="px-4 py-3 text-left">Pickup Location</th>
                <th className="px-4 py-3 text-left">Expire Date</th>
                <th className="px-4 py-3 text-left">Request Date</th>
                <th className="px-4 py-3 text-left">Notes</th>
                <th className="px-4 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request, index) => (
                <motion.tr
                  key={request._id || index}
                  className="hover:bg-gray-100 border-b"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <td className="px-4 py-3">{request?.donatorName || "N/A"}</td>
                  <td className="px-4 py-3">{request?.pickupLocation || "N/A"}</td>
                  <td className="px-4 py-3">
                    {request?.expiredDateTime
                      ? new Date(request.expiredDateTime).toLocaleString()
                      : "N/A"}
                  </td>
                  <td className="px-4 py-3">
                    {request?.requestDate
                      ? new Date(request.requestDate).toLocaleString()
                      : "N/A"}
                  </td>
                  <td className="px-4 py-3">
                    {request?.additionalNotes || "No notes"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        new Date(request?.expiredDateTime) < new Date()
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {new Date(request?.expiredDateTime) < new Date()
                        ? "Expired"
                        : "Active"}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default RequestFood;
