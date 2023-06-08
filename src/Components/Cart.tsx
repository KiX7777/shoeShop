import classes from './Cart.module.css'
import { useAppDispatch, useAppSelector } from '../store/Store'
import { Link } from 'react-router-dom'
import CartItem from './CartItem'
import { formatPrice } from '../helpers'
import { useEffect } from 'react'
import { cartActions } from '../store/cartStore'

const Cart = () => {
  const isOpen = useAppSelector((state) => state.cart.isOpen)
  const cart = useAppSelector((state) => state.cart.products)
  const total = useAppSelector((state) => state.cart.total)
  const dispatch = useAppDispatch()
  const id = useAppSelector((state) => state.user.id)

  const cartProducts = cart.map((prod) => (
    <CartItem key={prod.cartID} id={prod.id} cartID={prod.cartID} />
  ))

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem('cart')!)
    if (localCart) {
      dispatch(cartActions.updateLocal(localCart))
    }
  }, [dispatch])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

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
            cart.length > 0
              ? ` ${classes.emptymsg}`
              : `${classes.emptymsg} ${classes.show}`
          }
        >
          Your cart is empty
        </p>
        {cartProducts}

        {/* <CartItem /> */}

        {/* <div className="productCard">
    <img src="/images/image-product-1-thumbnail.jpg" alt="" />
    <div className="cardTxt">
      <p className="productTitle">Fall Limited Edition Sneakers</p>
      <div className="cartPrices">
        <p className="productCardPrice">$125.00 x 3</p>
        <p className="productCardTotal">$375.00</p>
      </div>
    </div>
    <img src="/icon-delete.svg" id="delete" alt="" />
  </div> 
   <div className="productCard">
    <img src="/images/image-product-1-thumbnail.jpg" alt="" />
    <div className="cardTxt">
      <p className="productTitle">Fall Limited Edition Sneakers</p>
      <div className="cartPrices">
        <p className="productCardPrice">$125.00 x 3</p>
        <p className="productCardTotal">$375.00</p>
      </div>
    </div>
    <img src="/images/icon-delete.svg" id="delete" alt="" />
  </div>
  <div className="productCard">
    <img src="/images/image-product-1-thumbnail.jpg" alt="" />
    <div className="cardTxt">
      <p className="productTitle">Fall Limited Edition Sneakers</p>
      <div className="cartPrices">
        <p className="productCardPrice">$125.00 x 3</p>
        <p className="productCardTotal">$375.00</p>
      </div>
    </div>
    <img src="/images/icon-delete.svg" id="delete" alt="" />
  </div>
  <div className="productCard">  */}
      </div>
      <div className={classes.checkout}>
        {total > 0 && <p className={classes.total}>{formatPrice(total)}</p>}
        {/* <Link to='/checkout'></Link> */}

        {
          <Link
            to='/checkout'
            id='checkout'
            className={
              cart.length > 0
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
