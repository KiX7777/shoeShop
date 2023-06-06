import React from 'react'
import ContentLoader from 'react-content-loader'

const OrdersSkeleton = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <FadingLoaderCard1 />
      <FadingLoaderCard2 />
      <FadingLoaderCard3 />
      <FadingLoaderCard4 />
    </div>
  )
}

const FadingLoaderCard1 = () => {
  return (
    <ContentLoader
      width={1000}
      height={200}
      backgroundColor='#ababab'
      foregroundColor='#fafafa'
    >
      <rect x='70' y='15' rx='5' ry='0' width='800' height='15' />
      <rect x='70' y='39' rx='5' ry='0' width='800' height='40' />
      <rect x='900' y='15' rx='0' ry='0' width='60' height='60' />
    </ContentLoader>
  )
}

const FadingLoaderCard2 = () => {
  return (
    <ContentLoader
      width={1000}
      height={200}
      backgroundColor='#bfbfbf'
      foregroundColor='#fafafa'
    >
      <rect x='70' y='15' rx='5' ry='0' width='800' height='15' />
      <rect x='70' y='39' rx='5' ry='0' width='800' height='40' />
      <rect x='900' y='15' rx='0' ry='0' width='60' height='60' />
    </ContentLoader>
  )
}

const FadingLoaderCard3 = () => {
  return (
    <ContentLoader
      width={1000}
      height={200}
      backgroundColor='#dadada'
      foregroundColor='#fafafa'
    >
      <rect x='70' y='15' rx='5' ry='5' width='800' height='15' />
      <rect x='70' y='39' rx='5' ry='5' width='800' height='40' />
      <rect x='900' y='15' rx='0' ry='0' width='60' height='60' />
    </ContentLoader>
  )
}

const FadingLoaderCard4 = () => {
  return (
    <ContentLoader
      width={1000}
      height={200}
      backgroundColor='#ececec'
      foregroundColor='#fafafa'
    >
      <rect x='70' y='15' rx='5' ry='5' width='800' height='15' />
      <rect x='70' y='39' rx='5' ry='5' width='800' height='40' />
      <rect x='900' y='15' rx='0' ry='0' width='60' height='60' />
    </ContentLoader>
  )
}

export default OrdersSkeleton
