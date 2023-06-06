import React, { useRef } from 'react'
import classes from './CartItem.module.css'
import { useAppDispatch, useAppSelector } from '../store/Store'
import { cartActions } from '../store/cartStore'
import { Product } from '../pages/Products'
import { formatPrice } from '../helpers'
import { CartProduct } from '../store/cartStore'

const CartItem = ({ id, cartID }: { id: string; cartID: string }) => {
  const cart = useAppSelector((state) => state.cart.products)
  const dispatch = useAppDispatch()
  const productitem = cart.find((prod) => prod.cartID === cartID) as Product
  const cardRef = useRef<HTMLDivElement>(null)

  function handleDelete(id: string) {
    cardRef.current?.classList.add(`${classes.remove}`)

    setTimeout(() => {
      dispatch(cartActions.delete(id))
    }, 500)
  }

  function handleAdd(prod: CartProduct) {
    dispatch(cartActions.add(prod))
  }
  function handleMinus(id: string) {
    if (productitem.quantity === 1) {
      cardRef.current?.classList.add(`${classes.remove}`)

      setTimeout(() => {
        cardRef.current?.classList.remove(`${classes.remove}`)
        dispatch(cartActions.remove(id))
      }, 501)
    } else {
      dispatch(cartActions.remove(id))
    }
  }

  return (
    <div ref={cardRef} className={classes.productCard} data-testid='cartItem'>
      {' '}
      <img src={productitem?.images[0]} alt='product image' />
      <div className={classes.cardTxt}>
        <p className={classes.productTitle}>
          {productitem?.title}
          <span className={classes.chosenSize}>{productitem?.size}</span>
        </p>
        <div className={classes.cartPrices}>
          <p className={classes.productCardPrice}>
            {formatPrice(productitem.price)} x {productitem?.quantity}
          </p>
          <p className={classes.productCardTotal}>
            {formatPrice(productitem.total)}
          </p>
        </div>
      </div>
      <div className={classes.buttons}>
        <button
          className={classes.plusBtn}
          onClick={() => {
            const prod = {
              ...productitem,
              quantity: 1,
              thumb: productitem.images[0],
              cartID: `${productitem.id}${
                productitem.size
              }${productitem.title.slice(0, 10)}`,
            }
            handleAdd(prod)
          }}
        >
          <img src='/icon-plus.svg' alt='' />
        </button>
        <img
          src='/icon-delete.svg'
          className={classes.delete}
          alt='trash can icon'
          data-testid='deleteBtn'
          onClick={() => {
            handleDelete(cartID)
          }}
        />
        <button
          className={classes.minusBtn}
          onClick={() => {
            handleMinus(cartID)
          }}
        >
          <img src='/icon-minus.svg' alt='' />
        </button>
      </div>
    </div>
  )
}

export default CartItem
