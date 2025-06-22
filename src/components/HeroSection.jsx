import React from 'react';
import secondlogo from '../assets/second-logo.png';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative mt-20 z-10 flex flex-col gap-10 items-center justify-center text-center px-4">
      <h1 className="text-4xl md:text-[60px] font-bold text-cyan-400">Shape Your Body</h1>
      <div className='mt-2'>
        <img src={secondlogo} alt="MYFIT" className="h-14 my-2" />
      </div>
      <p className="max-w-xl text-gray-300 text-[20px]">
        An AI and AR-powered fashion platform that helps users find and try on outfits,
        express their style, and shop smarter and more sustainably.
      </p>
      <div className="mt-2 flex gap-6">
        <div className="relative inline-block rounded-full p-[2px] bg-[linear-gradient(90deg,_#5361F6_0%,_#28D2FC_38%,_#4361EE_76%,_#4DE8FF_100%)]">
          <button className="px-8 py-3 rounded-full bg-black text-white border border-transparent hover:bg-cyan-500 hover:text-black transition-all w-full h-full">
            <Link to="/product">Product</Link>
          </button>
        </div>
        <button className="px-8 py-3 rounded-full border border-white bg-black hover:bg-white hover:text-black transition-all">
          <Link to="/download">Download</Link>
        </button>
      </div>

    
    </section>
  );
};

export default HeroSection;