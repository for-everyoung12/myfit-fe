import React from 'react';
import { Phone, Clock, Headphones } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#292929] text-gray-300 py-12">
      <div className="container mx-auto px-6 mt-36">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">COMPANY INFO</h3>
            <p className="text-sm leading-relaxed mb-4">
              Reach out to us anytime and lets create a better future for all of us. 
              Together, forever. We are open to all types of collab offers and tons more.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <Clock size={16} className="mr-3 text-blue-400" />
                <div>
                  <div className="text-white text-sm">Office Hours</div>
                  <div className="text-xs">Monday-Friday: 9 AM-5 PM PST</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Headphones size={16} className="mr-3 text-blue-400" />
                <div>
                  <div className="text-white text-sm">Support Hours</div>
                  <div className="text-xs">24/7 365</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">CONTACT INFO</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="w-4 h-4 bg-blue-400 rounded-full mr-3 flex-shrink-0"></span>
                <span className="text-sm">info@techyessolutions.com</span>
              </div>
              <div className="flex items-center">
                <Phone size={16} className="mr-3 text-blue-400" />
                <span className="text-sm">858-227-4578</span>
              </div>
            </div>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">OUR SERVICES</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Information Systems Strategy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Custom Software</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Integration Services</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Business Automation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Web, Ecommerce & Mobile Apps</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Creative</a></li>
            </ul>
          </div>

          {/* Our Locations */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">OUR LOCATIONS</h3>
            <div className="relative">
              <div className="w-48 h-32 bg-gray-800 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
                  <div className="flex items-center justify-center h-full">
                    <div className="grid grid-cols-8 gap-1 opacity-30">
                      {Array.from({ length: 64 }).map((_, i) => (
                        <div key={i} className="w-1 h-1 bg-blue-400 rounded-full"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-12 pt-6">
          <p className="text-center text-sm text-gray-400">
            © 2022 Tech Yes! Solutions. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;