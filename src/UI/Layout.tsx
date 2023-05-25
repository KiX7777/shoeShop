import React from 'react'
import Nav from '../Components/Nav'

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <Nav />
      {props.children}
    </>
  )
}

export default Layout
