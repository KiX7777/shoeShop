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
import { onAuthStateChanged, fetchSignInMethodsForEmail } from 'firebase/auth'
import { ref, onValue } from 'firebase/database'
import { setLocalStorage } from './helpers'
import { fetchData } from './store/productsStore'
import Checkout from './pages/Checkout'
import Profile from './pages/Profile'
import { userActions } from './store/userStore'
import { listenchanges, updateCart } from './hooks/useFirebaseEmailPasswordAuth'
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
  const user = useAppSelector((state) => state.user)
  const cart = useAppSelector((state) => state.cart)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user)
        const providers = user.providerData
        const currProv = user.providerId

        let userRef = ref(db, `users/${user.uid}`)
        onValue(userRef, (snapshot) => {
          let user = snapshot.val()
          console.log(user)
          dispatch(userActions.updateStore(user))
        })

        // getData()
        user.getIdToken().then((res) => {
          setLocalStorage(res)

          updateToken(user.uid, res)
        })
        listenchanges(user.uid)
      } else {
        dispatch(userActions.resetState())
        console.log('there is no user')
        return
      }
    })

    if (initial) {
      dispatch(fetchData())
      initial = false
    }
    console.log(auth.currentUser?.uid)
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
            {user.loggedIn && <Route path='/about' element={<About />} />}

            <Route path='/profile'>
              <Route index element={<Profile />} />
              <Route path='orders' element={<Orders />} />
            </Route>

            <Route path='/checkout' element={<Checkout />} />
            <Route path='*' element={<h1>Error 404 - Not Found</h1>} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  )
}

export default App
