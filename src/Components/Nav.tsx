import { Link, NavLink } from 'react-router-dom'
import classes from './Nav.module.css'
import { useEffect, useState, useRef } from 'react'
import { useAppDispatch } from '../store/Store'
import { cartActions } from '../store/cartStore'
import { userActions } from '../store/userStore'
import { useAppSelector } from '../store/Store'
import Cart from './Cart'
import LoginMenu from './LoginMenu'

type NavProps = {
  setDark: React.Dispatch<React.SetStateAction<boolean>>
  darkMode: boolean
}

const Nav = (props: NavProps) => {
  const cartRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()

  const cart = useAppSelector((state) => state.cart.products)
  const [loginMenu, setLoginMenu] = useState(false)
  const loggedIn = useAppSelector((state) => state.user.loggedIn)
  const prevOrders = useAppSelector((state) => state.user.previousOrders)

  const [mobileMenu, setmobileMenu] = useState(false)
  const profilepic = useAppSelector((state) => state.user.profilePic)
  const productsCount = cart.reduce((acc, curr) => acc + curr.quantity, 0)
  function handleOpenCart() {
    dispatch(cartActions.toggleCart())
    dispatch(userActions.closeLoginMenu())
  }

  const darkRef = useRef<HTMLInputElement>(null)
  const mobDarkRef = useRef<HTMLInputElement>(null)

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

  useEffect(() => {
    darkRef.current!.checked = props.darkMode
    mobDarkRef.current!.checked = props.darkMode
  }, [props.darkMode])

  return (
    <>
      <div
        className={classes.backdrop}
        style={{
          visibility: `${mobileMenu ? 'visible' : 'hidden'}`,
          opacity: `${mobileMenu ? '1' : '0'}`,
        }}
        onClick={() => {
          setmobileMenu(false)
        }}
      ></div>
      <div
        className={
          mobileMenu ? `${classes.menu} ${classes.openMenu}` : `${classes.menu}`
        }
      >
        <svg
          width='800px'
          onClick={() => {
            setmobileMenu((prev) => !prev)
          }}
          className={classes.closemenu}
          height='800px'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g id='Menu / Close_MD'>
            <path
              id='Vector'
              d='M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18'
              stroke='#000000'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </g>
        </svg>
        <div className={classes.mobileLinks}>
          <NavLink
            to='/'
            className={(navData) =>
              navData.isActive
                ? `${classes.link} ${classes.linkActive}`
                : `${classes.link}`
            }
            onClick={() => {
              setmobileMenu(false)
            }}
          >
            Home
          </NavLink>
          <NavLink
            to='/products'
            className={(navData) =>
              navData.isActive
                ? `${classes.link} ${classes.linkActive}`
                : `${classes.link}`
            }
            onClick={() => {
              setmobileMenu(false)
            }}
          >
            Products
          </NavLink>
          {typeof prevOrders[0] !== 'undefined' && (
            <div className={classes.mobileProfileLinks}>
              <NavLink
                to='/profile'
                className={(navData) =>
                  navData.isActive
                    ? `${classes.link} ${classes.linkActive}  ${classes.mobilleProfileTab}`
                    : `${classes.link}  ${classes.mobilleProfileTab}`
                }
                onClick={() => {
                  setmobileMenu(false)
                }}
              >
                {loggedIn ? 'Profile' : 'Login'}
              </NavLink>
              {prevOrders.length > 0 && (
                <NavLink
                  to='/profile/orders'
                  className={(navData) =>
                    navData.isActive
                      ? `${classes.link} ${classes.linkActive}  ${classes.mobileOrdersTab}`
                      : `${classes.link}  ${classes.mobileOrdersTab}`
                  }
                  onClick={() => {
                    setmobileMenu(false)
                  }}
                >
                  Orders
                </NavLink>
              )}
            </div>
          )}
        </div>
        <div className={classes.darkModeBtnMobile}>
          <input
            type='checkbox'
            name='darkmode'
            ref={mobDarkRef}
            id='darkmode'
            onChange={() => {
              props.setDark((prev) => !prev)
            }}
          />
        </div>
      </div>
      <nav>
        <ul className={classes.navLeft}>
          <svg
            className={classes.hamburger}
            onClick={() => {
              setmobileMenu((prev) => !prev)
            }}
            width='800px'
            height='800px'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M4 18L20 18'
              stroke='#000000'
              strokeWidth='2'
              strokeLinecap='round'
            />
            <path
              d='M4 12L20 12'
              stroke='#000000'
              strokeWidth='2'
              strokeLinecap='round'
            />
            <path
              d='M4 6L20 6'
              stroke='#000000'
              strokeWidth='2'
              strokeLinecap='round'
            />
          </svg>

          <div className={classes.darkModeBtn}>
            <input
              type='checkbox'
              name='darkmode'
              ref={darkRef}
              id='darkmode'
              onChange={() => {
                props.setDark((prev) => !prev)
              }}
            />
          </div>

          <Link to='/'>
            <img src='/logo.png' alt='' className={classes.logo} />
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

          {loggedIn && (
            <li className={classes.profileTab}>
              <NavLink
                to='/profile'
                className={(navData) =>
                  navData.isActive
                    ? `${classes.link} ${classes.linkActive}`
                    : `${classes.link}`
                }
              >
                Profile
              </NavLink>
              {typeof prevOrders[0] !== 'undefined' && (
                <div className={classes.ordersTab}>
                  <NavLink
                    to='/profile/orders'
                    className={(navData) =>
                      navData.isActive
                        ? `${classes.link} ${classes.linkActive}`
                        : `${classes.link}`
                    }
                  >
                    Orders
                  </NavLink>
                </div>
              )}
            </li>
          )}
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
            // src='/avatar.webp'
            src={profilepic !== '' ? profilepic : '/avatar.webp'}
            referrerPolicy='no-referrer'
            alt='User'
            onClick={() => {
              setLoginMenu((prev) => !prev)
              dispatch(userActions.toggleLoginMenu())
              dispatch(cartActions.closeCart())
            }}
            className={classes.profilepic}
          />
        </ul>
        <Cart />
        <LoginMenu open={loginMenu} />
      </nav>
    </>
  )
}

export default Nav
