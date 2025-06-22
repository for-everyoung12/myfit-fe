import React from 'react';
import section from '../assets/section1.png';
import { Link } from 'react-router-dom';

const ProductSection = () => {

  return (
    <section className="relative py-20 px-4 overflow-hidden pb-32">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
              New Summer
              <br />
              <span className="text-cyan-400">Collection</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Shop the best clothes in the world
            </p>
            <div className="relative inline-block rounded-full p-[2px] bg-[linear-gradient(90deg,_#5361F6_0%,_#28D2FC_38%,_#4361EE_76%,_#4DE8FF_100%)]">
              <button className="px-8 py-3 rounded-full bg-black text-white border border-transparent hover:bg-cyan-500 hover:text-black transition-all w-full h-full">
                <Link to="/download">Download</Link>
              </button>
            </div>
          </div>

          <div className="lg:w-1/2 flex justify-center ">
            <div className="relative ">
              <div
                className="w-80 h-96 overflow-hidden"
              >
                <img
                  src={section}
                  alt="Summer Collection Model"
                  className="w-[80%] h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14 absolute bottom-0 left-0 w-full h-20 border-t border-b border-cyan-400 py-2 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap text-white flex items-center h-full">
          <span className="mx-8">• Customer support</span>
          <span className="mx-8">• Customer support</span>
          <span className="mx-8">• Customer support</span>
          <span className="mx-8">• Customer support</span>
          <span className="mx-8">• Customer support</span>
          <span className="mx-8">• Customer support</span>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
