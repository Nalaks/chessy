import { FC } from 'react'
import { BoardSquareProps } from '../types/types'
import Piece from './Piece'
import Square from './Square'

const BoardSquare: FC<BoardSquareProps> = ({ piece }) => {
  return (
    <div>
      <Square>{piece && <Piece piece={piece} />}</Square>
    </div>
  )
}

export default BoardSquare
