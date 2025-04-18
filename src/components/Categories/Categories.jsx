import React from 'react';
import './Categories.css';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Categories() {
  const {list: categories, isLoading} = useSelector(state => state.categories);
  // const categories = useSelector(( { categories } ) => categories.list);

  return (
    <nav className='categories'>
      <h4 className='categories__title'>categories</h4>
      <ul className='categories__list'>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        categories.slice(0, 10).map(({id, name}) => (
          <li key={id}>
            <NavLink 
              to={`/categories/${id}`} 
              className={({ isActive }) => [ isActive ? "categories__list-link--active categories__list-link" : "categories__list-link" ].join(" ")}
            >
              {name}
            </NavLink>
          </li>
        ))
      )}
     
      </ul>
      <div className="categories__options">
        <Link to="">Help</Link>
        <Link to="">Terms & Conditions</Link>
      </div>
    </nav>
  )
}
