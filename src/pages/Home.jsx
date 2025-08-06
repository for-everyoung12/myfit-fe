import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HeroSection } from '../components/HomePage/HeroSection';
import { ServiceInfo } from '../components/HomePage/ServiceInfo';
import PlanInfo from '../components/HomePage/PlanInfo';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToPlan) {
      const el = document.getElementById('plan');
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div>
      <HeroSection />
      <ServiceInfo />
      <div id="plan">
        <PlanInfo />
      </div>
    </div>
  );
};

export default Home;
