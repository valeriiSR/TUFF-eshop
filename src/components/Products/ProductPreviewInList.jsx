import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Products.module.css';

export default function ProductPreviewInList({ product }) {
  return (
    <section className='product-preview'>
    <Link className={styles.inner} to={`/product/${product.id}`}>
      <div className={styles['product-preview__image']} style={{ backgroundImage: `url(${product.images[0]})` }}  />
      <div className={styles.desc}>
        <h3 className={styles.title}>{`${product.title.slice(0, 250)}`}</h3>
        <span className={styles.model}>{product.category.name}</span>
        <div>
          <span className={styles.price}>{product.price.toFixed(2)}$</span>
          <span className={styles.oldPrice}>{Math.floor(product.price * 0.8)}$</span>
        </div>
      </div>
    </Link>
  </section>
  )
}
