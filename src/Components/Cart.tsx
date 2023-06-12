import classes from './Cart.module.css'
import { useAppDispatch, useAppSelector } from '../store/Store'
import { Link } from 'react-router-dom'
import CartItem from './CartItem'
import { formatPrice } from '../helpers/helpers'
import { useEffect } from 'react'
import { cartActions } from '../store/cartStore'

const localCart = JSON.parse(localStorage.getItem('cart')!)

const Cart = () => {
  const isOpen = useAppSelector((state) => state.cart.isOpen)
  const cartProducts = useAppSelector((state) => state.cart.products)
  const cart = useAppSelector((state) => state.cart)
  let total = useAppSelector((state) => state.cart.total)

  const dispatch = useAppDispatch()

  const cartProductsItems = cartProducts.map((prod) => (
    <CartItem key={prod.cartID} id={prod.id} cartID={prod.cartID} />
  ))

  useEffect(() => {
    if (localCart) {
      dispatch(cartActions.updateLocal(localCart))
    }
  }, [dispatch])

  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cartProducts, cart])

  return (
    <div
      data-testid='cartContainer'
      className={
        isOpen
          ? `${classes.cartContainer} ${classes.openCart}`
          : `${classes.cartContainer}`
      }
    >
      <span>Cart</span>
      <div className={classes.cartProducts} data-testid='cartProducts'>
        <p
          className={
            cartProducts.length > 0
              ? ` ${classes.emptymsg}`
              : `${classes.emptymsg} ${classes.show}`
          }
        >
          Your cart is empty
        </p>
        {cartProductsItems}
      </div>
      <div className={classes.checkout}>
        {total > 0 && <p className={classes.total}>{formatPrice(total)}</p>}

        {
          <Link
            to='/checkout'
            id='checkout'
            onClick={() => {
              dispatch(cartActions.closeCart())
            }}
            className={
              cartProducts.length > 0
                ? `${classes.show} ${classes.checkoutBtn}`
                : `${classes.checkoutBtn}`
            }
          >
            Checkout
          </Link>
        }
      </div>
    </div>
  )
}

export default Cart
