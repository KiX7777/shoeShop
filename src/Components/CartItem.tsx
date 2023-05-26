import React, { useRef } from 'react'
import classes from './CartItem.module.css'
import { useAppDispatch, useAppSelector } from '../store/Store'
import { cartActions } from '../store/cartStore'
import { Product } from '../pages/Products'
import { formatPrice } from '../helpers'

const CartItem = ({ id }: { id: string }) => {
  const cart = useAppSelector((state) => state.cart.products)
  const dispatch = useAppDispatch()
  const productitem = cart.find((prod) => prod.id === id) as Product
  const cardRef = useRef<HTMLDivElement>(null)

  function handleDelete(id: string) {
    cardRef.current?.classList.add(`${classes.remove}`)

    setTimeout(() => {
      dispatch(cartActions.delete(id))
    }, 500)
  }

  function handleAdd(prod: Product) {
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
    <div ref={cardRef} className={classes.productCard}>
      {' '}
      <img src={productitem?.image} alt='product image' />
      <div className={classes.cardTxt}>
        <p className={classes.productTitle}>
          {productitem?.title}
          <span className={classes.chosenSize}>{productitem?.id}</span>
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
            const prod = { ...productitem, quantity: 1 }
            handleAdd(prod)
          }}
        >
          <img src='/icon-plus.svg' alt='' />
        </button>
        <img
          src='/icon-delete.svg'
          className={classes.delete}
          alt='trash can icon'
          onClick={() => {
            handleDelete(id)
          }}
        />
        <button
          className={classes.minusBtn}
          onClick={() => {
            handleMinus(id)
          }}
        >
          <img src='/icon-minus.svg' alt='' />
        </button>
      </div>
    </div>
  )
}

export default CartItem
