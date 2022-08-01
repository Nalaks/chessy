import { FC } from 'react'
import { BoardProps, ChessBoardColumn } from '../types/types'
import BoardSquare from './BoardSquare'

const Board: FC<BoardProps> = ({ board }) => {
  const getPosition = (index: number) => {
    const x = index % 8
    const y = Math.abs(Math.floor(index / 8) - 7)
    return { x, y }
  }

  const getBoardSquare = (index: number) => {
    const { x, y } = getPosition(index)
    return `${ChessBoardColumn[x]}${y + 1}`
  }

  const isBlack = (index: number) => {
    const { x, y } = getPosition(index)
    return (x + y) % 2 === 1
  }
  return (
    <div className='board'>
      {board?.flat().map((piece, index) => (
        <div key={index} className='square'>
          <BoardSquare
            piece={piece}
            black={isBlack(index)}
            position={getBoardSquare(index)}
          />
        </div>
      ))}
    </div>
  )
}

export default Board
