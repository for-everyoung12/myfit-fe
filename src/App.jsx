import React from 'react';
import { Routes, Route } from 'react-router-dom'; // KHÔNG import Router ở đây
import HomePage from './pages/Home';
import Navbar from './components/Navbar';
import Dowload from './pages/Dowload';
import AboutUsPage from './pages/AboutUsPage/AboutUsPage';
import Footer from './components/Footer/Footer';
import TryOnBanner from './components/TryOnBanner';
import ServicePage from './pages/ServicePage/ServicePage';
import ContactPage from './pages/ContactPage/ContactPage';

function App() {
  return (
    <div className='bg-black'>
      <div className='min-h-screen border-blue-950 bg-gradient-to-b from-[#02071F] to-[#00172F] text-white font-sans overflow-hidden'>
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/download" element={<Dowload />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/services" element={<ServicePage/>} />
          <Route path="/contact" element={<ContactPage/>} />
        </Routes>
        <TryOnBanner />
        <Footer />
      </div>
    </div>
  );
}

export default App;
