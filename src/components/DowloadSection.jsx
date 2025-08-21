import React from 'react';
import { Apple } from 'lucide-react';
import lightEffect from '../assets/light.png';

const DownloadSection = () => {
  return (
    <section
      id="download"
      className="relative py-20 bg-gradient-to-b from-[#02071F] to-[#00172F] min-h-screen overflow-hidden"
    >
      {/* Light effects */}
      <img
        src={lightEffect}
        alt="light effect"
        className="absolute top-1/4 left-1/4 w-[800px] opacity-100 pointer-events-none"
      />
      <img
        src={lightEffect}
        alt="light effect"
        className="absolute bottom-10 right-1/4 w-[500px] opacity-50 pointer-events-none"
      />
      <img
        src={lightEffect}
        alt="light effect"
        className="absolute top-1/3 right-10 w-[300px] opacity-70 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Download the App
        </h2>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Download now to experience a new way of fashion shopping!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          {/* Nút tải APK */}
          <a
            href="https://drive.google.com/uc?export=download&id=1Cmih3-8dokpKE7oInNjaoG7qpeOBTrJI"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg group"
          >
            <div className="mr-4">
              <svg
                className="w-8 h-8"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-xs text-gray-300">Download</div>
              <div className="text-lg font-semibold">APK File</div>
            </div>
          </a>

          {/* App Store (giữ nguyên) */}
          <a
            href="#"
            className="flex items-center bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg group"
          >
            <Apple className="w-8 h-8 mr-4" />
            <div className="text-left">
              <div className="text-xs text-gray-300">Download on</div>
              <div className="text-lg font-semibold">App Store</div>
            </div>
          </a>
        </div>

        {/* Feature highlights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-gradient-blue rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">
              User-friendly interface
            </h3>
            <p className="text-gray-300">
              Modern design, easy to use and intuitive
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-gradient-blue rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🥽</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">
              AR Technology
            </h3>
            <p className="text-gray-300">
              Virtual try-on with augmented reality technology
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-gradient-blue rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🛍️</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">
              Smart Shopping
            </h3>
            <p className="text-gray-300">
              Search and choose outfits that suit you best
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
