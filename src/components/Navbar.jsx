import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <header className="z-20 relative flex justify-between items-center px-8 py-6">
      <div className="ml-96">
        <Link to="/">
          <img src={logo} alt="MyFit Logo" className="h-8" />
        </Link>
      </div>

      <nav className="hidden md:flex gap-20 text-[20px]">
        <Link to="/" className="hover:text-cyan-400">Home</Link>
        <Link to="/about" className="hover:text-cyan-400">About us</Link>
        <Link to="/services" className="hover:text-cyan-400">Services</Link>
        <Link to="/contact" className="hover:text-cyan-400">Contact</Link>
      </nav>
      <div className="flex items-center space-x-4">
        {/* <button className="text-white hover:text-cyan-400 transition-colors">
          <Search size={20} />
        </button>
        <div className="flex items-center space-x-2 text-white">
          <User size={20} />
          <span className="hidden text-[16px] sm:inline font-medium">Login / Register</span>
        </div> */}
      </div>
    </header>
  );
};

export default Navbar;