import React, { useEffect, useState } from 'react';
import { Form, Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';
import topLogo from '../../images/logo.png';
import userLogo from '../../images/UI/user-logo.png';
import favoriteIcon from '../../images/UI/favorite.svg';
import cartIcon from '../../images/UI/cart.svg';
import './TopNavigation.css';
import { useSelector, useDispatch } from 'react-redux';
import { toggleForm, toggleSingupORLogin } from '../../features/user/userSlice';
import { FORMTYPE } from '../../utils/constants';
import { getProductsBySearch } from '../../features/products/productsSlice';

export default function TopNavigation () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchString, setSearchString] = useState('');
  const { currentUser, cart, favorites } = useSelector( state  => state.user);
  const { findBySearch } = useSelector(({products}) => products);
  const [values, setValues] = useState({ name: 'Guest', avatar: userLogo });
  const [searchResult, setSearchResult] = useState([]);
  const [initSearch, setInitSearch] = useState(false);

  console.log(favorites);

  useEffect(() => {
    if (!currentUser) return;

    setValues(currentUser);
  }, [currentUser]);

  useEffect(() => {
    if(initSearch) {
      setSearchResult(findBySearch);
    }
  }, [findBySearch, initSearch])
  
  const handleSearch = ({ target: { value } }) => {
    setSearchString( value )
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setInitSearch(true);
    dispatch(getProductsBySearch({title: searchString}))
  }

  const handleClick = () => {
    if (!currentUser) {
      dispatch(toggleSingupORLogin(FORMTYPE.SIGNUP))
      dispatch(toggleForm(true));
    } else {
      navigate(ROUTES.PROFILE);
    }
  }

  const resetSearch = () => {
    setSearchString("");
    setInitSearch(false);
    setSearchResult([]);
  }

  return (
    <div className="top-container">
      <Link to="/"><img className='top-logo' src={topLogo} alt="Logo" /></Link>
      <div className="user-logo">
        <div className="user-logo__wrapper">
          <img src={values.avatar} alt="User logo" />
        </div>
        <p onClick={handleClick} className="user-name">{values.name}</p>
      </div>
      <form className="search-form" onSubmit={handleSearchSubmit}>
        <input 
          className="search-form__input" 
          type="text" 
          name="search" 
          onChange={handleSearch} 
          value={searchString} 
          placeholder='Search for anything...' 
          autoComplete='off' />

          {searchResult.length ? (
            <div className="search-form__results-wrapper">
            {searchResult.slice(0,10).map(item => (
              <Link onClick={resetSearch} key={item.id} to={`/product/${item.id}`} className="search-form__results-item">
                <div className='previewImage' style={{ backgroundImage: `url(${item.images[0]})` }}></div>
                <p className='previewTitle'>{item.title}</p>
              </Link>
            ))}
            </div>
          ) : <></>}
      </form>
      <div className="shop-icons">
        <Link to={ROUTES.FAVORITES} >
        <img className="shop-icons__item" src={favoriteIcon} alt="Favirite icon" />
        </Link>
        <div className="shop-icons__card-wrapper">
          <Link to={ROUTES.CART}>
            <img className="shop-icons__item" src={cartIcon} alt="Shop cart icon" />
            {!!cart.length && <span className="shop-icons__counter">{cart.length}</span>}
          </Link>
        </div>
      </div>
    </div>
  )
}
