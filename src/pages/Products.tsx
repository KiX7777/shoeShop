import { useEffect, useState, memo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppSelector } from '../store/Store'
import classes from './Products.module.css'
import ProductCard from '../Components/ProductCard'
import SidebarLoading from '../Components/SidebarLoading'
import CardsLoading from '../Components/CardsLoadingSkeleton'
import {
  sortPriceUp,
  sortNameAsc,
  sortNameDesc,
  sortPriceDown,
} from '../helpers/helpers'

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
  images: string[]
  total: number
}

const Products = memo(() => {
  const [searchParams, setSearchParams] = useSearchParams()
  let products: Product[]

  products = useAppSelector<Product[]>((state) => state.products.products)
  const error = useAppSelector((state) => state.products.error)
  const status = useAppSelector((state) => state.products.status)
  const [filterMobile, setfilterMobile] = useState(false)
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

  useEffect(() => {
    setSearchParams(searchParams)
  }, [filteredColors, brandFilters, sort, searchParams, setSearchParams])

  useEffect(() => {
    let colorsQuery = searchParams.get('color')?.split(',')
    let brandQuery = searchParams.get('brand')?.split(',')
    let sortQuery = searchParams.get('sort')
    if (colorsQuery) {
      setFilteredColors(colorsQuery)
    }
    if (brandQuery) {
      setBrandFilters(brandQuery)
    }
    if (sortQuery) {
      setsort(sortQuery)
    }
  }, [searchParams])

  let filteredProducts: Product[]
  filteredProducts = products
    .filter((product) => {
      if (filteredColors.length === 0) {
        searchParams.delete('color')
        return true
      } else {
        searchParams.set('color', filteredColors.join(','))
        return filteredColors.includes(product.color)
      }
    })
    .filter((product) => {
      if (brandFilters.length === 0) {
        searchParams.delete('brand')
        return true
      } else {
        searchParams.set('brand', brandFilters.join(','))

        return brandFilters.includes(product.brand)
      }
    })
    .sort((a, b) => {
      if (sort === 'priceAsc') {
        searchParams.set('sort', sort)
        return sortPriceUp(a, b)
      } else if (sort === 'priceDesc') {
        searchParams.set('sort', sort)

        return sortPriceDown(a, b)
      } else if (sort === 'nameDesc') {
        searchParams.set('sort', sort)

        return sortNameDesc(a, b)
      } else if (sort === 'nameAsc') {
        searchParams.set('sort', sort)

        return sortNameAsc(a, b)
      } else {
        searchParams.delete('sort')

        return 0
      }
    })

  const productsCards = filteredProducts.map((prod, idx) => (
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
            <button
              className={classes.filterMobileBtn}
              onClick={() => {
                setfilterMobile((prev) => !prev)
              }}
            >
              Filter
            </button>
            <div
              className={
                filterMobile
                  ? `${classes.filterContainer} ${classes.filterContainerMobile}`
                  : `${classes.filterContainer}`
              }
            >
              <div
                className={classes.closeFilterMobile}
                onClick={() => {
                  setfilterMobile(false)
                }}
              >
                X
              </div>
              <div className={classes.colorFilterContainer}>
                <h3
                  onClick={() => {
                    console.log(filteredColors)
                  }}
                >
                  Color
                </h3>
                <div className={classes.colorFilter}>
                  <label htmlFor='black'>Black</label>
                  <input
                    type='checkbox'
                    name='black'
                    checked={filteredColors.includes('black')}
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
                    checked={filteredColors.includes('blue')}
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
                    checked={filteredColors.includes('green')}
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
                    checked={filteredColors.includes('grey')}
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
                    checked={filteredColors.includes('red')}
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
                    checked={filteredColors.includes('white')}
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
            <h2 className={classes.notFound}>No products found</h2>
          )}
        </div>
      </div>
    </div>
  )
})

export default Products
