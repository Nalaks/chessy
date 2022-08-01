import { FC } from 'react'
import { PieceProps } from '../types/types'
import { useDrag, DragPreviewImage } from 'react-dnd'

const Piece: FC<PieceProps> = ({ piece, position }) => {
  const { color, type } = piece
  const img = require(`./../assets/${type}_${color}.png`)

  const [{ isDragging }, drag, preview] = useDrag({
    type: 'piece',
    item: { type: 'piece', id: `${position}_${type}_${color}` },
    collect: monitor => {
      return {
        isDragging: !!monitor.isDragging()
      }
    }
  })
  return (
    <>
      <DragPreviewImage connect={preview} src={img} />
      <div
        className='piece-container'
        ref={drag}
        style={{ opacity: isDragging ? 0 : 1 }}>
        <img src={img} alt={`${type}_${color}`} className='piece' />
      </div>
    </>
  )
}

export default Piece
