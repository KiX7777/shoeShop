import React from 'react'
import Nav from '../Components/Nav'
import SplashScreen from '../Components/splashScreen'

const Layout = (props: {
  children: React.ReactNode
  setDark: React.Dispatch<React.SetStateAction<boolean>>
  darkMode: boolean
}) => {
  return (
    <>
      <SplashScreen />

      <Nav setDark={props.setDark} darkMode={props.darkMode} />
      {props.children}
    </>
  )
}

export default Layout
