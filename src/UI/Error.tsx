import React from 'react'
import classes from './Error.module.css'

const Error = ({ message, color }: { message: string; color: string }) => {
  return (
    <div
      style={{
        backgroundColor: color,
      }}
      className={classes.error}
    >
      {message}
    </div>
  )
}

export default Error
