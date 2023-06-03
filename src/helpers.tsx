import { firebaseConfig } from './firebase'
import { initializeApp } from 'firebase/app'
import { useState, useCallback } from 'react'
import { Product } from './pages/Products'

import { getStorage, ref, getDownloadURL, listAll } from 'firebase/storage'

const app = initializeApp(firebaseConfig)
const storage = getStorage()

export function formatPrice(price: number) {
  const formatted = new Intl.NumberFormat('hr-HR', {
    style: 'currency',
    currency: 'EUR',
  }).format(price)
  return formatted
}

const getURLs = async (url: string) => {
  const listRef = ref(storage, url)
  const res = await listAll(listRef)
  let urls: string[] = []

  console.log(res.items[0])
  res.items.forEach(
    (item) => urls.push(item.fullPath)
    // urls.push(imageUrl.toString())
  )
  console.log(urls)
  return urls
}

export const getImages = async (url: string) => {
  const data = await getURLs(url)
  console.log(data)
  let images: string[] = []
  data.forEach((path) => {
    getDownloadURL(ref(storage, path)).then((res) => {
      // console.log(res)
      images.push(res)
      // images = images.concat(res)
      // setImages((prev) => {
      //   const arr = [...prev, res]
      //   return arr
      // })
      // console.log(arr)
    })
  })
  return images
}

export const pushImages = async (products: Product[]) => {
  try {
    const res = await fetch(
      'https://ecommerce-e8b82-default-rtdb.europe-west1.firebasedatabase.app/.json',
      {
        method: 'POST',
        body: JSON.stringify(products),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await res.json()
    console.log(data)
  } catch (error) {}
}

export function sortColor(a: Product, b: Product) {
  if (a.color < b.color) {
    return -1
  }
  if (a.color > b.color) {
    return 1
  }
  return 0
}
export function sortPriceUp(a: Product, b: Product) {
  if (a.price < b.price) {
    return -1
  }
  if (a.price > b.price) {
    return 1
  }
  return 0
}
export function sortPriceDown(a: Product, b: Product) {
  if (a.price < b.price) {
    return 1
  }
  if (a.price > b.price) {
    return -1
  }
  return 0
}
export function sortNameAsc(a: Product, b: Product) {
  if (a.title < b.title) {
    return -1
  }
  if (a.title > b.title) {
    return 1
  }
  return 0
}
export function sortNameDesc(a: Product, b: Product) {
  if (a.title < b.title) {
    return 1
  }
  if (a.title > b.title) {
    return -1
  }
  return 0
}

export function setLocalStorage(token: string) {
  localStorage.setItem('token', token)
}
export function loadLocalStorage() {
  localStorage.getItem('token')
}
