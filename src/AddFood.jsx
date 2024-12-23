import React from 'react';
import NavBar from './NavBar';

const AddFood = () => {
    return (
        <>
        <NavBar></NavBar>
        <div className="min-h-screen bg-base-200 flex items-center justify-center py-5">
            <form  className="card bg-white shadow-xl p-8 w-full max-w-lg">
                <h1 className="text-2xl text-center font-bold mb-4">Add Food</h1>
                <div className="form-control mb-4">
                    <label className="label font-bold">Food Name</label>
                    <input
                        type="text"
                        name="foodName"
                        
                       // onChange={handleChange}
                        className="input input-bordered"
                        required
                    />
                </div>
                <div className="form-control mb-4">
                    <label className="label font-bold">Food Image URL</label>
                    <input
                        type="text"
                        name="foodImage"
                       
                        //onChange={handleChange}
                        className="input input-bordered"
                        required
                    />
                </div>
                <div className="form-control mb-4">
                    <label className="label font-bold">Food Quantity</label>
                    <input
                        type="number"
                        name="foodQuantity"
                        
                      //  onChange={handleChange}
                        className="input input-bordered"
                        required
                    />
                </div>
                <div className="form-control mb-4">
                    <label className="label font-bold">Pickup Location</label>
                    <input
                        type="text"
                        name="pickupLocation"
                        
                        //onChange={handleChange}
                        className="input input-bordered"
                        required
                    />
                </div>
                <div className="form-control mb-4">
                    <label className="label font-bold">Expired Date/Time</label>
                    <input
                        type="datetime-local"
                        name="expiredDate"
                        
                       // onChange={handleChange}
                        className="input input-bordered"
                        required
                    />
                </div>
                <div className="form-control mb-4">
                    <label className="label font-bold">Additional Notes</label>
                    <textarea
                        name="additionalNotes"
                        
                        //onChange={handleChange}
                        className="textarea textarea-bordered"
                        rows="3"
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary mt-4">
                    Add Food
                </button>
            </form>
        </div>
        </>
    );
};

export default AddFood;