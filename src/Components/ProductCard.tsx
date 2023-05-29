import React from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './ProductCard.module.css'
import { formatPrice } from '../helpers'

const ProductCard = ({
  brand,
  name,
  image,
  price,
  id,
}: {
  brand: string
  name: string
  price: number
  image: string
  id: string
}) => {
  const navigate = useNavigate()
  const brandName: string = brand
  let backgroundStyles = {}
  if (brandName === 'Nike') {
    backgroundStyles = {
      // background:
      //   "url('https://1000merken.com/wp-content/uploads/2020/04/Air-Jordan-Logo.png')",
      backgroundImage: "url('/nikeLogo.png')",
      backgroundRepeat: 'no-repeat',
      backgroundSize: '80%',

      left: '0%',
    }
  } else if (brandName === 'Adidas Originals') {
    backgroundStyles = {
      // background:
      //   "url('https://1000merken.com/wp-content/uploads/2020/04/Air-Jordan-Logo.png')",
      backgroundImage: "url('/adidasOriginals.png')",
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      top: '15%',
    }
  } else if (brandName === 'Jordan') {
    backgroundStyles = {
      backgroundImage: "url('/jordanlogo.svg.png')",
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      top: '0',
    }
  } else if (brandName === 'Puma') {
    backgroundStyles = {
      backgroundImage: "url('/pumaLogo.png')",
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',

      left: '-10%',
    }
  } else if (brandName === 'Converse') {
    backgroundStyles = {
      backgroundImage: '/converse.png',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
    }
  } else if (brandName === 'Adidas') {
    backgroundStyles = {
      backgroundImage: "url('/adidaslogo.png')",
      backgroundSize: '80%',
      left: '-10%',
      backgroundRepeat: 'no-repeat',
      top: '15%',
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <div className={classes.backText} style={backgroundStyles}>
          {}
        </div>
        <div
          className={classes.imgBx}
          onClick={() => {
            navigate(`/products/product-${id}`)
            // console.log(first)
          }}
        >
          <img src={image} alt='' />
        </div>
        <h3 className={classes.price}>{formatPrice(price)}</h3>
        <div className={classes.contentBx}>
          <h2>{name}</h2>
          <div className={classes.size}>
            <h3>Size:</h3>
            <div className={classes.sizes}>
              <span>40</span>
              <span>41</span>
              <span>42</span>
              <span>43</span>
              <span>44</span>
              <span>45</span>
              <span>46</span>
            </div>
          </div>

          <a href='#'>Add to cart</a>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
