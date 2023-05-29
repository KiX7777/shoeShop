import React from 'react'
import classes from './ProductCard.module.css'
const ProductCard = ({
  brand,
  name,
  image,
}: {
  brand: string
  name: string
  image: string
}) => {
  const brandName: string = brand
  let backgroundStyles = {}
  if (brandName === 'Nike') {
    backgroundStyles = {
      // background:
      //   "url('https://1000merken.com/wp-content/uploads/2020/04/Air-Jordan-Logo.png')",
      background: "url('/nikeLogo.png')",
      backgroundRepeat: 'no-repeat',
      backgroundSize: '80%',

      left: '0%',
    }
  } else if (brandName === 'Adidas Originals') {
    backgroundStyles = {
      // background:
      //   "url('https://1000merken.com/wp-content/uploads/2020/04/Air-Jordan-Logo.png')",
      background:
        "url('https://banner2.cleanpng.com/20180611/hhk/kisspng-adidas-originals-logo-clip-art-logo-adidas-5b1e38b8654b39.2262587515287072564149.jpg')",
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      top: '15%',
    }
  } else if (brandName === 'Jordan') {
    backgroundStyles = {
      background: "url('/jordanlogo.svg.png')",
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      top: '0',
    }
  } else if (brandName === 'Puma') {
    backgroundStyles = {
      background: "url('/pumaLogo.png')",
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',

      left: '-10%',
    }
  } else if (brandName === 'Converse') {
    backgroundStyles = {
      background:
        "url('https://w7.pngwing.com/pngs/335/469/png-transparent-converse-chuck-taylor-all-stars-shoe-sneakers-logo-adidas-angle-text-triangle.png')",
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
    }
  } else if (brandName === 'Adidas') {
    backgroundStyles = {
      background: "url('/adidaslogo.png')",
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
        <div className={classes.imgBx}>
          <img src={image} alt='' />
        </div>
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
