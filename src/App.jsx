import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import Product from './pages/Product';
import Navbar from './components/Navbar';
import BackgroundEffect from './components/BackgroundEffect';
import Dowload from './pages/Dowload';

function App() {
  return (
    <div className='bg-black '>
      {/* <BackgroundEffect/> */}
    <div className='min-h-screen rounded-t-[50px] border-blue-950 bg-gradient-to-b from-[#02071F] to-[#00172F] text-white font-sans overflow-hidden'>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<Product />} />
        <Route path="/download" element={<Dowload/>}/>
      </Routes>
    </div>
    </div>
  )
}

export default App;

