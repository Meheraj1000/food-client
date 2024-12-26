import React, { useEffect, useState } from 'react';
import FoodCard from './FoodCard';

const AllFoods = () => {
    const [foods,setFoods]=useState([])

    useEffect(()=>{
        fetch('https://assignment-11-food-server-jade.vercel.app/food')
        .then(res=>res.json())
        .then(data=>{
            setFoods(data)
        })
    },[])
    return (
        <div className=''>
            <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5'>
                {
                    foods.map(food=><FoodCard key={food._id} food={food}></FoodCard>).slice(0,6)
                }
            </div>
        </div>
    );
};

export default AllFoods;