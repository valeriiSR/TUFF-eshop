import React from 'react';
import './LandCategoriesPreview.css';
import { Link } from 'react-router-dom';

export default function LandCategoriesPreview({id, name, image}) {
  return (
    <Link className='land-categories' to={`/categories/${id}`}>
      <div className='land-categories__preview'>
        <div className='land-categories__image' style={{ backgroundImage: `url(${image})` }}/>
        <h3 className='land-categories__title'>{name}</h3>
      </div>
    </Link>
  )
}
