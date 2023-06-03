import React from 'react'
import classes from './CheckoutForm.module.css'
import { Formik } from 'formik'
import { useAppDispatch, useAppSelector } from '../store/Store'
import { cartActions } from '../store/cartStore'
import { sendOrder } from '../store/userStore'
import * as Yup from 'yup'
import { Order } from '../store/cartStore'
import { pushOrder } from '../hooks/useFirebaseEmailPasswordAuth'

interface FormValues {
  firstName: string
  lastName: string
  address: string
  phone: string
  email: string
}
export interface OrderProduct {
  name: string
  quantity: number
  size: number
  total: number
  price: number
  id: string
}

const CheckoutForm = () => {
  const dispatch = useAppDispatch()
  const cartProducts = useAppSelector((state) => state.cart.products)
  const isOrdering = useAppSelector((state) => state.user.isOrdering)
  const orderError = useAppSelector((state) => state.user.error)
  const id = useAppSelector((state) => state.user.id)
  console.log(id)
  let orderedProducts = cartProducts.map((prod) => {
    const product: OrderProduct = {
      name: prod.title,
      quantity: prod.quantity,
      size: prod.size,
      total: prod.total,
      id: prod.id,
      price: prod.price,
    }
    return product
  })
  const cartTotal = useAppSelector((state) => state.cart.total)
  const initialValues: FormValues = {
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    email: '',
  }
  const date = new Date().toLocaleString()
  const nameRegex = /^[\p{L} ]+$/gu
  const phoneRegex = /\+385[0-9]{8,9}$/
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const specialRegex = /^[\p{L}0-9 .]+$/gu

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .required('Required!')
          .matches(nameRegex, 'Must only contain letters.'),
        lastName: Yup.string()
          .required('Required')
          .matches(nameRegex, 'Must only contain letters.'),
        address: Yup.string().required('Required').matches(specialRegex),
        phone: Yup.string().required('Required').matches(phoneRegex),
        email: Yup.string().required('Required').matches(emailRegex),
      })}
      onSubmit={(values) => {
        let order: Order = {
          firstName: values.firstName,
          lastName: values.lastName,
          address: values.address,
          email: values.email,
          phone: values.phone,
          products: orderedProducts,
          total: cartTotal,
          date: date,
        }
        console.log(order)
        dispatch(sendOrder({ id, order }))
        // pushOrder(username, order)
        if (!isOrdering && !orderError) {
          dispatch(cartActions.reset())
        }
      }}
    >
      {(formik) => (
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <div className={classes.fieldContainer}>
            <label htmlFor='firstName'>First Name</label>
            <input
              type='text'
              placeholder='First name'
              id='firstName'
              {...formik.getFieldProps('firstName')}
            />
            {formik.errors.firstName && formik.touched.firstName ? (
              <p className={classes.error}>{formik.errors.firstName}</p>
            ) : null}
          </div>
          <div className={classes.fieldContainer}>
            <label htmlFor='lastName'>Last Name</label>
            <input
              type='text'
              placeholder='Last name'
              id='lastName'
              {...formik.getFieldProps('lastName')}
            />
            {formik.errors.lastName && formik.touched.lastName ? (
              <p className={classes.error}>{formik.errors.lastName}</p>
            ) : null}
          </div>
          <div className={classes.fieldContainer}>
            <label htmlFor='firstName'>Email</label>
            <input
              type='email'
              placeholder='Email'
              id='email'
              {...formik.getFieldProps('email')}
            />
            {formik.errors.email && formik.touched.email ? (
              <p className={classes.error}>{formik.errors.email}</p>
            ) : null}
          </div>
          <div className={classes.fieldContainer}>
            <label htmlFor='address'>Address</label>
            <input
              {...formik.getFieldProps}
              type='text'
              placeholder='Address'
              id='address'
              {...formik.getFieldProps('address')}
            />
            {formik.errors.address && formik.touched.address ? (
              <p className={classes.error}>{formik.errors.address}</p>
            ) : null}
          </div>
          <div className={classes.fieldContainer}>
            <label htmlFor='phone'>Phone Number</label>
            <input
              {...formik.getFieldProps}
              type='tel'
              placeholder='+385xxxxxxxx(x)'
              id='phone'
              {...formik.getFieldProps('phone')}
            />
            {formik.errors.phone && formik.touched.phone ? (
              <p className={classes.error}>{formik.errors.phone}</p>
            ) : null}
          </div>
          <button type='submit'>Send Order</button>
        </form>
      )}
    </Formik>
  )
}

export default CheckoutForm
