import React from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './ProductCard.module.css';
import { useAppDispatch } from '../store/Store';
import { formatPrice } from '../helpers/helpers';
import { cartActions } from '../store/cartStore';
import { useEffect, useRef, useState } from 'react';
import { CartProduct } from '../store/cartStore';
import { Product } from '../pages/Products';

import { motion } from 'framer-motion';
const ProductCard = ({ product, id }: { product: Product; id: number }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const sizeRef = useRef<HTMLSpanElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const brandName: string = product.brand;
  let backgroundStyles = {};
  const [size, setSize] = useState(0);

  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.7,
        type: 'spring',
      },
    },
  };

  function handleAddToCart(prod: CartProduct) {
    if (size === 0) {
      return;
    }
    dispatch(cartActions.add(prod));
    setSize(0);
  }

  useEffect(() => {
    const allChild = cardRef.current?.children as HTMLCollectionOf<HTMLElement>;
    const els = Array.from(allChild);

    function setPointerEvents() {
      els.forEach((el) => {
        const all = el.querySelectorAll('*') as any;
        all.forEach((node: any) => (node.style.pointerEvents = 'auto'));
      });
    }

    cardRef.current?.addEventListener('animationend', setPointerEvents);
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      cardRef.current?.removeEventListener('animationend', setPointerEvents);
    };
  }, []);

  if (brandName === 'Nike') {
    backgroundStyles = {
      // background:
      //   "url('https://1000merken.com/wp-content/uploads/2020/04/Air-Jordan-Logo.png')",
      backgroundImage: "url('/nikeLogo.png')",
      backgroundRepeat: 'no-repeat',
      backgroundSize: '80%',
    };
  } else if (brandName === 'Adidas Originals') {
    backgroundStyles = {
      // background:
      //   "url('https://1000merken.com/wp-content/uploads/2020/04/Air-Jordan-Logo.png')",
      backgroundImage: "url('/adidasOriginals.png')",
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      left: '-5%',
    };
  } else if (brandName === 'Jordan') {
    backgroundStyles = {
      backgroundImage: "url('/jordanlogo.svg.png')",
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
    };
  } else if (brandName === 'Puma') {
    backgroundStyles = {
      backgroundImage: "url('/pumaLogo.png')",
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
    };
  } else if (brandName === 'Converse') {
    backgroundStyles = {
      backgroundImage: "url('/converse.png')",
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      overflow: 'hidden',
    };
  } else if (brandName === 'Adidas') {
    backgroundStyles = {
      backgroundImage: "url('/adidaslogo.png')",
      backgroundSize: '80%',
      backgroundRepeat: 'no-repeat',
    };
  }

  return (
    <motion.div className={classes.container} variants={cardVariants}>
      <div
        className={classes.card}
        ref={cardRef}

        // style={{
        //   animationDelay: `${id * 200}ms`,
        // }}
      >
        <div className={classes.backText} style={backgroundStyles}>
          {}
        </div>
        <div
          className={classes.imgBx}
          onClick={() => {
            navigate(`/products/product-${product.id}`);
            // console.log(first)
          }}
        >
          <img
            // src='/placeholder.png'
            src='/placeholder.png'
            alt=''
            style={{
              left: '60%',
              transform: 'translate(-50%, -50%)',
            }}
            onLoad={(e) => {
              let img = e.target as HTMLImageElement;
              img.src = `${product.images[0]}`;
              img.style.left = '50%';
              img.style.transform = 'translate(-50%, -50%) rotate(-25deg)';
            }}
          />
          {/* <ImageSkeleton /> */}
        </div>
        <h3 className={classes.price}>{formatPrice(product.price)}</h3>
        <div className={classes.contentBx}>
          <h2>{product.title}</h2>
          <div className={classes.size}>
            <h3>Size:</h3>
            <div className={classes.sizes}>
              <span
                ref={sizeRef}
                className={size === 40 ? `${classes.activeSize}` : ''}
                onClick={(e) => {
                  setSize(Number(e.currentTarget.textContent));
                }}
              >
                40
              </span>
              <span
                ref={sizeRef}
                className={size === 41 ? `${classes.activeSize}` : ''}
                onClick={(e) => {
                  setSize(Number(e.currentTarget.textContent));
                }}
              >
                41
              </span>
              <span
                ref={sizeRef}
                className={size === 42 ? `${classes.activeSize}` : ''}
                onClick={(e) => {
                  setSize(Number(e.currentTarget.textContent));
                }}
              >
                42
              </span>
              <span
                ref={sizeRef}
                className={size === 43 ? `${classes.activeSize}` : ''}
                onClick={(e) => {
                  setSize(Number(e.currentTarget.textContent));
                }}
              >
                43
              </span>
              <span
                ref={sizeRef}
                className={size === 44 ? `${classes.activeSize}` : ''}
                onClick={(e) => {
                  setSize(Number(e.currentTarget.textContent));
                }}
              >
                44
              </span>
              <span
                ref={sizeRef}
                className={size === 45 ? `${classes.activeSize}` : ''}
                onClick={(e) => {
                  setSize(Number(e.currentTarget.textContent));
                }}
              >
                45
              </span>
              <span
                ref={sizeRef}
                className={size === 46 ? `${classes.activeSize}` : ''}
                onClick={(e) => {
                  setSize(Number(e.currentTarget.textContent));
                }}
              >
                46
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              const prod: CartProduct = {
                ...product,
                quantity: 1,
                thumb: product.images[0],
                size: size,
                cartID: `${product.id}${size}${product.title.slice(0, 10)}`,
              };
              handleAddToCart(prod);
              console.log(size);
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
