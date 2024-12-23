import React from 'react';
import NavBar from './NavBar';
import { useLoaderData } from 'react-router-dom';

const FoodDatial = () => {
    const { foodName, foodImage, foodQuantity, pickupLocation, expiredDate, additionalNotes, donator, foodStatus } = useLoaderData();
    return (
        <>
            <NavBar></NavBar>
            <div className='py-6'>
                <div className="hero bg-base-200 min-h-screen">
                    <div className="hero-content flex-col lg:flex-row">
                        <img
                            src={foodImage}
                            className="max-w-sm rounded-lg shadow-2xl" />
                        <div>
                            <h1 className=" text-4xl font-bold">{foodName}</h1>
                            <h1 className=" font-bold">Quantity:{foodQuantity}</h1>
                            <h1 className=" font-bold">Date:{expiredDate}</h1>
                            <h1 className=" font-bold">Location:{pickupLocation}</h1>
                            <h1 className=" font-bold">Status:{foodStatus}</h1>
                            <p className="">{additionalNotes}</p>
                            {donator && (
                                <div className="donator-info">
                                    <h2 className="font-bold text-lg">Donator Information:</h2>
                                    <img
                                        src={donator.donatorImage}
                                        className="w-20 h-20 rounded-full shadow-md mb-2"
                                    />
                                    <p><strong>Name:</strong> {donator.donatorName}</p>
                                    <p><strong>Email:</strong> {donator.donatorEmail}</p>
                                </div>
                            )}
                            <button className="btn btn-primary">Request Food</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FoodDatial;