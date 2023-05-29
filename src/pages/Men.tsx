import React, { useState } from 'react'
import { getImages } from '../helpers'

const Men = () => {
  const [images, setimages] = useState<string[]>([])
  // getImages('/shoes/superstar').then((res) => setimages(res))

  return (
    <div>
      <h1>Men</h1>
    </div>
  )
}

export default Men
