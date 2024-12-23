import React from 'react';
import { Link } from 'react-router-dom';

const FoodCard = ({food}) => {
    const {_id,foodName,foodImage,foodQuantity,pickupLocation,expiredDate,additionalNotes,foodStatus}=food;
    return (
        <>
        <div className="card bg-base-100  shadow-xl">
  <figure className="px-5 pt-5 flex ">
    <img
      src={foodImage}
      alt="Shoes"
      className="rounded-xl  w-80 h-56" />
  </figure>
  <div className="card-body flex-wrap">
    <h2 className="card-title">Food Name: {foodName}</h2>
    <h2 className="card-title">Pickup Location: {pickupLocation}</h2>
    {/* <p >Additional Notes:{additionalNotes}</p> */}
    <h2 className="card-title">Expired Date: {expiredDate}</h2>
    <h2 className="card-title"> {foodStatus}</h2>
    {/* <h2 className="card-title">Food Quantity:{foodQuantity}</h2> */}
    <div className="card-actions">
     <Link to={`/food/${_id}`}> <button className="btn btn-primary">Food Details</button></Link>
    </div>
  </div>
</div>
        </>
    );
};

export default FoodCard;