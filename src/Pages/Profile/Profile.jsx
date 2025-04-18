import React, { useEffect, useState } from 'react'
import styles from './Profile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../features/user/userSlice';

export default function Profile() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(({ user }) => user);

  const [values, setValues] = useState({
      name: "",
      email: "",
      password: "", 
      avatar: "", 
    });
  
  useEffect(() => {
    if (currentUser) {
      setValues({ ... currentUser})
    }
    
  }, [currentUser])

  const handleChange = ({ target: {value, name} }) => {
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = (e) => {
      e.preventDefault();
  
      const isNotEmpty = Object.values(values).every(val => val);
      if (!isNotEmpty) return;
  
      const data = {data: values, id: currentUser.id};
      dispatch(updateUser(data));
  }

  

  return (
    <section className={styles.profile}>
      <h1 className={styles.title}>Profile</h1>
      { !currentUser ? <span>You need to login</span> : (
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
            style={{marginBottom: '1.6rem'}}
            className={styles.userInput} 
            type="text" 
            name="avatar" 
            value={values.avatar} 
            placeholder='Enter your avatar'
            autoComplete='off'
            required
          />
          <button 
            className='btn-big' 
            type='submit'>
              Update user data
          </button>
        </form>
      )}
    </section>
  )
}
