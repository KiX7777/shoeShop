import { useEffect, useState } from 'react';
import classes from './Orders.module.css';
import { useAppSelector } from '../store/Store';
import { Order } from '../store/cartStore';

import { formatPrice } from '../helpers/helpers';
import OrdersSkeleton from './OrdersSkeleton';
import { motion } from 'framer-motion';
import { containerVariants } from '../pages/Home';

const Orders = () => {
  const orders = useAppSelector((state) => state.user.previousOrders);
  const [list, setList] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const or = orders[0];
    let products: JSX.Element[] = [];
    let arr: any = [];
    if (or) {
      for (const key in or) {
        let el = or[key as keyof Order];
        arr.push(el) as Order;
      }

      arr.forEach((order: Order, idx: number) => {
        const elem = (
          <div
            className={classes.order}
            key={order.firstName + order.total + order.lastName + idx}
          >
            <h1>{order.date}</h1>
            {order.products.map((ord, idx) => (
              <div className={classes.orderedProduct} key={idx}>
                <div className={classes.orderInfo}>
                  <h2>
                    {ord.name} <small>x</small> {ord.quantity}
                  </h2>
                  <h2>={formatPrice(ord.total)}</h2>
                </div>
                <img src={ord.image} alt={ord.name} />
              </div>
            ))}
            <h1>TOTAL: {formatPrice(order.total)}</h1>
          </div>
        );
        products.push(elem);
      });

      setList(products);
    }
  }, [orders]);
  return (
    <motion.div
      variants={containerVariants}
      exit='exit'
      initial='hidden'
      animate='visible'
      className={classes.ordersContainer}
    >
      {list.length === 0 && <OrdersSkeleton />}
      <div className={classes.ordersList}>{list}</div>
    </motion.div>
  );
};

export default Orders;
