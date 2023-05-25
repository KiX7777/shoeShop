import classes from './Cart.module.css'
import { useAppSelector } from '../store/Store'
import CartItem from './CartItem'

const Cart = () => {
  const isOpen = useAppSelector((state) => state.cart.isOpen)
  const cart = useAppSelector((state) => state.cart.products)

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
      <div className={classes.cartProducts}>
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

        <button
          type='button'
          id='checkout'
          className={cart.length > 0 ? `${classes.show}` : ``}
        >
          Checkout
        </button>
      </div>
    </div>
  )
}

export default Cart
