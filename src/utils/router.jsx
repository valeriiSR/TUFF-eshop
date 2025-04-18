import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from './routes';
import NotFound from '../Pages/NotFound/NotFound';
import Layout from '../components/Layout';
import Cart from '../Pages/Cart/Cart';
import Favorites from '../Pages/Favorites/Favorites';
import SingleProduct from '../components/SingleProduct/SingleProduct';
import Home from '../components/Home/Home';
import Profile from '../Pages/Profile/Profile';
import SearchResults from '../Pages/SearchResults/SearchResults';
import Products from '../components/Products/Products';

export  const router = createBrowserRouter([
  { path: ROUTES.HOME, element: <Layout />, children: [
    { index: true, element: <Home /> },
    { path: ROUTES.CART, element: <Cart/> },
    { path: ROUTES.PRODUCT, element: <SingleProduct /> },
    { path: ROUTES.FAVORITES, element: <Favorites /> },
    { path: ROUTES.PROFILE, element: <Profile /> },
    { path: ROUTES.SEARCH, element: <SearchResults /> },
    { path: ROUTES.CATEGORY, element: <Products /> },
    { path: "*", element: <NotFound /> },
  ]},
])