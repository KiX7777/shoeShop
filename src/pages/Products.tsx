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

export interface Product {
  id: string
  category: string
  description: string
  image: string
  price: number
  size: number
  title: string
  rating: {
    rate: number
    count: number
  }
  quantity: number
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

  const productsList = products.map((prod, idx) => (
    <li key={prod.id}>
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

  return (
    <div className={classes.productsContainer}>
      <h1>Products</h1>
      <div className={classes.mainContainer}>
        <div className={classes.sideBar}></div>
        <div className={classes.cardsContainer}>
          <ProductCard
            brand='Adidas'
            name='Adidas Superstar'
            image='/shoes/superstar.png'
          />
          <ProductCard
            brand='Nike'
            name='Nike Blazer Low 77 PRM'
            image='/shoes/blazerprm.png'
          />
          <ProductCard
            brand='Jordan'
            name='Air Jordan 1'
            image='/shoes/air1-redblack.png'
          />
          <ProductCard
            brand='Puma'
            name='Scuderia Ferrari Drift Cat 7'
            image='/shoes/pumaDrift.png'
          />
          <ProductCard
            brand='Jordan'
            name='Air Jordan 1'
            image='/shoes/air1-green.png'
          />
          <ProductCard
            brand='Converse'
            name='Chuck Taylor All Star'
            image='/shoes/allStar.png'
          />
          <ProductCard
            brand='Jordan'
            name='Air Jordan 1 Blue White'
            image='/shoes/air1-blue.png'
          />
          <ProductCard
            brand='Adidas'
            name='Adidas Superstar Black'
            image='/shoes/superstar-black.png'
          />
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
