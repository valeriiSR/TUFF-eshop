import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Cart.module.css';
import delIcon from '../../images/UI/del.png';
import { summ } from '../../utils/common';
import { addProductToCart, removeItemFromCart } from '../../features/user/userSlice';

export default function Cart() {
  const dispatch = useDispatch();
  const { cart } = useSelector(({ user }) => user);

  const changeQty = (item, qty) => {
    dispatch(addProductToCart({...item, qty }))
  }

  const removeItem = (id) => {
    dispatch(removeItemFromCart(id))
  }

  return (
    <section className={styles.cart}>
      <h2 className={styles.title}>Cart</h2>
      {!cart.length ? (
        <div className={styles.empty}>Here is empty</div>
      ) : (
        <>
          <div className={styles.list}>
          
            {cart.map(item => {
              const { title, category, images, price, id, qty } = item;
              
              return <div key={id} className={styles.item}>
                <div className={styles.image} style={{ backgroundImage: `url(${images[0]})` }} />
                <div className={styles.info}>
                  <h3 className={styles.name}>{ title }</h3>
                  <div className={styles.category}>{ category.name }</div>
                </div>
                
                <div className={styles.price}>{ price }$</div>
                <div className={styles.qtyWrapper}>
                  <button onClick={() => changeQty(item, Math.max(1, qty + 1) )} className={styles.btn}>+</button>
                  <p className={styles.qty}>{ qty }</p>
                  <button onClick={() => changeQty(item, Math.max(1, qty - 1) )} className={styles.btn}>-</button>
                </div>
                <div className={styles.total}>{ price * qty }$</div>
                <button onClick={() => removeItem(id)} className={styles.remove}><img src={delIcon} alt="" /></button>
              </div>
            })}
          </div>
          <div className={styles.group}>
            <div className={styles.totalPrice}>TOTAL PRICE: <span>{ summ(cart.map(({ price, qty }) => price * qty)) }$</span></div>
            <button className='btn-big'>Proceed to checkout</button>
          </div>
        </>
      )}
    </section>
  )
}
