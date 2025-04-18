import React from 'react';
import { useState } from 'react';
import styles from './UserSingUpForm.module.css';
import { useDispatch } from 'react-redux';
import { toggleForm, createUser, toggleSingupORLogin } from '../../features/user/userSlice'; 
import CloseBtn from '../Icons/CloseBtn';
import '../../App.css';
import { FORMTYPE } from '../../utils/constants';

export default function UserSingUpForm() {
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "", 
    avatar: "", 
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
    dispatch(toggleSingupORLogin(FORMTYPE.LOGIN));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const isNotEmpty = Object.values(values).every(val => val);
    if (!isNotEmpty) return;

    dispatch(createUser(values));
    dispatch(toggleForm(false));
  }


  return (
    <div onClick={handleCloseModal} className="overlay closeModal">
      <div className={styles.wrapper} >
        <CloseBtn handleClick={handleCloseModal} />
        <h4 className={styles.title}>Register</h4>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input 
            onChange={handleChange} 
            className={styles.userInput} 
            type="text" 
            name="name" 
            value={values.name} 
            placeholder='Enter Name'
            autoComplete='off'
            required
          />
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
          <input 
            onChange={handleChange} 
            className={styles.userInput} 
            type="text" 
            name="avatar" 
            value={values.avatar} 
            placeholder='Enter your avatar'
            autoComplete='off'
            required
          />
          <p 
            className={styles.haveAccaunt}
            onClick={handleSwitchToLogin}
            >
              I already have an accaunt
          </p>
          <button 
            className='btn-big' 
            type='submit'>
              Create an account
          </button>
        </form>
      </div>
    </div>
  )
}
