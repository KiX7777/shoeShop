import classes from './Cart.module.css'
import { useAppSelector } from '../store/Store'
import CartItem from './CartItem'
import { formatPrice } from '../helpers'
import { uuid } from 'uuidv4'
import { useEffect } from 'react'

const Cart = () => {
  const isOpen = useAppSelector((state) => state.cart.isOpen)
  const cart = useAppSelector((state) => state.cart.products)
  const total = useAppSelector((state) => state.cart.total)

  const cartProducts = cart.map((prod) => (
    <CartItem key={prod.id} id={prod.id} />
  ))

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
        <button
          type='button'
          id='checkout'
          onClick={() => {
            console.log(cart)
          }}
          className={
            cart.length > 0
              ? `${classes.show} ${classes.checkoutBtn}`
              : `${classes.checkoutBtn}`
          }
        >
          Checkout
        </button>
      </div>
    </div>
  )
}

export default Cart
