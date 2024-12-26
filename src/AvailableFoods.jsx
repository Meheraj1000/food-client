import React, { useState } from 'react';
import NavBar from './NavBar';
import FoodCard from './FoodCard';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Footer from './Footer';

const AvailableFoods = () => {
    const [isThreeColumn, setIsThreeColumn] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

 
  const { data: foods = [], isLoading, isError } = useQuery({
    queryKey: ['foods'],
    queryFn: async () => {
      const response = await axios.get('https://assignment-11-food-server-jade.vercel.app/food');
      return response.data;
    },
  });

  // Handle loading and error states
  if (isLoading) return <p>Loading foods...</p>;
  if (isError) return <p>Something went wrong while fetching data.</p>;

  // Filter foods based on the search query
  const filteredFoods = foods.filter((food) =>
    food.foodName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
    return (
        <>
       <NavBar></NavBar>
       <div className="container mx-auto">
        <div className="flex justify-between items-center mb-4">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by Food Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered w-1/2"
          />

          {/* Layout Toggle Button */}
          <button
            onClick={() => setIsThreeColumn(!isThreeColumn)}
            className="btn btn-secondary"
          >
            Toggle Layout
          </button>
        </div>

        {/* Food Cards */}
        <div
          className={`grid ${
            isThreeColumn ? 'grid-cols-3' : 'grid-cols-2'
          } gap-6`}
        >
          {filteredFoods.length > 0 ? (
            filteredFoods.map((food) => <FoodCard key={food._id} food={food} />)
          ) : (
            <p className="col-span-full text-center">No foods found.</p>
          )}
        </div>
      </div>
      <Footer></Footer>
        </>
    );
};

export default AvailableFoods;