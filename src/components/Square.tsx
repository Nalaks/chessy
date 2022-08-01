import React, { FC } from 'react'
import { SquareProps } from '../types/types'

const Square: FC<SquareProps> = ({ children }) => {
  return <div>{children}</div>
}

export default Square
