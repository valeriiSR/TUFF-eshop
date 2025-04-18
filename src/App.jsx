import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './utils/router';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCategories } from './features/categories/categoriesSlice';
import { getProducts } from './features/products/productsSlice';

// Разработка магазина Продолжи с 03.42.00
// Вёрстка продолжи с 01:01:41

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getProducts())
  }, [dispatch])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
