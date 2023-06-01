import React from 'react'
import classes from './Login.module.css'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { firebaseConfig } from '../firebase'
import useFirebaseEmailPasswordAuth from '../hooks/useFirebaseEmailPasswordAuth'

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
  const [emailSignUp, emailLogin] = useFirebaseEmailPasswordAuth()
  const specialRegex = /^[\p{L}0-9 .]+$/gu
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        username: Yup.string()
          .required('You must select a username.')
          .matches(specialRegex),
        email: Yup.string().required('Email is required').matches(emailRegex),
        password: Yup.string()
          .required('You must provide a password')
          .min(6, 'Must be at least six characters long'),
      })}
      onSubmit={(values, { resetForm }) => {
        const user: User = {
          username: values.username,
          password: values.password,
          email: values.email,
        }
        console.log(user)
        emailSignUp(values.email, values.password).then((res) =>
          console.log(res)
        )
        resetForm()
      }}
    >
      {(formik) => (
        <form className={classes.login} onSubmit={formik.handleSubmit}>
          <div className={classes.fieldContainer}>
            <label htmlFor='username' id='username' placeholder='Your username'>
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
          <div className={classes.fieldContainer}>
            <label htmlFor='email' id='email' placeholder='Your email'>
              Email
            </label>
            <input type='email' id='email' {...formik.getFieldProps('email')} />
            {formik.errors.email && formik.touched.email ? (
              <p className={classes.error}>Email is not valid</p>
            ) : null}
          </div>
          <div className={classes.fieldContainer}>
            <label htmlFor='password' id='password' placeholder='Your password'>
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
          <button type='submit'>SIGN UP</button>
        </form>
      )}
    </Formik>
  )
}

export default Login
