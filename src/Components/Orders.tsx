import React, { useEffect, useState } from 'react'
import classes from './Orders.module.css'
import { useAppSelector } from '../store/Store'
import { Order } from '../store/cartStore'
import { ObjectType } from 'typescript'
import { OrderProduct } from './CheckoutForm'
import { formatPrice } from '../helpers'

const Orders = () => {
  const orders = useAppSelector((state) => state.user.previousOrders)
  const [list, setList] = useState<JSX.Element[]>([])

  // let list
  useEffect(() => {
    const or = orders[0]
    let products: JSX.Element[] = []
    let arr: any = []
    if (or) {
      for (const key in or) {
        let el = or[key as keyof Order]
        arr.push(el) as Order
      }

      arr.forEach((order: Order, idx: number) => {
        console.log(order.firstName, order.products)
        const elem = (
          <div
            style={{
              marginBottom: '20px',
              border: '1px solid black',
              borderRadius: '10px',
            }}
            key={order.firstName + order.total + order.lastName + idx}
          >
            <h1>{order.date}</h1>
            {order.products.map((ord, idx) => (
              <div key={idx}>
                <h2>
                  {ord.name} <small>x</small> {ord.quantity}
                </h2>
                <h2>={formatPrice(ord.total)}</h2>
              </div>
            ))}
            <h1>TOTAL: {formatPrice(order.total)}</h1>
          </div>
        )
        products.push(elem)
      })

      setList(products)
    }
  }, [orders])
  return <div className={classes.ordersContainer}>{list}</div>
}

export default Orders
