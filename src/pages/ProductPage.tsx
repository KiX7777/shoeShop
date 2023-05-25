import React from 'react'
import classes from './ProductPage.module.css'

const ProductPage = () => {
  return (
    <main className={classes.mainContainer}>
      <div className={classes.overlay}></div>

      <div className={classes.imageCont}>
        <div className={classes.mainPic}>
          <span className={classes.left}>
            <img src='images/icon-previous.svg' alt='' />
          </span>
          <span className={classes.right}>
            <img src='images/icon-next.svg' alt='' />
          </span>
          <img src='/shoes/superstar.png' alt='' id='mainpic' />
        </div>
        <div className={classes.gallery}>
          <img
            src='images/thumb_1.jpg'
            className={classes.active}
            data-id='1'
            alt=''
          />
          <img src='images/thumb_2.jpg' className='' data-id='2' alt='' />
          <img src='images/thumb_3.jpg' data-id='3' alt='' />
          <img src='images/thumb_4.jpg' data-id='4' alt='' />
        </div>
      </div>
      <div className={`${classes.imageCont} ${classes.modal}`}>
        <img
          src='images/icons8-close-window-50.png'
          alt=''
          className={classes.closeIcon}
        />
        <div className={classes.mainPic}>
          {/* <!-- <span className="left"
        ><img src="images/icon-previous.svg" alt=""
      /></span>
      <span className="right"><img src="images/icon-next.svg" alt="" /></span> --> */}
          <img src='images/air_jordan_1.webp' alt='' id='mainpic' />
        </div>
        <div className={`${classes.gallery} ${classes.gallerymodal}`}>
          <img
            src='images/thumb_1.jpg'
            className={classes.active}
            data-id='1'
            alt=''
          />
          <img src='images/thumb_2.jpg' className='' data-id='2' alt='' />
          <img src='images/thumb_3.jpg' data-id='3' alt='' />
          <img src='images/thumb_4.jpg' data-id='4' alt='' />
        </div>
      </div>
      <div className={classes.infoCont}>
        <div className={classes.titleCont}>
          <span className={classes.brand}>ADIDAS ORIGINALS</span>
          <h2>Adidas Superstar</h2>
        </div>
        <div className={classes.description}>
          These low-profile sneakers are your perfect casual wear companion.
          Featuring a durable rubber outer sole, they’ll withstand everything
          the weather can offer.
        </div>
        <div className={classes.pricesCont}>
          <div className={classes.current}>
            <p className={classes.currPrice}>€85,00</p>
            <span className={classes.discount}>30%</span>
          </div>
          <p className={classes.oldPrice}>€110,50</p>
        </div>
        <div className={classes.buttons}>
          <div className={classes.quantity}>
            <button id='minus'>
              <img src='images/icon-minus.svg' alt='' />
            </button>
            <p className={classes.currentquantity}>0</p>
            <button id='plus'>
              <img src='images/icon-plus.svg' alt='' />
            </button>
          </div>
          <div className={classes.add}>
            <select name='size' className={classes.size}>
              <option value='40'>40</option>
              <option value='41'>41</option>
              <option value='42'>42</option>
              <option value='43'>43</option>
              <option value='44'>44</option>
              <option value='45'>45</option>
              <option value='46'>46</option>
            </select>
            <button className={classes.addtocart}>
              <img src='images/icon-cart.svg' alt='' />
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProductPage
