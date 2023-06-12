import React from 'react'
import './Gallery.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-cube'

import './Gallery.css'
import { Pagination, Navigation, EffectCube } from 'swiper'

const Gallery = ({ images }: { images: string[] }) => {
  const sorted = [...images].sort()
  const slides = sorted.map((img, idx) => (
    <SwiperSlide key={idx}>
      <img src={img} alt='Product' />
    </SwiperSlide>
  ))

  return (
    <>
      <Swiper
        slidesPerView={1}
        effect={'cube'}
        spaceBetween={30}
        cubeEffect={{
          shadow: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation, EffectCube]}
        className='mySwiper'
      >
        {slides}
      </Swiper>
    </>
  )
}

export default Gallery
