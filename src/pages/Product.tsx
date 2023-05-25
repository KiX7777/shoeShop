import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/Store'
import { Product } from './Products'
import { useNavigate } from 'react-router-dom'
import { cartActions } from '../store/cartStore'
import classes from './Product.module.css'

const ProductItem = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const products = useAppSelector<Product[]>((state) => state.products.products)
  const cart = useAppSelector((state) => state.cart.products)
  const params = useParams()
  const id = +params.product!.slice(8)
  const product = products.find((prod) => prod.id === id) as Product

  function handleAddToCart(prod: Product) {
    dispatch(cartActions.add(prod))
  }
  function handleRemoveFromCart(id: number) {
    dispatch(cartActions.remove(id))
  }
  return (
    <div>
      <button
        onClick={() => {
          navigate(-1)
        }}
      >
        ◀️
      </button>
      <h1>{product?.title}</h1>
      <h2>{`${product?.price}€`}</h2>
      <p>{product?.description}</p>
      <img src={product?.image} alt='' className={classes.productImg} />
      <button
        onClick={() => {
          handleAddToCart(product)
        }}
      >
        ADD TO CART
      </button>
      <button
        onClick={() => {
          handleRemoveFromCart(product.id)
        }}
      >
        REMOVE FROM CART
      </button>
      <button
        onClick={() => {
          console.log(...cart)
        }}
      >
        CART STATUS
      </button>
    </div>
  )
}

export default ProductItem
