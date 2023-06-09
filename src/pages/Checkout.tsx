import React from 'react'
import { useAppSelector } from '../store/Store'
import CartItem from '../Components/CartItem'
import classes from './Checkout.module.css'
import CheckoutForm from '../Components/CheckoutForm'
import { formatPrice } from '../helpers'

const Checkout = () => {
  const cart = useAppSelector((state) => state.cart)

  const cartProducts = cart.products.map((prod) => (
    <CartItem key={prod.cartID} id={prod.id} cartID={prod.cartID} />
  ))
  return (
    <div className={classes.checkoutContainer}>
      {cart.products.length > 0 && (
        <div className={classes.productCards}>
          {cartProducts}
          <p className={classes.totalCheckout}>={formatPrice(cart.total)}</p>
        </div>
      )}
      <CheckoutForm />
    </div>
  )
}

export default Checkout
