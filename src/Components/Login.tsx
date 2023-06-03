import React from 'react'
import classes from './Login.module.css'
import { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Order } from '../store/cartStore'
import { firebaseConfig } from '../firebase'

import { CartProduct } from '../store/cartStore'

import {
  getUserData,
  updateUsername,
  // getData,
} from '../hooks/useFirebaseEmailPasswordAuth'
import useFirebaseEmailPasswordAuth from '../hooks/useFirebaseEmailPasswordAuth'
import { useAppDispatch, useAppSelector } from '../store/Store'
import { signUp, logIn, logout } from '../store/userStore'

export interface User {
  username: string
  password: string
  email: string
}

const initialValues: User = {
  username: '',
  password: '',
  email: '',
}

const Login = () => {
  const userStore = useAppSelector((state) => state.user)
  const cart = useAppSelector((state) => state.cart)
  const dispatch = useAppDispatch()
  const [loginMode, setloginMode] = useState(true)
  const [emailSignUp, emailLogin] = useFirebaseEmailPasswordAuth()
  const specialRegex = /^[\p{L}0-9 .]+$/gu
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return (
    <div className={classes.loginContainer}>
      {!userStore.loggedIn ? (
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            // username: Yup.string()
            //   .required('You must select a username.')
            //   .matches(specialRegex),
            username: Yup.string().when('loginMode', (username) =>
              username
                ? Yup.string()
                : Yup.string()
                    .required('You must provide a username')
                    .matches(specialRegex)
            ),
            email: Yup.string()
              .required('Email is required')
              .matches(emailRegex),
            password: Yup.string()
              .required('You must provide a password')
              .min(6, 'Must be at least six characters long'),
          })}
          onSubmit={(values, { resetForm }) => {
            const user = {
              username: values.username,
              password: values.password,
              email: values.email,
              cart: cart.products,
            }
            if (userStore.loggedIn) {
              alert('Already logged in!')
              return
            } else {
              if (!loginMode) {
                // emailSignUp(values.email, values.password).then((res) =>
                //   console.log(res)
                // )
                dispatch(signUp(user))

                resetForm()
              } else {
                dispatch(logIn([user.email, user.password]))

                return
              }
            }
          }}
        >
          {(formik) => (
            <form className={classes.login} onSubmit={formik.handleSubmit}>
              {!loginMode && (
                <div className={classes.fieldContainer}>
                  <label
                    htmlFor='username'
                    id='username'
                    placeholder='Your username'
                    defaultValue={loginMode ? 'login' : ''}
                  >
                    Username
                  </label>
                  <input
                    type='username'
                    id='username'
                    {...formik.getFieldProps('username')}
                  />
                  {formik.errors.username && formik.touched.username ? (
                    <p className={classes.error}>{formik.errors.username}</p>
                  ) : null}
                </div>
              )}
              <div className={classes.fieldContainer}>
                <label htmlFor='email' id='email' placeholder='Your email'>
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  {...formik.getFieldProps('email')}
                />
                {formik.errors.email && formik.touched.email ? (
                  <p className={classes.error}>Email is not valid</p>
                ) : null}
              </div>
              <div className={classes.fieldContainer}>
                <label
                  htmlFor='password'
                  id='password'
                  placeholder='Your password'
                >
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  {...formik.getFieldProps('password')}
                />
                {formik.errors.password && formik.touched.password ? (
                  <p className={classes.error}>{formik.errors.password}</p>
                ) : null}
              </div>
              {!userStore.loggedIn && (
                <button className={classes.loginBtn} type='submit'>
                  {!loginMode ? 'SIGN UP' : 'LOGIN'}
                </button>
              )}
            </form>
          )}
        </Formik>
      ) : (
        <h1>Hello, {userStore.userName}</h1>
      )}
      {userStore.loggedIn && (
        <button
          className={classes.loginBtns}
          type='button'
          onClick={() => {
            dispatch(logout())
          }}
        >
          LOG OUT
        </button>
      )}
      <button
        className={classes.loginBtns}
        type='button'
        onClick={() => {
          getUserData()
          // getData()
          console.log(userStore)
        }}
      >
        GET USER INFO
      </button>
    </div>
  )
}

export default Login
