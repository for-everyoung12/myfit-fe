import React from 'react';
import { HeroSection } from '../components/HomePage/HeroSection';
import { ServiceInfo } from '../components/HomePage/ServiceInfo';
import PlanInfo from '../components/HomePage/PlanInfo';



const Home = () => {
  return (
   <div className="">
      <HeroSection/>
      <ServiceInfo/>
      <PlanInfo/>
    </div>
  );
};

export default Home;