import React from 'react';
import NavBar from './NavBar';
import Banner from './Banner';
import { Outlet } from 'react-router-dom';
import AllFoods from './AllFoods';
import Footer from './Footer';
import UserTestimonials from './UserTestimonials';
import HowItWorks from './HowItWorks';

const Home = () => {
    return (
        <>
        <header>
        <NavBar></NavBar>
        <Banner></Banner>
        </header>
        <main>
            <AllFoods></AllFoods>
            <HowItWorks></HowItWorks>
            <UserTestimonials></UserTestimonials>
        </main>
        <footer>
            <Footer></Footer>
        </footer>
        
        
        </>
    );
};

export default Home;