import React from 'react';
import './ProductPreview.css';
import { Link } from 'react-router-dom';

export default function ProductPreview({ id, images, title, price, category: { name: catName } }) {
  return (
    <section className='product-preview'>
      <Link to={`/product/${id}`}>
        <div className='product-preview__image' style={{ backgroundImage: `url(${images[0]})` }}  />
        <div className="product-preview__desc">
          <h3 className='product-preview__title'>{`${title.slice(0, 10)} ...`}</h3>
          <span className='product-preview__model'>${catName}</span>
          <div className="product-preview__details">
            <div className="product-preview__prices">
              <span className='product-preview__carrent-price'>{price.toFixed(2)}$</span>
              <span className='product-preview__old-price'>{Math.floor(price * 0.8)}$</span>
            </div>
            <div className="product-preview__purchaceds">{Math.floor(Math.random(price) * 20 + 1)} people purchased</div>
          </div>
        </div>
      </Link>
    </section>
  )
}
