import React from "react";
import { Link } from "react-router-dom";

// Icon dịch vụ
import icon1 from "../../assets/ser-1.png";
import icon2 from "../../assets/ser-2.png";
import icon3 from "../../assets/ser-3.png";
import icon4 from "../../assets/ser-4.png";
import icon5 from "../../assets/ser-5.png";
import icon6 from "../../assets/ser-6.png";

// Ảnh nền và tay
import backgroundWave from "../../assets/looper1.svg";
import aiHand from "../../assets/ai_hand.png";

const services = [
  { icon: icon1, title: "Information Systems Strategy" },
  { icon: icon2, title: "Custom Software" },
  { icon: icon3, title: "Integration Services" },
  { icon: icon4, title: "Web, Ecommerce & Mobile Apps" },
  { icon: icon5, title: "Business Automation" },
  { icon: icon6, title: "Creativity" },
];

const ServicesPage = () => {
  return (
    <section className="relative bg-[#0a0f2c] text-white pt-24 pb-[320px] px-6 md:px-20 overflow-hidden">
      {/* Glow light effects */}
      <div className="absolute top-[15%] left-[10%] w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl z-0"></div>
      <div className="absolute top-[40%] right-[10%] w-80 h-80 bg-purple-500/20 rounded-full blur-[120px] z-0"></div>
      <div className="absolute bottom-[30%] left-[35%] w-72 h-72 bg-[#18FFFF]/10 rounded-full blur-3xl z-0"></div>

      {/* Nội dung chính (z-20) */}
      <div className="relative z-20 max-w-7xl mx-auto text-center">
        <p className="uppercase text-[24px] tracking-widest text-gray-400 font-medium mb-2">
          All our services
        </p>
        <h2 className="text-[55px] font-bold mb-4 leading-tight">
          Our{" "}
          <span className="text-[#18FFFF] bg-clip-text">
            comprehensive services
          </span>
          <br />
          will cover all your needs.
        </h2>
        <p className="text-gray-300 max-w-2xl text-[20px] mx-auto leading-relaxed mb-16">
          We don't just help with your IT needs. We focus on the entire
          ecosystem surrounding it. Bringing together people, process, and
          technology, we pride ourselves on delivering solutions that work in
          reality. Not theory.
        </p>

        {/* Grid dịch vụ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <img
                src={service.icon}
                alt={service.title}
                className="w-12 h-12 mb-4"
              />
              <h4 className="text-lg font-semibold bg-gradient-to-r from-[#18FFFF] to-[#623CF4] bg-clip-text text-transparent">
                {service.title}
              </h4>
              <Link
                to="/download"
                className="text-white text-sm mt-2 hover:underline"
              >
                Learn More &gt;
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Tay robot và background wave */}
      <div className="mt-60">
        <img
          src={aiHand}
          alt="AI hand"
          className="absolute bottom-0 left-0 w-1/2 max-w-none z-10 pointer-events-none"
        />
      </div>
    </section>
  );
};

export default ServicesPage;
