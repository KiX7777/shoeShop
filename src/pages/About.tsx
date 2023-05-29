import React, { useEffect } from 'react'
import Gallery from '../Components/Gallery'
import classes from './About.module.css'
import ProductCard from '../Components/ProductCard'
import { firebaseConfig } from '../firebase'
import { initializeApp } from 'firebase/app'
import { useState, useCallback } from 'react'

import { getStorage, ref, getDownloadURL, listAll } from 'firebase/storage'

const app = initializeApp(firebaseConfig)
const storage = getStorage()

const About = () => {
  const [imgs, setImages] = useState<string[]>([])
  const [isLoading, setisLoading] = useState(true)

  const getURLs = useCallback(async (url: string) => {
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
  }, [])

  const getImages = useCallback(async () => {
    const data = await getURLs('/shoes')
    console.log(data)
    data.forEach((path) => {
      getDownloadURL(ref(storage, path)).then((res) => {
        console.log(res)
        setImages((prev) => {
          const arr = [...prev, res]
          return arr
        })
        // console.log(arr)
      })
    })
  }, [])

  useEffect(() => {
    getImages()
    setisLoading(false)
  }, [getImages])
  const imgsList = imgs.map((image) => <img key={image} src={image} />)

  return (
    <div className={classes.aboutContainer}>
      <h1>About</h1>
      <>{isLoading ? <h1>Loading...</h1> : imgsList} </>
      <button
        onClick={() => {
          console.log(imgs)
        }}
      >
        LOG
      </button>
    </div>
  )
}

export default About
