import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import { Suspense } from 'react'
import Layout from './UI/Layout'
import Product from './pages/Product'
import Men from './pages/Men'
import ProductPage from './pages/ProductPage'
import { useAppDispatch, useAppSelector } from './store/Store'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { ref, onValue } from 'firebase/database'
import { setLocalStorage } from './helpers'
import { fetchData } from './store/productsStore'
import Checkout from './pages/Checkout'
import Login from './Components/Login'
import { userActions } from './store/userStore'
import { listenchanges } from './hooks/useFirebaseEmailPasswordAuth'
import {
  auth,
  user,
  db,
  updateToken,
} from './hooks/useFirebaseEmailPasswordAuth'
import Orders from './Components/Orders'

const Products = React.lazy(() => import('./pages/Products'))
const About = React.lazy(() => import('./pages/About'))

function App() {
  let initial = true
  const dispatch = useAppDispatch()
  const loggedIn = useAppSelector((state) => state.user.loggedIn)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user)
        // getData()
        user.getIdToken().then((res) => {
          setLocalStorage(res)
          updateToken(user.uid, res)
        })

        let userRef = ref(db, `users/${user.uid}`)
        onValue(userRef, (snapshot) => {
          let user = snapshot.val()
          console.log(user)
          dispatch(userActions.updateStore(user))
        })
        listenchanges(user.uid)
      } else {
        console.log('there is no user')
      }
    })

    if (initial) {
      dispatch(fetchData())
      initial = false
    }
  }, [])

  // useEffect(() => {
  //   const token = localStorage.getItem('token')

  //   if (token) {
  //     console.log(token)
  //   }
  //   return () => {}
  // }, [])
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
            {loggedIn && <Route path='/about' element={<About />} />}{' '}
            <Route path='/men' element={<Login />} />
            <Route path='/women' element={<Orders />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='*' element={<h1>Error 404 - Not Found</h1>} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  )
}

export default App
