import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { MenuOutlined } from '@ant-design/icons';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { isLoggedIn, username, logout } = useContext(AuthContext);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const toggleDropdown = () => setShowDropdown(prev => !prev);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="z-20 relative flex justify-between items-center px-8 py-6">
      <div className="flex justify-between items-center w-full">

        {/* Logo */}
        <div className="flex justify-center lg:ml-40 md:justify-start w-full md:w-auto">
          <Link to="/">
            <img src={logo} alt="MyFit Logo" className="h-8" />
          </Link>
        </div>

        {/* Hamburger menu */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white">
            <MenuOutlined size={24} />
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-20 text-[20px] justify-center w-full">
          <Link to="/" className="hover:text-cyan-400">Home</Link>
          <Link to="/about" className="hover:text-cyan-400">About us</Link>
          <Link to="/services" className="hover:text-cyan-400">Services</Link>
          <Link to="/contact" className="hover:text-cyan-400">Contact</Link>
        </nav>

        {/* Avatar + Dropdown */}
        <div className="mr-10 hidden md:flex items-center space-x-4 relative" ref={dropdownRef}>
          {isLoggedIn ? (
            <>
              <span className="text-cyan-300 font-semibold">{username}</span>
              <div
                onClick={toggleDropdown}
                className="w-10 aspect-square bg-cyan-500 hover:bg-cyan-400 cursor-pointer rounded-full flex items-center justify-center text-white font-bold text-lg select-none"
              >
                {username?.charAt(0)?.toUpperCase()}
              </div>
              {showDropdown && (
                <div className="absolute right-0 top-14 bg-[#0a1d37] border border-cyan-600 text-white px-4 py-2 rounded shadow-lg z-40">
                  <button
                    onClick={handleLogout}
                    className="hover:text-red-400"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link to="/login" className="text-white hover:text-cyan-400 text-[18px]">
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav ref={menuRef} className="absolute top-0 left-0 w-full bg-gray-800 p-6 md:hidden z-30">
          <Link to="/" className="block text-white py-2 hover:text-cyan-400">Home</Link>
          <Link to="/about" className="block text-white py-2 hover:text-cyan-400">About us</Link>
          <Link to="/services" className="block text-white py-2 hover:text-cyan-400">Services</Link>
          <Link to="/contact" className="block text-white py-2 hover:text-cyan-400">Contact</Link>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-white hover:text-red-400 py-2"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="block text-white py-2 hover:text-cyan-400"
              onClick={() => setIsMenuOpen(false)} 
            >
              Login
            </Link>
          )}
        </nav>
      )}

    </header>
  );
};

export default Navbar;
