import React from 'react'
import './Gallery.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-cube'

import './Gallery.css'
import { Pagination, Navigation, EffectCube } from 'swiper'
import { useAppSelector } from '../store/Store'

const Gallery = ({ image, images }: { image: string; images: string[] }) => {
  const sorted = [...images].sort()
  const slides = sorted.map((img, idx) => (
    <SwiperSlide key={idx}>
      <img src={img} />
    </SwiperSlide>
  ))

  return (
    <>
      <Swiper
        slidesPerView={1}
        effect={'cube'}
        spaceBetween={30}
        loop={true}
        cubeEffect={{
          shadow: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation, EffectCube]}
        className='mySwiper'
        // style={{
        //   '--swiper-pagination-color': '#FF7D1B',
        //   '--swiper-navigation-color': '#FF7D1B',
        // }}
      >
        {slides}
      </Swiper>
    </>
  )
}

export default Gallery
