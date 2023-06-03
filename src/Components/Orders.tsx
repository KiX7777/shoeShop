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
    let products: OrderProduct[] = []
    let arr: any = []
    if (or) {
      for (const key in or) {
        let el = or[key as keyof Order]
        arr.push(el) as Order
        console.log(arr)
        console.log(arr[0].products[1])
      }

      arr.forEach((order: Order) => {
        products.push(...order.products)
        console.log(products)
      })

      // products.map()

      const lista = products.map((order) => (
        <div key={order.id + order.size + order.total}>
          <h1>{order.name}</h1>
          <h3>{order.size}</h3>
          <h2>{formatPrice(order.total)}</h2>
        </div>
      ))
      setList(lista)
      console.log(products)
    }
  }, [orders])
  return <div className={classes.ordersContainer}>{list}</div>
}

export default Orders
