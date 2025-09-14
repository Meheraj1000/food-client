import React, { useEffect, useRef } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = 200;

    const particles = [];
    const particleCount = 60;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx = -p.dx;
        if (p.y < 0 || p.y > canvas.height) p.dy = -p.dy;
      });
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 200;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <footer className="relative bg-gray-900/60 backdrop-blur-md text-gray-300 py-12 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0"></canvas>

      <div className="relative z-10 max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Branding */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            Food Share
          </h2>
          <p className="text-gray-400">Connecting people through food and reducing waste together.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-teal-500 to-cyan-500">
            Quick Links
          </h3>
          <ul className="space-y-2">
            {["About Us", "How It Works", "Blog", "Contact Us", "FAQs"].map((link, idx) => (
              <li key={idx}>
                <a
                  href="#"
                  className="hover:text-blue-400 hover:drop-shadow-lg transition duration-300"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-red-500 to-yellow-500">
            Subscribe
          </h3>
          <form className="flex flex-col space-y-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-2 rounded font-semibold transition transform hover:scale-105 hover:shadow-lg"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
            Follow Us
          </h3>
          <div className="flex gap-4">
            <a href="#" className="p-3 bg-blue-600 rounded-full hover:scale-110 hover:shadow-lg transition transform text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="p-3 bg-pink-500 rounded-full hover:scale-110 hover:shadow-lg transition transform text-white">
              <FaInstagram />
            </a>
            <a href="#" className="p-3 bg-sky-400 rounded-full hover:scale-110 hover:shadow-lg transition transform text-white">
              <FaTwitter />
            </a>
            <a href="#" className="p-3 bg-blue-700 rounded-full hover:scale-110 hover:shadow-lg transition transform text-white">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500 relative z-10">
        <p>
          © 2024 FoodShare. All rights reserved. |{" "}
          <a href="#" className="hover:underline text-gray-400">Privacy Policy</a> |{" "}
          <a href="#" className="hover:underline text-gray-400">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
