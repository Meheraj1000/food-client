import React from 'react';
import NavBar from './NavBar';
import { Link, useLoaderData } from 'react-router-dom';
import FoodCard from './FoodCard';

const AvailableFoods = () => {
    const food=useLoaderData()
    return (
        <>
       <NavBar></NavBar>
       <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5'>
                {
                    food.map(food=><FoodCard key={food._id} food={food}></FoodCard>).slice(0,6)
                }
            </div>
       
        </>
    );
};

export default AvailableFoods;