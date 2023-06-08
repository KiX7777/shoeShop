import React from 'react'
import Nav from '../Components/Nav'

const Layout = (props: {
  children: React.ReactNode
  setDark: React.Dispatch<React.SetStateAction<boolean>>
  darkMode: boolean
  // setlight: () => void
  // setdark: () => void
}) => {
  return (
    <>
      <Nav setDark={props.setDark} darkMode={props.darkMode} />
      {props.children}
    </>
  )
}

export default Layout
