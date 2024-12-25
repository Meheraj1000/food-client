import React from 'react';
import { NavLink } from 'react-router-dom';

const Error = () => {
    return (
        <div className='flex flex-col justify-center items-center m-5'>
           <div className='text-center p-3'>
           <h1 className='text-5xl p-2 text-orange-400'><span className='text-7xl text-red-600'>O</span>ops!</h1>
            <p className='p-2 text-2xl'>404-PAGE NOT FOUND</p>
            <p>The page you are looking for might have been removed had it's name changed or is temporarily unavailable</p>
           </div>
            <div>
                <NavLink to='/'><button className='btn'>GO TO HOMEPAGE</button></NavLink>
            </div>
        </div>
    );
};

export default Error;