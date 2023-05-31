import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import { Suspense } from 'react'
import Layout from './UI/Layout'
import Product from './pages/Product'
import Men from './pages/Men'
import ProductPage from './pages/ProductPage'
import { useAppDispatch } from './store/Store'
import { useEffect } from 'react'
import { fetchData } from './store/productsStore'
import Checkout from './pages/Checkout'
const Products = React.lazy(() => import('./pages/Products'))
const About = React.lazy(() => import('./pages/About'))

function App() {
  let initial = true
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (initial) {
      dispatch(fetchData())
      initial = false
    }
  }, [])
  return (
    <>
      <Layout>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products'>
              <Route index element={<Products />} />
              {/* <Route path=':product' element={<Product />} /> */}
              <Route path=':product' element={<ProductPage />} />
            </Route>
            <Route path='/about' element={<About />} />
            <Route path='/men' element={<Men />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='*' element={<h1>Error 404 - Not Found</h1>} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  )
}

export default App
