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
  const [slika, setslika] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
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
    // console.log(URL.createObjectURL())
    // await updateImg(user.id, image)
    if (!image) {
      return
    }
    dispatch(updateProfilePicture([user.id, image]))
  }
  function handleonChange(e: React.ChangeEvent<HTMLInputElement>) {
    image = e.target.files![0]
  }

  // async function updateImg(file: any) {
  //   const metadata = {
  //     contentType: 'image/jpeg',
  //   }
  //   const storage = getStorage()
  //   var storageRef = ref(storage, user.id + '/profilePicture/' + 'profilepic')

  //   try {
  //     const uploadTask = uploadBytesResumable(storageRef, file, metadata)
  //     uploadTask.on(
  //       'state_changed',
  //       (snapshot) => {
  //         const progress =
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //         console.log('Image uplaoded!')
  //       },
  //       (error: any) => {
  //         console.log(error)
  //       },
  //       async () => {
  //         const url = await getDownloadURL(uploadTask.snapshot.ref)
  //         console.log(url)
  //         setslika(url)
  //         setPic(user.id, url)
  //         updatePic(url)
  //       }
  //     )
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <div className={classes.profileContainer}>
      {!user.loggedIn && <Navigate to='/' />}
      {/* {!loggedIn && <Login />} */}
      {loggedIn && (
        <div className={classes.userInfo}>
          <h1>Hello, {user.userName}</h1>
          <h2>Email: {user.email}</h2>
          <h2>Change Profile Picture</h2>
          <button
            onClick={() => {
              console.log(slika)
            }}
          >
            STATE
          </button>
          <input
            type='file'
            onChange={(e) => {
              handleonChange(e)
            }}
          />
          <button type='button' onClick={handleUpload}>
            Upload
          </button>
          <img src={slika} alt='' />
          {/* <img src={URL.createObjectURL(image)} alt='' /> */}
          {loggedIn && (
            <button
              className={classes.loginBtns}
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

      <h3>{user.password}</h3>

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
    </div>
  )
}

export default Profile
