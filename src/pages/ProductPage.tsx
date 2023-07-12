import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import classes from './ProductPage.module.css';
import { useAppDispatch, useAppSelector } from '../store/Store';
import { cartActions } from '../store/cartStore';
import { Product } from './Products';
import ProductPageLayout from '../UI/ProductPageLayout';
import Gallery from '../Components/Gallery';
import { CartProduct } from '../store/cartStore';
import { formatPrice } from '../helpers/helpers';
import { motion } from 'framer-motion';
import { containerVariants } from './Home';

const ProductPage = () => {
  const dispatch = useAppDispatch();
  const [quantity, setquantity] = useState(1);
  const [size, setSize] = useState(40);
  const params = useParams();
  const id = params.product!.slice(8);
  const sizeRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    sizeRef.current?.classList.add(`${classes.slideinblurredleft}`);

    const timeout = setTimeout(() => {
      sizeRef.current?.classList.remove(`${classes.slideinblurredleft}`);
    }, 301);

    return () => {
      clearTimeout(timeout);
    };
  }, [quantity]);

  let products: Product[];
  products = useAppSelector<Product[]>((state) => state.products.products);

  if (products.length === 0) {
    const productsStorage = localStorage.getItem('products');
    products = JSON.parse(productsStorage!) as Product[];
  }

  const product = products.find((prod) => prod.id === id) as Product;

  function handleAddToCart(prod: CartProduct) {
    const product: CartProduct = {
      ...prod,
    };
    dispatch(cartActions.add(product));
    setquantity(1);
  }

  return (
    <ProductPageLayout>
      <motion.main
        variants={containerVariants}
        exit='exit'
        initial='hidden'
        animate='visible'
        className={classes.mainContainer}
      >
        <div className={classes.imageCont}>
          <Gallery images={product.images} />
        </div>

        <div className={classes.infoCont}>
          <div className={classes.titleCont}>
            <span className={classes.brand}>{product.brand.toUpperCase()}</span>
            <h2>{product.title}</h2>
          </div>
          <div className={classes.description}>{product.description}</div>
          <div className={classes.pricesCont}>
            <div className={classes.current}>
              <p className={classes.currPrice}>{formatPrice(product.price)}</p>
              <span className={classes.discount}>30%</span>
            </div>
            <p className={classes.oldPrice}>
              {formatPrice(product.price + product.price * 0.3)}
            </p>
          </div>
          <div className={classes.buttons}>
            <div className={classes.quantity}>
              <button
                id='minus'
                onClick={() => {
                  setquantity((prev) => prev - 1);
                  if (quantity <= 1) {
                    setquantity(1);
                  }
                }}
              >
                <img src='/icon-minus.svg' alt='' />
              </button>
              <p ref={sizeRef} className={classes.currentquantity}>
                {quantity}
              </p>
              <button
                id='plus'
                onClick={() => {
                  setquantity((prev) => prev + 1);
                }}
              >
                <img src='/icon-plus.svg' alt='' />
              </button>
            </div>
            <div className={classes.add}>
              <select
                name='size'
                className={classes.size}
                value={size}
                onChange={(e) => {
                  setSize(+e.target.value);
                }}
              >
                <option value='40'>40</option>
                <option value='41'>41</option>
                <option value='42'>42</option>
                <option value='43'>43</option>
                <option value='44'>44</option>
                <option value='45'>45</option>
                <option value='46'>46</option>
              </select>
              <button
                className={classes.addtocart}
                onClick={() => {
                  const prod = {
                    ...product,
                    quantity: quantity,
                    size: size,
                    cartID: `${product.id}${size}${product.title.slice(0, 10)}`,
                    thumb: product.images[0],
                  };
                  console.log(products);
                  handleAddToCart(prod);
                }}
              >
                <img src='/icon-cart.svg' alt='' />
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </motion.main>
    </ProductPageLayout>
  );
};

export default ProductPage;
