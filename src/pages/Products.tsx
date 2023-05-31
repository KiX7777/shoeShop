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
import SidebarLoading from '../Components/SidebarLoading'
import { pushImages } from '../helpers'
import CardsLoading from '../Components/CardsLoadingSkeleton'
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
  let products: Product[]

  products = useAppSelector<Product[]>((state) => state.products.products)
  const error = useAppSelector((state) => state.products.error)
  const status = useAppSelector((state) => state.products.status)

  const [sort, setsort] = useState('')

  const [filteredColors, setFilteredColors] = useState<string[]>([])
  const [brandFilters, setBrandFilters] = useState<string[]>([])

  const handleColorFilter = (color: string) => {
    if (filteredColors.includes(color)) {
      setFilteredColors(filteredColors.filter((c) => c !== color))
    } else {
      setFilteredColors([...filteredColors, color])
    }
  }
  const handleBrandFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const brand = event.target.value
    if (event.target.checked) {
      setBrandFilters([...brandFilters, brand])
    } else {
      setBrandFilters(brandFilters.filter((filter) => filter !== brand))
    }
  }

  let filteredProducts: Product[]
  filteredProducts = products
    .filter((product) => {
      if (filteredColors.length === 0) {
        return true
      } else {
        return filteredColors.includes(product.color)
      }
    })
    .filter((product) => {
      if (brandFilters.length === 0) {
        return true
      } else {
        return brandFilters.includes(product.brand)
      }
    })
    .sort((a, b) => {
      if (sort === 'priceAsc') {
        return sortPriceUp(a, b)
      } else if (sort === 'priceDesc') {
        return sortPriceDown(a, b)
      } else if (sort === 'nameDesc') {
        return sortNameDesc(a, b)
      } else if (sort === 'nameAsc') {
        return sortNameAsc(a, b)
      } else {
        return 0
      }
    })

  const productsList = products.map((prod, idx) => (
    <li key={`${prod.id}${prod.title}`}>
      <Link to={`product-${prod.id}`}>
        {status === 'loading' ? <Skeleton /> : prod.title}
      </Link>
    </li>
  ))

  let productsCards
  // if (filteredProducts.length > 0) {
  productsCards = filteredProducts.map((prod, idx) => (
    <ProductCard product={prod} key={`${prod.id}${prod.title}`} id={idx} />
  ))

  return (
    <div className={classes.productsContainer}>
      {error && <div className={classes.error}>{error}</div>}

      <div className={classes.mainContainer}>
        {status === 'loading' ? (
          <SidebarLoading />
        ) : (
          <div className={classes.sideBar}>
            <div className={classes.sortContainer}>
              <select
                name='sort'
                id='sort'
                defaultValue={'empty'}
                onChange={(e) => {
                  setsort(e.target.value)
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
            <div className={classes.filterContainer}>
              <div className={classes.colorFilterContainer}>
                <h3>Color</h3>
                <div className={classes.colorFilter}>
                  <label htmlFor='black'>Black</label>
                  <input
                    type='checkbox'
                    name='black'
                    id='black'
                    onChange={() => {
                      handleColorFilter('black')
                    }}
                  />
                </div>
                <div className={classes.colorFilter}>
                  <label htmlFor='Blue'>Blue</label>
                  <input
                    type='checkbox'
                    name='Blue'
                    id='Blue'
                    onChange={() => {
                      handleColorFilter('blue')
                    }}
                  />
                </div>
                <div className={classes.colorFilter}>
                  <label htmlFor='Green'>Green</label>
                  <input
                    type='checkbox'
                    name='Green'
                    id='Green'
                    onChange={() => {
                      handleColorFilter('green')
                    }}
                  />
                </div>
                <div className={classes.colorFilter}>
                  <label htmlFor='Grey'>Grey</label>
                  <input
                    type='checkbox'
                    name='Grey'
                    id='Grey'
                    onChange={() => {
                      handleColorFilter('grey')
                    }}
                  />
                </div>
                <div className={classes.colorFilter}>
                  <label htmlFor='Red'>Red</label>
                  <input
                    type='checkbox'
                    name='Red'
                    id='Red'
                    onChange={() => {
                      handleColorFilter('red')
                    }}
                  />
                </div>
                <div className={classes.colorFilter}>
                  <label htmlFor='White'>White</label>
                  <input
                    type='checkbox'
                    name='White'
                    id='White'
                    onChange={() => {
                      handleColorFilter('white')
                    }}
                  />
                </div>
              </div>
              <div className={classes.brandFilterContainer}>
                <h3>Brand</h3>
                <div className={classes.brandFilter}>
                  <label htmlFor='Adidas'>Adidas</label>
                  <input
                    type='checkbox'
                    name='Adidas'
                    id='Adidas'
                    value={'Adidas'}
                    checked={brandFilters.includes('Adidas')}
                    onChange={handleBrandFilterChange}
                  />
                </div>
                <div className={classes.brandFilter}>
                  <label htmlFor='Adidas Originals'>Adidas Originals</label>
                  <input
                    type='checkbox'
                    name='Adidas Originals'
                    id='Adidas Originals'
                    value={'Adidas Originals'}
                    checked={brandFilters.includes('Adidas Originals')}
                    onChange={handleBrandFilterChange}
                  />
                </div>
                <div className={classes.brandFilter}>
                  <label htmlFor='Converse'>Converse</label>
                  <input
                    type='checkbox'
                    name='Converse'
                    id='Converse'
                    value='Converse'
                    checked={brandFilters.includes('Converse')}
                    onChange={handleBrandFilterChange}
                  />
                </div>
                <div className={classes.brandFilter}>
                  <label htmlFor='Jordan'>Jordan</label>
                  <input
                    type='checkbox'
                    name='Jordan'
                    checked={brandFilters.includes('Jordan')}
                    id='Jordan'
                    value='Jordan'
                    onChange={handleBrandFilterChange}
                  />
                </div>
                <div className={classes.brandFilter}>
                  <label htmlFor='Nike'>Nike</label>
                  <input
                    type='checkbox'
                    name='Nike'
                    value='Nike'
                    checked={brandFilters.includes('Nike')}
                    id='Nike'
                    onChange={handleBrandFilterChange}
                  />
                </div>
                <div className={classes.brandFilter}>
                  <label htmlFor='Puma'>Puma</label>
                  <input
                    type='checkbox'
                    name='Puma'
                    value='Puma'
                    id='Puma'
                    checked={brandFilters.includes('Puma')}
                    onChange={handleBrandFilterChange}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={classes.cardsContainer}>
          {status === 'loading' && <CardsLoading />}

          {filteredProducts.length > 0 ? (
            productsCards
          ) : (
            <h2>No products found</h2>
          )}
        </div>
      </div>
    </div>
  )
}

export default Products
