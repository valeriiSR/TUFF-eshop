import React, { useEffect, useState } from 'react';
import styles from './Products.module.css';
import Loading from '../Loading/Loading';
import { useParams } from 'react-router-dom';
import { getProductsBySearch } from '../../features/products/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProductPreviewInList from './ProductPreviewInList'; 


export default function Produsts() {
  const dispatch = useDispatch();
  const { findBySearch: products, isLoading } = useSelector(( state ) => state.products)
  const { id: categoryId } = useParams();
  // const [page, setPage] = useState([]);

  const defaultValues = {
    title: "",
    price_min: 0,
    price_max: 0,
    categoryId,
    limit: 10, 
    offset: 0
  }

  const [values, setValues] = useState(defaultValues);

  useEffect(() => {
    if(!categoryId) return;

    setValues({ ...defaultValues, categoryId })
    dispatch(getProductsBySearch(defaultValues));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId])

  const resetFilter = () => {
    setValues(defaultValues);
  }

  const handleChangeFilter = ({ target: {value, name} }) => {
    setValues({ ...values, [name]: value })
  }

  const handleSubmitFilters = (e) => {
    e.preventDefault();

    setValues({ ...values, categoryId });
    console.log(values);
    dispatch(getProductsBySearch(values));
  }

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>Products</h1>
      {/* <code style={{fontSize: "12px"}}>Фильтр товаров: по имени с цене от и до </code>
      <code style={{fontSize: "12px"}}>Подгрузка товаров при прокрутки вниз или просто кномка "показать ещё"</code> */}
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.list}>
        <form className={styles.filters} onSubmit={handleSubmitFilters}>
          <span className={styles.filterTitle}>Filter: </span>
          <input onChange={handleChangeFilter} className={styles.filter} value={values.title} type="text" name='title' placeholder='Product name' />
          <input onChange={handleChangeFilter} className={styles.filter} value={values.price_min} type="number" name='price_min' placeholder='Price from' />
          <input onChange={handleChangeFilter} className={styles.filter} value={values.price_max} type="number" name='price_max' placeholder='Price to' />
          <button onClick={resetFilter} className='btn-mini' type='button'>Reset filter</button>
          <button type="submit"  hidden/>
        </form>
        { products.length ? (products.map(product => (
          <ProductPreviewInList key={product.id} product={product} />
        ))) : <p>Not Found</p> }
        </div>
      )}
    </section>
  )
}