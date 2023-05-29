import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppDispatch } from '../store/Store'
import { fetchData } from '../store/productsStore'
import { useAppSelector } from '../store/Store'
import LinkLoader from '../UI/LinkLoader'
import classes from './Products.module.css'
import Skeleton from 'react-loading-skeleton'
import ProductCard from '../Components/ProductCard'
import { pushImages } from '../helpers'
import { sortPriceUp } from '../helpers'

export interface Product {
  id: string
  category: string
  brand: string
  description: string
  url: string
  color: string
  price: number
  size: number
  title: string
  quantity: number
  image: string
  images: string[]
  total: number
}
let initial = true
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

  const sorted = [...products].sort(sortPriceUp)

  const productsList = sorted.map((prod, idx) => (
    <li key={`${prod.id}${prod.title}`}>
      <Link to={`product-${prod.id}`}>
        {status === 'loading' ? <Skeleton /> : prod.title}
      </Link>
    </li>
  ))

  console.log(location.pathname)

  useEffect(() => {
    if (initial) {
      dispatch(fetchData())
      initial = false
    }
  }, [])

  const productsCards = sorted.map((prod) => (
    <ProductCard brand={prod.brand} name={prod.title} image={prod.images[0]} />
  ))

  return (
    <div className={classes.productsContainer}>
      <h1>Products</h1>
      <button
        onClick={() => {
          pushImages(products)
        }}
      >
        SEND
      </button>
      <div className={classes.mainContainer}>
        <div className={classes.sideBar}></div>
        <div className={classes.cardsContainer}>
          {/* <ProductCard
            brand='Adidas'
            name='Adidas Superstar'
            image='/shoes/superstar.png'
          /> */}
          {productsCards}
        </div>
      </div>

      {/* {status === 'loading' ? (
        <LinkLoader />
      ) : (
        <ul className={classes.list}>{productsList}</ul>
      )} */}
    </div>
  )
}

export default Products
