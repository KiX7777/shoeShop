import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppDispatch } from '../store/Store'
import { fetchData } from '../store/productsStore'
import { useAppSelector } from '../store/Store'
import LinkLoader from '../UI/LinkLoader'
import classes from './Products.module.css'
import { productsActions } from '../store/productsStore'
import Skeleton from 'react-loading-skeleton'
import ProductCard from '../Components/ProductCard'
import { pushImages } from '../helpers'
import {
  sortPriceUp,
  sortNameAsc,
  sortNameDesc,
  sortPriceDown,
} from '../helpers'

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
  // const [sort, setsort] = useState<string>('priceDesc')

  let sort = 'priceDesc'

  // let sorted = [...products]

  function handleSort() {
    let arr
    switch (sort) {
      case 'priceAsc':
        arr = [...products].sort(sortPriceUp)
        dispatch(productsActions.sort(arr))
        break
      case 'priceDesc':
        arr = [...products].sort(sortPriceDown)
        dispatch(productsActions.sort(arr))
        break
      case 'nameAsc':
        arr = [...products].sort(sortNameAsc)
        dispatch(productsActions.sort(arr))
        break
      case 'nameDesc':
        arr = [...products].sort(sortNameDesc)
        dispatch(productsActions.sort(arr))
        break
      default:
        break
    }
  }

  const productsList = products.map((prod, idx) => (
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

  const productsCards = products.map((prod) => (
    <ProductCard
      key={`${prod.id}${prod.title}`}
      brand={prod.brand}
      name={prod.title}
      image={prod.images[0]}
      id={prod.id}
      price={prod.price}
    />
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
        <div className={classes.sideBar}>
          <div className={classes.sortContainer}>
            <select
              name='sort'
              id='sort'
              defaultValue={'empty'}
              onChange={(e) => {
                sort = e.target.value
                console.log(e.target.value)
                handleSort()
              }}
            >
              <option disabled value='empty'>
                Sort
              </option>
              <option value='priceAsc'>Price &uarr;</option>
              <option value='priceDesc'>Price &darr; </option>
              <option value='nameAsc'>A-Z</option>
              <option value='nameDesc'>Z-A</option>
            </select>
          </div>
        </div>
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
