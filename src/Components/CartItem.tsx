import React from 'react'
import classes from './CartItem.module.css'
import { useAppDispatch, useAppSelector } from '../store/Store'
import { cartActions } from '../store/cartStore'

const CartItem = ({ id }: { id: number }) => {
  const cart = useAppSelector((state) => state.cart.products)
  const dispatch = useAppDispatch()
  const productitem = cart.find((prod) => prod.id === id)

  function handleDelete(id: number) {
    dispatch(cartActions.delete(id))
  }

  return (
    <div className={classes.productCard}>
      {' '}
      <img src={productitem?.image} alt='product image' />
      <div className={classes.cardTxt}>
        <p className={classes.productTitle}>
          {productitem?.title}
          <span className={classes.chosenSize}>{productitem?.id}</span>
        </p>
        <div className={classes.cartPrices}>
          <p className={classes.productCardPrice}>
            €{productitem?.price} x {productitem?.quantity}
          </p>
          <p className={classes.productCardTotal}>€{productitem?.total}</p>
        </div>
      </div>
      <img
        src='/icon-delete.svg'
        className={classes.delete}
        alt='trash can icon'
        onClick={() => {
          handleDelete(id)
        }}
      />
    </div>
  )
}

export default CartItem
