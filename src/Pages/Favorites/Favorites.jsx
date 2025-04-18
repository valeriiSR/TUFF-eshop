import React from 'react';
import styles from './Favorites.module.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


export default function Favorites() {
  const { favorites } = useSelector( state  => state.user);

  return (
    <section className={styles.favorite}>
      <h3 className={styles.title}>Favorites</h3>
      {!favorites.length ? (
        <div className={styles.empty}>Here is empty</div>
      ) : (
        <div className={styles.list}>
        {favorites.map(product => (
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
        ))}
        </div>
      )}
    </section>
  )
}
