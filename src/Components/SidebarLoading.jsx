import React from 'react'
import ContentLoader from 'react-content-loader'

const SidebarLoading = (props) => {
  return (
    <ContentLoader viewBox='0 0 200 875' height={875} width={200} {...props}>
      <rect x='0' y='0' rx='10' ry='10' width='200' height='875' />
    </ContentLoader>
  )
}

export default SidebarLoading
