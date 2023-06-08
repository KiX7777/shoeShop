import React from 'react'
import classes from './LoginMenu.module.css'
import Login from './Login'
import Error from '../UI/Error'
import { useAppSelector } from '../store/Store'
import { useNavigate } from 'react-router-dom'

const LoginMenu = ({ open }: { open: boolean }) => {
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.user)
  const isOpen = user.loginMenu
  return (
    <div
      className={
        isOpen
          ? `${classes.loginContainer} ${classes.openLogin}`
          : `${classes.loginContainer}`
      }
    >
      {user.loggedIn && (
        <>
          <div className={classes.img}>
            <img
              src={user.profilePic}
              alt={user.userName}
              onClick={() => {
                navigate('/profile')
              }}
            />
          </div>
          <h1>{user.userName}</h1>
        </>
      )}
      <Login />
      {user.error && <Error message={user.error} color='#cc0000' />}
      {user.message && <Error message={user.message} color='#2D87E2' />}
    </div>
  )
}

export default LoginMenu
