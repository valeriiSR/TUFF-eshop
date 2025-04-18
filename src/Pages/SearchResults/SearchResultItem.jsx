import React from 'react'
import styles from './SearchResults.module.css';
import { ROUTES } from '../../utils/routes';
import { Link } from 'react-router-dom';

export default function SearchResultItem({ item }) {
  return (
    <Link to={`/product/${item.id}`} className={styles.itemWrapper}>
      <div className={styles.imagePreview} style={{ backgroundImage: `url(${item.images[0]})` }} ></div>
      <div className={styles.details}>
        <h4 className={styles.itemTitle} >{item.title}</h4>
        <p className={styles.desc}>{item.description}</p>
        <p className={styles.price}>{item.price}$</p>
      </div>
      
    </Link>
  )
}
