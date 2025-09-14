import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Banner from "./Banner";
import Footer from "./Footer";
import HowItWorks from "./HowItWorks";
import UserTestimonials from "./UserTestimonials";
import AllFoodsCarousel from "./AllFoodsCarousel";

const Home = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://meheraj.vercel.app/food") // তোমার API URL
      .then(res => res.json())
      .then(data => {
        setFoods(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 scroll-smooth">
      <header>
        <NavBar />
        <Banner />
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-16">
        {loading ? (
          <p className="text-center py-10">Loading foods...</p>
        ) : foods.length > 0 ? (
          <AllFoodsCarousel foods={foods} />
        ) : (
          <p className="text-center py-10">No foods available.</p>
        )}

        <HowItWorks />
        <UserTestimonials />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Home;