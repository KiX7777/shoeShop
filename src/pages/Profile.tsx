import React from 'react'
import classes from './Profile.module.css'
import Login from '../Components/Login'
import { useAppSelector } from '../store/Store'
import { useAppDispatch } from '../store/Store'
import { logout } from '../store/userStore'
import Error from '../UI/Error'
import { Navigate, useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import { updateImg } from '../helpers'
import { updateProfilePicture } from '../store/userStore'
import {
  setPic,
  updatePic,
  getUserData,
  changePass,
} from '../hooks/useFirebaseEmailPasswordAuth'
import {
  getStorage,
  uploadBytes,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'

const Profile = () => {
  const loggedIn = useAppSelector((state) => state.user.loggedIn)
  const user = useAppSelector((state) => state.user)
  const [incorrectOld, setIncorrectOld] = useState(false)
  const [longEnough, setLongEnough] = useState(true)
  const [changePassword, setChangePassword] = useState(false)
  const dispatch = useAppDispatch()
  const [changePic, setchangePic] = useState(false)
  let image: any
  const currentPass = user.password
  const oldPassRef = useRef<HTMLInputElement>(null)
  const newPassRef = useRef<HTMLInputElement>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    let oldPass = oldPassRef.current!.value
    let newPass = newPassRef.current!.value

    if (oldPass !== currentPass) {
      setIncorrectOld(true)
    }
    // else{}
    let formvalid =
      oldPass === currentPass && oldPass.length > 5 && newPass.length > 5

    if (newPass.length < 5) {
      setLongEnough(false)
      return
    }

    if (formvalid) {
      console.log(oldPass, newPass)
      changePass(newPass, user.id)
      oldPass = ''
      newPass = ''
    }
  }

  async function handleUpload() {
    if (!image) {
      return
    }
    dispatch(updateProfilePicture([user.id, image]))
  }
  function handleonChange(e: React.ChangeEvent<HTMLInputElement>) {
    image = e.target.files![0]
  }

  return (
    <div className={classes.profileContainer}>
      {!user.loggedIn && <Navigate to='/' />}
      {/* {!loggedIn && <Login />} */}
      {user.userName && (
        <div className={classes.nameBar}>Hello, {user.userName}</div>
      )}
      {loggedIn && (
        <div className={classes.userInfo}>
          <h2>{user.email}</h2>
          <div className={classes.profilePhoto}>
            <img src={user.profilePic} alt={`${user.userName}`} />
          </div>

          {/* <img src={URL.createObjectURL(image)} alt='' /> */}

          <button
            className={classes.loginBtns}
            type='button'
            onClick={() => {
              getUserData()
              // getData()
              console.log(user)
            }}
          >
            GET USER INFO
          </button>
          <button
            onClick={() => {
              setChangePassword((prev) => !prev)
              if (changePic) {
                setchangePic(false)
              }
            }}
          >
            Change Password
          </button>
          <button
            onClick={() => {
              setchangePic((prev) => !prev)
              if (changePassword) {
                setChangePassword(false)
              }
            }}
          >
            Change Profile Picture
          </button>
          {loggedIn && (
            <button
              className={classes.logoutBtn}
              type='button'
              onClick={() => {
                dispatch(logout())
              }}
            >
              LOG OUT
            </button>
          )}
        </div>
      )}

      {changePic && (
        <div className={classes.profileChange}>
          <h2>Change Profile Picture</h2>
          <input
            type='file'
            onChange={(e) => {
              handleonChange(e)
            }}
          />
          <button type='button' onClick={handleUpload}>
            Upload
          </button>
        </div>
      )}

      {changePassword && (
        <div className={classes.passChange}>
          <form
            onSubmit={(e) => {
              handleSubmit(e)
            }}
          >
            <div className={classes.inputContainer}>
              <label htmlFor='oldPassword'>Old Password</label>
              <input
                ref={oldPassRef}
                type='password'
                onChange={() => {
                  oldPassRef.current?.value !== currentPass
                    ? setIncorrectOld(true)
                    : setIncorrectOld(false)
                }}
              />
              {incorrectOld && <p>Incorrect old password.</p>}{' '}
            </div>
            <div className={classes.inputContainer}>
              <label htmlFor='newPassword'>New Password</label>
              <input
                ref={newPassRef}
                type='password'
                onChange={() => {
                  newPassRef.current!.value.length < 5
                    ? setLongEnough(false)
                    : setLongEnough(true)
                }}
              />
              {!longEnough && <p>Passwords be longer than 5 characters.</p>}{' '}
            </div>

            <button type='submit'>Change Password</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Profile
