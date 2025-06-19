import React from 'react'
import ProductSection from '../components/ProductSection'
import FlashSale from '../components/FlashSale'
import BackgroundEffect from '../components/BackgroundEffect_2'
import CategorySection from '../components/CategorySection'
import TestimonialSection from '../components/TestimonialSection'
import LimitedEditionSection from '../components/LimitedEditionSection'
export const Product = () => {
  return (
    <div className="relative">
      <BackgroundEffect />
      <ProductSection />
      <FlashSale />
      <CategorySection/>
      <TestimonialSection/>
      <LimitedEditionSection/>
    </div>

  )
}
export default Product;