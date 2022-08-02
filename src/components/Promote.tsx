import { FC } from 'react'
import { PromoteProps } from '../types/types'
import Square from './Square'
import { move } from '../lib/game'

const promotionPieces = ['r', 'n', 'b', 'q']

const Promote: FC<PromoteProps> = ({ promotion }) => {
  const { from, to, color } = promotion
  return (
    <div className='board'>
      {promotionPieces.map((p, i) => (
        <div key={i} className='promote-square'>
          <Square black={i % 3 === 0}>
            <div className='piece-container' onClick={() => move(from, to, p)}>
              <img
                src={require(`../assets/${p}_${color}.png`)}
                alt={`${p}_${color}`}
                className='piece cursor-pointer'
              />
            </div>
          </Square>
        </div>
      ))}
    </div>
  )
}

export default Promote
