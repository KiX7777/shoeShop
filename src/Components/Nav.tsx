import { Link, NavLink } from 'react-router-dom'
import classes from './Nav.module.css'
import { useEffect, useState, useRef } from 'react'
import { useAppDispatch } from '../store/Store'
import { cartActions } from '../store/cartStore'
import { useAppSelector } from '../store/Store'
import Cart from './Cart'
import LoginMenu from './LoginMenu'

const Nav = () => {
  const isOpen = useAppSelector((state) => state.cart.isOpen)
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
      <div
        className={classes.backdrop}
        style={{
          visibility: `${mobileMenu ? 'visible' : 'hidden'}`,
          opacity: `${mobileMenu ? '1' : '0'}`,
        }}
      ></div>
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
        <div className={classes.mobileLinks}>
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
          {loggedIn && (
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
          <NavLink
            to='/about'
            className={(navData) =>
              navData.isActive
                ? `${classes.link} ${classes.linkActive}`
                : `${classes.link}`
            }
            onClick={() => {
              setmobileMenu(false)
            }}
          >
            About
          </NavLink>
          <NavLink
            to='/contact'
            className={(navData) =>
              navData.isActive
                ? `${classes.link} ${classes.linkActive}`
                : `${classes.link}`
            }
            onClick={() => {
              setmobileMenu(false)
            }}
          >
            Contact
          </NavLink>
        </div>
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
              {prevOrders.length > 0 && (
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

          {/* {loggedIn && (
            <li>
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
            </li>
          )} */}
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
            // src='/avatar.webp'
            src={profilepic !== '' ? profilepic : '/avatar.webp'}
            referrerPolicy='no-referrer'
            alt='profile picture'
            onClick={() => {
              console.log(isOpen)
              setLoginMenu((prev) => !prev)
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
