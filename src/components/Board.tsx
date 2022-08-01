import { FC } from 'react'
import { BoardProps } from '../types/types'
import BoardSquare from './BoardSquare'

const Board: FC<BoardProps> = ({ board }) => {
  return (
    <div className='board'>
      {board?.flat().map((piece, index) => (
        <div key={index} className='square'>
          <BoardSquare piece={piece} />
        </div>
      ))}
    </div>
  )
}

export default Board
