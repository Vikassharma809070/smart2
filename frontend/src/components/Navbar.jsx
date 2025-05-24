import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/actions/authActions';

const Navbar = () => {
  const authState = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <>
      <header className="flex justify-between sticky top-0 p-4 bg-white shadow-sm items-center">
        <h2 className="cursor-pointer uppercase font-medium animate-fadeIn">
          <Link to="/">Task Manager</Link>
        </h2>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-4 uppercase font-medium animate-fadeIn">
          {authState.isLoggedIn ? (
            <>
              <li className="bg-blue-500 text-white hover:bg-blue-600 font-medium rounded-md transition transform hover:scale-105">
                <Link to="/tasks/add" className="block w-full h-full px-4 py-2 flex items-center gap-2">
                  <i className="fa-solid fa-plus"></i> Add Task
                </Link>
              </li>
              <li
                className="py-2 px-3 cursor-pointer hover:bg-gray-200 transition transform hover:scale-105 rounded-sm"
                onClick={handleLogoutClick}
              >
                Logout
              </li>
            </>
          ) : (
            <li className="py-2 px-3 cursor-pointer text-primary hover:bg-gray-100 transition transform hover:scale-105 rounded-sm">
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>

        {/* Mobile Menu Toggle */}
        <span className="md:hidden cursor-pointer" onClick={toggleNavbar} aria-label="Toggle Menu">
          <i className="fa-solid fa-bars animate-pulse"></i>
        </span>

        {/* Mobile Sidebar Navigation */}
        <div
          className={`fixed md:hidden right-0 top-0 bottom-0 transition-transform duration-500 ease-in-out ${
            isNavbarOpen ? 'translate-x-0' : 'translate-x-full'
          } bg-gray-100 shadow-md w-screen sm:w-9/12 h-screen animate-slideIn`}
        >
          <div className="flex justify-end p-4">
            <span className="cursor-pointer" onClick={toggleNavbar} aria-label="Close Menu">
              <i className="fa-solid fa-xmark animate-spin"></i>
            </span>
          </div>
          <ul className="flex flex-col gap-4 uppercase font-medium text-center animate-fadeIn">
            {authState.isLoggedIn ? (
              <>
                <li className="bg-blue-500 text-white hover:bg-blue-600 font-medium transition py-2 px-3 transform hover:scale-105">
                  <Link to="/tasks/add" className="block w-full h-full">
                    <i className="fa-solid fa-plus"></i> Add Task
                  </Link>
                </li>
                <li
                  className="py-2 px-3 cursor-pointer hover:bg-gray-200 transition transform hover:scale-105 rounded-sm"
                  onClick={handleLogoutClick}
                >
                  Logout
                </li>
              </>
            ) : (
              <li className="py-2 px-3 cursor-pointer text-primary hover:bg-gray-200 transition transform hover:scale-105 rounded-sm">
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </header>
    </>
  );
};

export default Navbar;
