import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import { Suspense } from 'react'
import Layout from './UI/Layout'
import Product from './pages/Product'
import ProductPage from './pages/ProductPage'
const Products = React.lazy(() => import('./pages/Products'))
const About = React.lazy(() => import('./pages/About'))

function App() {
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
            {/* <Route path='/men' element={<ProductPage />} /> */}
            <Route path='*' element={<h1>Error 404 - Not Found</h1>} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  )
}

export default App
