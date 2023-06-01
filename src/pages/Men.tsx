import React, { useState } from 'react'
import CheckoutForm from '../Components/CheckoutForm'
const Men = () => {
  const [images, setimages] = useState<string[]>([])
  // getImages('/shoes/superstar').then((res) => setimages(res))

  return (
    <div>
      <h1>Men</h1>
      <CheckoutForm />
    </div>
  )
}

export default Men
