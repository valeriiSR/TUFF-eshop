import React from 'react'
import './Home.css';
import promoImage from '../../images/promo.png';

export default function Home() {
  return (
    <div className='top-slider'>
      <p className='top-slider--shadow-text'>BIG SALE 20%</p>
      <p className='top-slider__sub-title'>the bestseller of 2025 </p>
      <p className='top-slider__title'>LENNON r2d2 with NVIDIA 5090 TI</p>
      <button className='btn-big top-slider__btn' type='button'>Shop Now</button>
      <img className='promo-image' src={promoImage} alt="" />
    </div>
  )
}
