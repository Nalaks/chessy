import { Chess, Square } from 'chess.js'
import { BehaviorSubject } from 'rxjs'
import { BehaviorType, PendingPromotion } from '../types/types'

const chess = new Chess()

export const gameSubject = new BehaviorSubject<BehaviorType>({
  board: chess.board(),
  pendingPromotion: undefined
})

export const move = (from: string, to: string) => {
  const chessMove = {
    from: from as Square,
    to: to as Square
  }
  const legalMove = chess.move(chessMove)

  if (legalMove) {
    updateGame()
  }
}

const updateGame = (pendingPromotion?: PendingPromotion) => {
  const newGame = {
    board: chess.board(),
    pendingPromotion
  }
  gameSubject.next(newGame)
}

export const initGame = () => {
  chess.reset()
  updateGame()
}

export const handleMove = (from: string, to: string) => {
  const promotions = chess
    .moves({ verbose: true })
    .filter(move => move.flags.includes('p'))

  if (promotions.some(p => `${p.from}:${p.to}` === `${from}:${to}`)) {
    const pendingPromotion: PendingPromotion = {
      from,
      to,
      color: promotions[0].color
    }
    updateGame(pendingPromotion)
  }
  const { pendingPromotion } = gameSubject.getValue()
  if (!pendingPromotion) {
    move(from, to)
  }
}
