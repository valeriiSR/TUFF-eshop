import React, { useState, useEffect } from 'react';
import styles from './SingleProductViewer.module.css';
import { ROUTES } from '../../utils/routes';
import { Link } from "react-router-dom";
import { SIZES } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { addProductToCart, addProductToFavorite } from '../../features/user/userSlice';
import { getRelatedProducts } from '../../features/products/productsSlice';

export default function SingleProductViewer({ product }) {
  const dispatch = useDispatch();

  const [currentImage, setCurrentImage] = useState(null);
  const [currentSize, setCurrentSize] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!product.images.length) return;

    setCurrentImage(product.images[0]);

    if (product) {
      dispatch(getRelatedProducts(product.category.id))
    }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.images, product]);
  
  const addToCart = () => {
    dispatch(addProductToCart(product));
  }

  const addToFavorite = () => {
    dispatch(addProductToFavorite(product));
    setIsFavorite(true);
  }

  return (
    <section className={styles.product}>
      <div 
        className={styles.mainImageWrapper} 
        style={{ backgroundImage: `url(${currentImage})`, backgroundSize: 'cover'}}>
      </div>
      <div className={styles.otherImages}>
        <ul>
          {product.images.map((image, i) => (
            <li key={i}>
              <button 
                type='button' 
                onClick={() => setCurrentImage(image)}
                className={styles.otherImageItem}><img src={image} alt="" /></button>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.productDetails}>
        <div className={styles.title}>{`${product.title.slice(0, 40)}`}</div>
        <div className={styles.price}>{product.price.toFixed(2)}$</div>
        <div className={styles.optionsWrapper}>
          Color: 
          <div className={styles.optionsWrapperGroup}>
            <button type='button' className={styles.colorItem}>Blanc</button>
            <button type='button' className={styles.colorItem}>White</button>
          </div>
        </div>
        <div className={styles.optionsWrapper}>
          Sizes: 
          <div className={styles.optionsWrapperGroup}>
            {SIZES.map((size, i) => (
              <button key={i} 
                onClick={() => setCurrentSize(size)} 
                type='button' 
                className={`${styles['sizeItem']} ${currentSize === size ? styles.active : ''}`}>{size}</button>
            ))}
          </div>
        </div>
        <p className={styles.desc}>{`${product.description.slice(0, 200)}...`}</p>
        <div className={styles.buttonsGroup}>
          <button onClick={addToCart} disabled={!currentSize} className="btn-big">Add to cart</button>
          <button disabled={isFavorite} onClick={addToFavorite} className="btn-big--grey">{isFavorite ? 'Already in favorites' : 'Add to favorites'}</button>
        </div>
        <div className={styles.footer}>
          <p>19 people purchased</p>
          <Link to={ROUTES.HOME} className={styles.findLink}>Return to store</Link>
        </div>
      </div>
    </section>
  )
}
