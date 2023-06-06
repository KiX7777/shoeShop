import React from 'react'
import classes from './Login.module.css'
import { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Order } from '../store/cartStore'
import { firebaseConfig } from '../firebase'
import { CartProduct } from '../store/cartStore'
import { GoogleLogin } from '../store/userStore'

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
      {!userStore.loggedIn && (
        <div className={classes.loginSwitch}>
          <label htmlFor='switch'>Login</label>
          <input
            type='checkbox'
            id='switch'
            onChange={(e) => {
              setloginMode(!e.target.checked)
            }}
          />
          <label htmlFor='switch'>Sign Up</label>
        </div>
      )}
      {!userStore.loggedIn && (
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
                <label htmlFor='emailLogin' placeholder='Your email'>
                  Email
                </label>
                <input
                  type='email'
                  id='emailLogin'
                  {...formik.getFieldProps('email')}
                />
                {formik.errors.email && formik.touched.email ? (
                  <p className={classes.error}>Email is not valid</p>
                ) : null}
              </div>
              <div className={classes.fieldContainer}>
                <label htmlFor='passwordcheck' placeholder='Your password'>
                  Password
                </label>
                <input
                  type='password'
                  id='passwordcheck'
                  {...formik.getFieldProps('password')}
                />
                {formik.errors.password && formik.touched.password ? (
                  <p className={classes.error}>{formik.errors.password}</p>
                ) : null}
              </div>

              <div className={classes.btns}>
                <button className={classes.loginBtn} type='submit'>
                  {!loginMode ? 'SIGN UP' : 'LOGIN'}
                </button>

                <button
                  className={classes.googleBtn}
                  onClick={(e) => {
                    e.preventDefault()
                    dispatch(GoogleLogin(userStore.password))
                  }}
                >
                  <div className={classes.googlebtn}>
                    <div className={classes.google_icon_wrapper}>
                      <img className={classes.google_icon} src='/google.png' />
                    </div>
                    <p className={classes.btn_text}>
                      {!loginMode
                        ? 'Sign up with Google'
                        : 'Sign in with Google'}
                    </p>
                  </div>
                </button>
              </div>
            </form>
          )}
        </Formik>
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
    </div>
  )
}

export default Login
