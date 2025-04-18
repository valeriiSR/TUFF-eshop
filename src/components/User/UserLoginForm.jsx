import React from 'react';
import { useState } from 'react';
import styles from './UserSingUpForm.module.css';
import { useDispatch } from 'react-redux';
import { toggleForm, loginUser, toggleSingupORLogin } from '../../features/user/userSlice'; 
import CloseBtn from '../Icons/CloseBtn';
import '../../App.css';
import { FORMTYPE } from '../../utils/constants';

export default function UserLoginForm() {
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    email: "",
    password: "", 
  });

  const handleChange = ({ target: {value, name} }) => {
    setValues({ ...values, [name]: value })
  }

  const handleCloseModal = (e) => {
    if (e.target.classList.contains('closeModal')) {
      dispatch(toggleForm(false));
    }
  }

   const handleSwitchToLogin = () => {
    dispatch(toggleSingupORLogin(FORMTYPE.SIGNUP));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const isNotEmpty = Object.values(values).every(val => val);
    if (!isNotEmpty) return;

    dispatch(loginUser(values));
    dispatch(toggleForm(false));
  }


  return (
    <div onClick={handleCloseModal} className="overlay closeModal">
      <div className={styles.wrapper}>
        <CloseBtn handleClick={handleCloseModal} />
        <h4 className={styles.title}>Log In</h4>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input 
            onChange={handleChange} 
            className={styles.userInput} 
            type="text" 
            name="email" 
            value={values.email} 
            autoComplete='off'
            placeholder='Enter Email'
            required
          />
          <input 
            onChange={handleChange} 
            className={styles.userInput} 
            type="password" 
            name="password" 
            value={values.password} 
            placeholder='Enter Password'
            autoComplete='off'
            required
          />
          <p 
            className={styles.haveAccaunt}
            onClick={handleSwitchToLogin}
            >
              Create an accaunt
          </p>
          <button 
            className='btn-big' 
            type='submit'>
              Login
          </button>
        </form>
      </div>
    </div>
  )
}
