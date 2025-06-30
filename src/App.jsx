import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import Navbar from './components/Navbar';
import Dowload from './pages/Dowload';

function App() {
  return (
    <div className='bg-black '>
    <div className='min-h-screen  border-blue-950 bg-gradient-to-b from-[#02071F] to-[#00172F] text-white font-sans overflow-hidden'>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/download" element={<Dowload/>}/>
      </Routes>
    </div>
    </div>
  )
}

export default App;

