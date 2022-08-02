import { FC, useEffect, useState } from 'react'
import { BoardProps, BoardRow, ChessBoardColumn } from '../types/types'
import BoardSquare from './BoardSquare'

const Board: FC<BoardProps> = ({ board, turn }) => {
  const getPosition = (index: number) => {
    const x = turn === 'w' ? index % 8 : Math.abs((index % 8) - 7)
    const y =
      turn === 'w' ? Math.abs(Math.floor(index / 8) - 7) : Math.floor(index / 8)
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

  const [currentBoard, setCurrentBoard] = useState<BoardRow[]>([])
  useEffect(() => {
    setCurrentBoard(turn === 'w' ? board.flat() : board.flat().reverse())
  }, [board, turn])

  return (
    <div className='board'>
      {currentBoard.flat().map((piece, index) => (
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
