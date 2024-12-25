import React from 'react';

const Footer = () => {
    return (
        <footer class="bg-gray-800 text-gray-300 py-8">
            <div class="container mx-auto flex flex-wrap justify-between items-start space-y-8 md:space-y-0 px-4">

                <div class="w-full md:w-1/4">
                    <h2 class="text-2xl font-bold text-white">Food Share</h2>
                    <p class="mt-2 text-sm">Connecting people through food.</p>
                </div>


                <div class="w-full md:w-1/4">
                    <h3 class="text-lg font-semibold text-white mb-4">Quick Links</h3>
                    <ul class="space-y-2">
                        <li><a href="#" class="hover:text-gray-400">About Us</a></li>
                        <li><a href="#" class="hover:text-gray-400">How It Works</a></li>
                        <li><a href="#" class="hover:text-gray-400">Blog</a></li>
                        <li><a href="#" class="hover:text-gray-400">Contact Us</a></li>
                        <li><a href="#" class="hover:text-gray-400">FAQs</a></li>
                    </ul>
                </div>


                <div class="w-full md:w-1/4">
                    <h3 class="text-lg font-semibold text-white mb-4">Subscribe to Our Newsletter</h3>
                    <form class="flex flex-col space-y-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            class="px-4 py-2 rounded bg-gray-700 text-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                        />
                        <button
                            type="submit"
                            class="bg-red-500 hover:bg-red-600 text-white py-2 rounded transition duration-300"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>


                <div class="w-full md:w-1/4">
                    <h3 class="text-lg font-semibold text-white mb-4">Follow Us</h3>
                    <div class="flex space-x-4">
                        <a href="#" class="hover:text-gray-400">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" class="hover:text-gray-400">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="#" class="hover:text-gray-400">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="#" class="hover:text-gray-400">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>
            </div>


            <div class="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
                <p>
                    © 2024 FoodShare. All rights reserved. |
                    <a href="#" class="hover:underline text-gray-400">Privacy Policy</a> |
                    <a href="#" class="hover:underline text-gray-400">Terms of Service</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;