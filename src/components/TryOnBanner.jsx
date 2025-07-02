import React from "react";
import { Link } from "react-router-dom";
import logo from "../../src/assets/logo.png";

const TryOnBanner = () => {
  return (
    <section className="relative z-10 -mb-32 px-4 bg-gradient-to-b from-[#0a0f2c] to-transparent">
      <div className="max-w-6xl mx-auto bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400 text-white rounded-xl px-8 py-24 text-center shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="text-cyan-200">Thử đồ ảo với </span>
          <span className="inline-flex items-center gap-2">
            <img src={logo} alt="logo" className="inline-block h-8" />
          </span>
        </h2>
        <p className="text-xl mb-6 font-semibold">
          Định nghĩa lại trải nghiệm thời trang số.
        </p>

        {/* Link to /download */}
        <div className="flex justify-center flex-wrap gap-4">
          <Link to="/download">
            <button className="bg-white text-black px-10 py-4 rounded-full font-semibold shadow">
              Let’s Talk
            </button>
          </Link>
          <Link to="/download">
            <button className="bg-cyan-400 hover:bg-cyan-300 text-white px-6 py-3 rounded-full font-semibold shadow">
              Book Your Consultation
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TryOnBanner;