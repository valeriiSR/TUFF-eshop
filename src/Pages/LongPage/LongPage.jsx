import React, { useEffect } from 'react'
import LandProdustsList from '../../components/LandProdustsList/LandProdustsList'
import LandCategoriesList from '../../components/LandCategoriesList/LandCategoriesList'
import MainBunner from '../../components/MainBunner/MainBunner'
import { useDispatch, useSelector } from 'react-redux';
import { filterByPrice } from '../../features/products/productsSlice';


export default function LongPage() {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories);
  const products = useSelector(state => state.products);

  useEffect(() => {
    if (!products.list.length) return;

    dispatch(filterByPrice(100));
  }, [dispatch, products.list.length])
  
  // console.log(products);

  return (
    <>
      {products.related.length ? (
        <LandProdustsList title='Related products' amount={5} list={products.related} isLoading={products.isLoading} />
      ) : (
        <LandProdustsList title='Trending' amount={5} list={products.list} isLoading={products.isLoading} />
      )}
      
      <LandCategoriesList title='Worth seeing' amount={5} {...categories} />
      <MainBunner />
      <LandProdustsList title='Less than 100$' amount={5} list={products.filtered} isLoading={products.isLoading} />
    </>
  )
}
