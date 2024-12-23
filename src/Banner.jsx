import React from 'react';
import { NavLink } from 'react-router-dom';

const Banner = () => {
    return (
        <div
  className="hero h-80"
  style={{
    backgroundImage: "url(https://i.ibb.co.com/JH2f6sT/istockphoto-1181460583-612x612.jpg)",
  }}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Welcome to Food Sharing!</h1>
      <p className="mb-5">
      Discover and share delicious food with your community. Together, we can reduce waste!
      </p>
      <NavLink to='/available-foods'><button className="btn btn-primary">All Foods</button></NavLink>
    </div>
  </div>
</div>
        
    );
};

export default Banner;