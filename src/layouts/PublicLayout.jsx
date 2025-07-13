import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer/Footer';
import TryOnBanner from '../components/TryOnBanner';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div className='bg-black'>
      <div className='min-h-screen border-blue-950 bg-gradient-to-b from-[#02071F] to-[#00172F] text-white font-sans overflow-hidden'>
        <Navbar />
        <Outlet />
        <TryOnBanner />
        <Footer />
      </div>
    </div>
  );
};

export default PublicLayout;
