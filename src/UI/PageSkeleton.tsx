import React from 'react'
import ContentLoader from 'react-content-loader'

const PageSkeleton = ({ ...rest }) => (
  <ContentLoader
    speed={2}
    width={1000}
    height={1000}
    viewBox='0 0 1000 1000'
    backgroundColor='#efefef'
    foregroundColor='#dedede'
  >
    <rect x='25' y='76' rx='0' ry='0' width='1000' height='1000' />
  </ContentLoader>
)

export default PageSkeleton
