import React, { useState, Suspense, useEffect, useLayoutEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Layout from './UI/Layout';
import ProductPage from './pages/ProductPage';
import { useAppDispatch, useAppSelector } from './store/Store';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, onValue } from 'firebase/database';
import { setLocalStorage } from './helpers/helpers';
import { fetchData } from './store/productsStore';
import Checkout from './pages/Checkout';
import { userActions } from './store/userStore';
import {
  auth,
  db,
  updateToken,
  listenchanges,
} from './helpers/FirebaseFunctions';
import Orders from './Components/Orders';
import { AnimatePresence } from 'framer-motion';

const Products = React.lazy(() => import('./pages/Products'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const Profile = React.lazy(() => import('./pages/Profile'));

let defaultDark: boolean;

if (localStorage.getItem('dark')) {
  defaultDark = JSON.parse(localStorage.getItem('dark')!);
} else {
  defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [darkMode, setDarkMode] = useState(defaultDark);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(userActions.setLogin());
    }
    const unsubsrcibe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(userActions.setLogin());

        console.log(user);

        const userRef = ref(db, `users/${user.uid}`);

        onValue(userRef, (snapshot) => {
          let user = snapshot.val();
          console.log(user);
          dispatch(userActions.updateStore(user));
        });

        user.getIdToken().then((res) => {
          setLocalStorage(res);
          updateToken(user.uid, res);
        });
        listenchanges(user.uid);
      } else {
        dispatch(userActions.resetState());
        console.log('there is no user');
        return;
      }
    });

    return () => {
      unsubsrcibe();
    };
  }, [dispatch]);

  useEffect(() => {
    let initial = true;
    if (initial) {
      dispatch(fetchData());
      initial = false;
    }
    return () => {
      initial = false;
    };
  }, [dispatch]);

  useLayoutEffect(() => {
    defaultDark
      ? document.body.setAttribute('data-theme', 'dark')
      : document.body.setAttribute('data-theme', 'light');
  }, []);

  useLayoutEffect(() => {
    const darkLocal = localStorage.getItem('dark');
    if (darkLocal) {
      console.log(JSON.parse(darkLocal));
      setDarkMode(JSON.parse(darkLocal));
    }
  }, []);

  useLayoutEffect(() => {
    darkMode
      ? document.body.setAttribute('data-theme', 'dark')
      : document.body.setAttribute('data-theme', 'light');
    localStorage.setItem('dark', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <>
      <Layout setDark={setDarkMode} darkMode={darkMode}>
        <Suspense fallback={<h1 className='suspense'>Loading...</h1>}>
          <AnimatePresence mode='wait'>
            <Routes key={location.pathname} location={location}>
              <Route path='/' element={<Home />} />
              <Route path='/products'>
                <Route index element={<Products />} />
                <Route path=':product' element={<ProductPage />} />
              </Route>

              <Route path='/profile'>
                <Route index element={<Profile />} />
                {user.loggedIn && <Route path='orders' element={<Orders />} />}
              </Route>

              <Route path='/checkout' element={<Checkout />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </Layout>
    </>
  );
}

export default App;
