import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { authContext } from "./AutProvider";
import {
  Menu,
  X,
  User,
  Settings,
  LogOut,
  LayoutDashboard,
  Sun,
  Moon,
  Bell,
  MessageSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
  const { user, handleLogout } = useContext(authContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [notificationsCount, setNotificationsCount] = useState(3);
  const [messagesCount, setMessagesCount] = useState(5);

  // Dark Mode Toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const links = (
    <>
      <li>
        <NavLink to="/" className="hover:text-primary">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/available-foods" className="hover:text-primary">
          Available Foods
        </NavLink>
      </li>
      <li>
        <NavLink to="/add-food" className="hover:text-primary">
          Add Food
        </NavLink>
      </li>
      <li>
        <NavLink to="/manage-foods" className="hover:text-primary">
          Manage My Foods
        </NavLink>
      </li>
      <li>
        <NavLink to="/my-requests" className="hover:text-primary">
          My Food Requests
        </NavLink>
      </li>
    </>
  );

  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md transition-colors">
      <div className="navbar max-w-7xl mx-auto px-4 py-2">

        {/* Left */}
        <div className="navbar-start flex items-center">
          <button className="lg:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <NavLink
            to="/"
            className="btn btn-ghost text-2xl font-bold text-primary"
          >
            🍴 Food Sharing
          </NavLink>
        </div>

        {/* Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-6 text-lg font-medium">{links}</ul>
        </div>

        {/* Right */}
        <div className="navbar-end hidden lg:flex items-center gap-3">

          {/* Dark/Light Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-800" />}
          </button>

          {/* Messages */}
          <div className="relative">
            <MessageSquare
              size={24}
              className="cursor-pointer hover:text-primary transition"
            />
            {messagesCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                {messagesCount}
              </span>
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <Bell
              size={24}
              className="cursor-pointer hover:text-primary transition"
            />
            {notificationsCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                {notificationsCount}
              </span>
            )}
          </div>

          {/* Profile Dropdown */}
          {user?.email ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <img
                  src={user.photoURL || "https://i.ibb.co/MBtjqXQ/no-avatar.png"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border"
                />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 p-4 z-50"
                  >
                    <div className="flex items-center gap-3 mb-4 border-b border-gray-200 dark:border-gray-600 pb-3">
                      <img
                        src={user.photoURL || "https://i.ibb.co/MBtjqXQ/no-avatar.png"}
                        alt="User"
                        className="w-12 h-12 rounded-full border"
                      />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{user.displayName || "No Name"}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                        <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full dark:bg-green-700 dark:text-green-100">
                          Premium User
                        </span>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      <li>
                        <NavLink
                          to="/profile"
                          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                        >
                          <User size={18} /> Profile
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/dashboard"
                          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                        >
                          <LayoutDashboard size={18} /> Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/settings"
                          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                        >
                          <Settings size={18} /> Settings
                        </NavLink>
                      </li>
                    </ul>
                    <button
                      onClick={handleLogout}
                      className="mt-4 w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                    >
                      <LogOut size={18} /> Log Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <NavLink to="/login">
              <button className="btn btn-primary btn-sm">Login Now</button>
            </NavLink>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-md overflow-hidden"
          >
            <ul className="menu p-4 text-lg">{links}</ul>

            {/* Mobile Icons */}
            <div className="flex items-center justify-around p-4 border-t border-gray-200 dark:border-gray-700">
              <button onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-800" />}
              </button>
              <div className="relative">
                <MessageSquare size={24} />
                {messagesCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                    {messagesCount}
                  </span>
                )}
              </div>
              <div className="relative">
                <Bell size={24} />
                {notificationsCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                    {notificationsCount}
                  </span>
                )}
              </div>
              {user?.email && (
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    <img
                      src={user.photoURL || "https://i.ibb.co/MBtjqXQ/no-avatar.png"}
                      alt="Profile"
                      className="w-8 h-8 rounded-full border"
                    />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavBar;
