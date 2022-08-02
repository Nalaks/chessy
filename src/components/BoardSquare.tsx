import { FC, useEffect, useState } from 'react'
import { BoardSquareProps, DropItem, PendingPromotion } from '../types/types'
import Piece from './Piece'
import Square from './Square'
import { useDrop } from 'react-dnd'
import { handleMove, gameSubject } from '../lib/game'
import Promote from './Promote'

const BoardSquare: FC<BoardSquareProps> = ({ piece, black, position }) => {
  const [, drop] = useDrop({
    accept: 'piece',
    drop: (item: DropItem) => {
      const [from] = item.id.split('_')
      handleMove(from, position)
    }
  })
  const [promotion, setPromotion] = useState<PendingPromotion | null>(null)

  useEffect(() => {
    const subscribe = gameSubject.subscribe(({ pendingPromotion }) => {
      pendingPromotion && pendingPromotion.to === position
        ? setPromotion(pendingPromotion)
        : setPromotion(null)
    })
    return () => subscribe.unsubscribe()
  }, [position])
  return (
    <div className='board-square' ref={drop}>
      <Square black={black}>
        {promotion ? (
          <Promote promotion={promotion} />
        ) : piece ? (
          <Piece piece={piece} position={position} />
        ) : null}
      </Square>
    </div>
  )
}

export default BoardSquare
