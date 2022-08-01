import { FC } from 'react'
import { PieceProps } from '../types/types'

const Piece: FC<PieceProps> = ({ piece }) => {
  return <div>{piece.type}</div>
}

export default Piece
