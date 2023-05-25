import React from 'react'
import { Product } from '../pages/Products'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../store/Store'
import { useEffect } from 'react'
import { fetchData } from '../store/productsStore'

const ProductsList = ({ products }: { products: Product[] }) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])
  return (
    <ul>
      {products.map((prod) => (
        <li key={prod.id}>
          <Link to={`product-${prod.id}`}>{prod.title}</Link>
        </li>
      ))}
    </ul>
  )
}

export default ProductsList
