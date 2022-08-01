import React, { FC } from 'react'
import { SquareProps } from '../types/types'

const Square: FC<SquareProps> = ({ children, black }) => {
  const bgColor = black ? 'square-black' : 'square-white'
  return <div className={`${bgColor} board-square`}>{children}</div>
}

export default Square
