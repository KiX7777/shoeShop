import React from 'react'
import ContentLoader from 'react-content-loader'

const CardsLoading = (props) => {
  const rows = 3
  const columns = 3
  const coverHeight = 350
  const coverWidth = 250
  const padding = 20
  const speed = 1

  const coverHeightWithPadding = coverHeight + padding
  const coverWidthWithPadding = coverWidth + padding
  const initial = 0
  const covers = Array(columns * rows).fill(1)

  return (
    <ContentLoader
      speed={speed}
      width={columns * coverWidthWithPadding}
      height={rows * coverHeightWithPadding}
      primarycolor='#242b34'
      secondarycolor='#343d4c'
      {...props}
    >
      {covers.map((g, i) => {
        let vy = Math.floor(i / columns) * coverHeightWithPadding + initial
        let vx = (i * coverWidthWithPadding) % (columns * coverWidthWithPadding)
        return (
          <rect
            key={i}
            x={vx}
            y={vy}
            rx='20'
            ry='20'
            width={coverWidth}
            height={coverHeight}
          />
        )
      })}
    </ContentLoader>
  )
}

export default CardsLoading
