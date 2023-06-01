import React from 'react'
import { useAppSelector } from '../store/Store'
import CartItem from '../Components/CartItem'
import classes from './Checkout.module.css'
import CheckoutForm from '../Components/CheckoutForm'

const Checkout = () => {
  const cart = useAppSelector((state) => state.cart.products)

  const cartProducts = cart.map((prod) => (
    <CartItem key={prod.cartID} id={prod.id} cartID={prod.cartID} />
  ))
  return (
    <div className={classes.checkoutContainer}>
      {cart.length > 0 && (
        <div className={classes.productCards}>{cartProducts}</div>
      )}{' '}
      <CheckoutForm />
    </div>
  )
}

export default Checkout
