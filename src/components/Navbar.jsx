import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { MenuOutlined } from '@ant-design/icons'; // Đảm bảo bạn đã cài @ant-design/icons

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Hàm toggle menu khi nhấn vào nút hamburger
  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  // Đóng menu khi click vào ngoài vùng menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false); // Đóng menu khi click ngoài
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // Dọn dẹp event listener khi component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="z-20 relative flex justify-between items-center px-8 py-6">
      {/* Container chứa logo và menu */}
      <div className="flex justify-between items-center w-full">

        {/* Logo căn giữa trên mobile và căn trái trên desktop */}
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
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav ref={menuRef} className="absolute top-0 left-0 w-full bg-gray-800 p-6 md:hidden">
          <Link to="/" className="block text-white py-2 hover:text-cyan-400">Home</Link>
          <Link to="/about" className="block text-white py-2 hover:text-cyan-400">About us</Link>
          <Link to="/services" className="block text-white py-2 hover:text-cyan-400">Services</Link>
          <Link to="/contact" className="block text-white py-2 hover:text-cyan-400">Contact</Link>
        </nav>
      )}

      <div className="flex items-center space-x-4">
        {/* Thêm các phần tử nếu cần */}
      </div>
    </header>
  );
};

export default Navbar;
