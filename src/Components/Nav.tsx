import { Link, NavLink } from 'react-router-dom'
import classes from './Nav.module.css'
import { useEffect, useState, useRef } from 'react'
import { useAppDispatch } from '../store/Store'
import { cartActions } from '../store/cartStore'
import { useAppSelector } from '../store/Store'
import Cart from './Cart'

const Nav = () => {
  const isOpen = useAppSelector((state) => state.cart.isOpen)
  const cartRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()
  const cart = useAppSelector((state) => state.cart.products)
  const [mobileMenu, setmobileMenu] = useState(false)
  const productsCount = cart.reduce((acc, curr) => acc + curr.quantity, 0)

  function handleOpenCart() {
    dispatch(cartActions.toggleCart())
  }

  useEffect(() => {
    if (cart.length > 0) {
      cartRef.current?.classList.add(`${classes.shakeTop}`)
    }

    const timeout = setTimeout(() => {
      cartRef.current?.classList.remove(`${classes.shakeTop}`)
    }, 501)

    return () => {
      clearTimeout(timeout)
    }
  }, [cart])

  return (
    <>
      {' '}
      <div
        className={
          mobileMenu ? `${classes.menu} ${classes.openMenu}` : `${classes.menu}`
        }
      >
        <img
          src='/icons8-close-50.png'
          alt=''
          className={classes.closemenu}
          onClick={() => {
            setmobileMenu((prev) => !prev)
          }}
        />
        <Link
          to='/products'
          className={classes.link}
          onClick={() => {
            setmobileMenu(false)
          }}
        >
          Products
        </Link>
        <Link
          to='/men'
          className={classes.link}
          onClick={() => {
            setmobileMenu(false)
          }}
        >
          Men
        </Link>
        <Link
          to='/women'
          className={classes.link}
          onClick={() => {
            setmobileMenu(false)
          }}
        >
          Women
        </Link>
        <Link
          to='/about'
          className={classes.link}
          onClick={() => {
            setmobileMenu(false)
          }}
        >
          About
        </Link>
        <Link
          to='/contact'
          className={classes.link}
          onClick={() => {
            setmobileMenu(false)
          }}
        >
          Contact
        </Link>
      </div>
      <nav>
        <ul className={classes.navLeft}>
          <img
            src='/icons8-menu-rounded-30.png'
            alt=''
            className={classes.hamburger}
            onClick={() => {
              setmobileMenu((prev) => !prev)
            }}
          />
          <Link to='/'>
            <img src='../logo.svg' alt='' className={classes.logo} />
          </Link>

          <li>
            <NavLink
              to='/products'
              className={(navData) =>
                navData.isActive
                  ? `${classes.link} ${classes.linkActive}`
                  : `${classes.link}`
              }
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/men'
              className={(navData) =>
                navData.isActive
                  ? `${classes.link} ${classes.linkActive}`
                  : `${classes.link}`
              }
            >
              Men
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/women'
              className={(navData) =>
                navData.isActive
                  ? `${classes.link} ${classes.linkActive}`
                  : `${classes.link}`
              }
            >
              Women
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/about'
              className={(navData) =>
                navData.isActive
                  ? `${classes.link} ${classes.linkActive}`
                  : `${classes.link}`
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/contact'
              className={(navData) =>
                navData.isActive
                  ? `${classes.link} ${classes.linkActive}`
                  : `${classes.link}`
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>
        <ul className={classes.navRight}>
          <div className={classes.cart} ref={cartRef} onClick={handleOpenCart}>
            <img
              src='/icon-cart.svg'
              alt='cart logo'
              id='cart'
              className={classes.cartIcon}
            />
            {cart.length > 0 && (
              <span className={classes.incart}>{productsCount}</span>
            )}
          </div>
          <img
            src='/avatar.webp'
            alt='profile picture'
            onClick={() => {
              console.log(isOpen)
            }}
            className={classes.profilepic}
          />
        </ul>
        <Cart />
      </nav>
    </>
  )
}

export default Nav
