import React from 'react';
import { useSelector } from 'react-redux';
import UserSingUpForm from './UserSingUpForm';
import UserLoginForm from './UserLoginForm';

export default function UserForm() {
  const { showForm, formType } = useSelector(({ user }) => user);

  if (showForm) {
    if (formType === "signup") return <UserSingUpForm />
    if (formType === "login") return <UserLoginForm />
  }
}
