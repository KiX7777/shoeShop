import React from 'react'
import Delivery from '../Components/Delivery'

const ProductPageLayout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <Delivery />
      {props.children}
    </>
  )
}

export default ProductPageLayout
