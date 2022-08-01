import { FC } from 'react'
import { BoardSquareProps, DropItem } from '../types/types'
import Piece from './Piece'
import Square from './Square'
import { useDrop } from 'react-dnd'
import { move } from '../lib/game'

const BoardSquare: FC<BoardSquareProps> = ({ piece, black, position }) => {
  const [, drop] = useDrop({
    accept: 'piece',
    drop: (item: DropItem) => {
      const [from] = item.id.split('_')
      move(from, position)
    }
  })
  return (
    <div className='board-square' ref={drop}>
      <Square black={black}>
        {piece && <Piece piece={piece} position={position} />}
      </Square>
    </div>
  )
}

export default BoardSquare
