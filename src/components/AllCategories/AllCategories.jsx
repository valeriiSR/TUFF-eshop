import React from 'react';
import styles from './AllCategories.module.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AllCategories() {
  const {list: categories, isLoading} = useSelector(state => state.categories);
  // const categories = useSelector(( { categories } ) => categories.list);

  // console.log(categories);

  return (
    <nav className={styles.categories}>
      <h4 className='categories__title'>All Categories</h4>
      <ul className='categories__list'>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        categories.slice(0, 10).map(({id, name, image}) => (
          <li key={id}>
            <Link to={`/categories/${id}`} className={styles['categories__list-link']} >
              <div className={styles.imagePerview} style={{ backgroundImage: `url(${image})` }}></div>
              <p className={styles.title}>{name}</p> 
            </Link>
          </li>
        ))
      )}
     
      </ul>
    </nav>
  )
}
