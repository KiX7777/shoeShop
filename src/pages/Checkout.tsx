import React from 'react'
import { useAppSelector } from '../store/Store'
import CartItem from '../Components/CartItem'
import classes from './Checkout.module.css'

const Checkout = () => {
  const cart = useAppSelector((state) => state.cart.products)

  const cartProducts = cart.map((prod) => (
    <CartItem key={prod.id} id={prod.id} />
  ))
  return (
    <div className={classes.checkoutContainer}>
      <h1>Checkout</h1>
      {cart.length > 0 && (
        <div className={classes.productCards}>{cartProducts}</div>
      )}{' '}
    </div>
  )
}

export default Checkout
