import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppDispatch } from '../store/Store'
import { fetchData } from '../store/productsStore'
import { useAppSelector } from '../store/Store'
import LinkLoader from '../UI/LinkLoader'
import classes from './Products.module.css'
import Skeleton from 'react-loading-skeleton'

export interface Product {
  id: number
  category: string
  description: string
  image: string
  price: number
  title: string
  rating: {
    rate: number
    count: number
  }
}

// let proizvod = {
//   category: "men's clothing",
//   description:
//     'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
//   id: 1,
//   image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
//   price: 109.95,
//   favorite: false,
//   rating: { rate: 3.9, count: 120 },
//   title: 'Fjallraven - Foldsack No. 1 Backpack, Fits',
// }

const Products = () => {
  const location = useLocation()
  const products = useAppSelector<Product[]>((state) => state.products.products)
  const status = useAppSelector((state) => state.products.status)
  const dispatch = useAppDispatch()

  const productsList = products.map((prod, idx) => (
    <li key={prod.id}>
      <Link to={`product-${prod.id}`}>
        {status === 'loading' ? <Skeleton /> : prod.title}
      </Link>
    </li>
  ))

  console.log(location.pathname)

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])

  return (
    <>
      <h1>Products</h1>
      {status === 'loading' ? (
        <LinkLoader />
      ) : (
        <ul className={classes.list}>{productsList}</ul>
      )}
      <button
        onClick={() => {
          console.log(products)
        }}
      >
        LOG
      </button>
    </>
  )
}

export default Products
