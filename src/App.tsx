import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import { Suspense } from 'react'
import Layout from './UI/Layout'

import ProductPage from './pages/ProductPage'
import { useAppDispatch, useAppSelector } from './store/Store'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { ref, onValue } from 'firebase/database'
import { setLocalStorage } from './helpers'
import { fetchData } from './store/productsStore'
import Checkout from './pages/Checkout'
import Profile from './pages/Profile'
import { userActions } from './store/userStore'
import { listenchanges } from './hooks/useFirebaseEmailPasswordAuth'
import { auth, db, updateToken } from './hooks/useFirebaseEmailPasswordAuth'
import Orders from './Components/Orders'

const Products = React.lazy(() => import('./pages/Products'))
const NotFound = React.lazy(() => import('./pages/NotFound'))

let defaultDark: boolean

if (localStorage.getItem('dark')) {
  defaultDark = JSON.parse(localStorage.getItem('dark')!)
} else {
  defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches
}

let initial = true
function App() {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user)
  const [darkMode, setDarkMode] = useState(defaultDark)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user)
        // const providers = user.providerData
        // const currProv = user.providerId

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

    console.log(auth.currentUser?.uid)
  }, [dispatch])

  useEffect(() => {
    if (initial) {
      dispatch(fetchData())
      initial = false
    }
  }, [dispatch])

  useEffect(() => {
    defaultDark
      ? document.body.setAttribute('data-theme', 'dark')
      : document.body.setAttribute('data-theme', 'light')
  }, [])

  useEffect(() => {
    const darkLocal = localStorage.getItem('dark')
    if (darkLocal) {
      console.log(JSON.parse(darkLocal))
      setDarkMode(JSON.parse(darkLocal))
    }
  }, [])

  useEffect(() => {
    darkMode
      ? document.body.setAttribute('data-theme', 'dark')
      : document.body.setAttribute('data-theme', 'light')
    localStorage.setItem('dark', JSON.stringify(darkMode))
  }, [darkMode])

  return (
    <>
      <Layout setDark={setDarkMode} darkMode={darkMode}>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products'>
              <Route index element={<Products />} />
              {/* <Route path=':product' element={<Product />} /> */}
              <Route path=':product' element={<ProductPage />} />
            </Route>

            <Route path='/profile'>
              <Route index element={<Profile />} />
              {user.loggedIn && (
                <Route path='orders' element={<Orders />} />
              )}{' '}
            </Route>

            <Route path='/checkout' element={<Checkout />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  )
}

export default App
