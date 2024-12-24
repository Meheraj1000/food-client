import React from 'react';
import { Link } from 'react-router-dom';

const FoodCard = ({ food }) => {
  const {
    _id,
    foodName,
    foodImage,
    foodQuantity,
    pickupLocation,
    expiredDate,
    additionalNotes,
    foodStatus,
  } = food;

  const statusStyles = {
    available: 'bg-green-100 text-green-700',
    requested: 'bg-yellow-100 text-yellow-700',
    expired: 'bg-red-100 text-red-700',
  };
  return (
    <>
     <div className="card bg-base-100 shadow-xl flex flex-col">
      <figure className="px-5 pt-5">
        <img
          src={foodImage}
          alt={foodName}
          className="rounded-xl w-full h-56 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg font-semibold">Food Name: {foodName}</h2>
        <p className="text-gray-600"><strong>Pickup Location:</strong> {pickupLocation}</p>
        <p className="text-gray-600"><strong>Expired Date:</strong> {expiredDate}</p>

        {additionalNotes && (
          <p className="text-gray-600"><strong>Notes:</strong> {additionalNotes}</p>
        )}

        {foodQuantity && (
          <p className="text-gray-600"><strong>Quantity:</strong> {foodQuantity}</p>
        )}

        {/* Status Badge */}
        <div
          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusStyles[foodStatus] || 'bg-gray-100 text-gray-700'}`}
        >
          {foodStatus}
        </div>

        <div className="card-actions mt-4">
          <Link to={`/food/${_id}`}>
            <button className="btn btn-primary">View Details</button>
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default FoodCard;