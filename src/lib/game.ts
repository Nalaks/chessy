import { Chess, ShortMove, Square } from 'chess.js'
import { BehaviorSubject } from 'rxjs'
import { BehaviorType, PendingPromotion, PromotionPiece } from '../types/types'

const chess = new Chess()

export const gameSubject = new BehaviorSubject<BehaviorType>({
  board: chess.board(),
  pendingPromotion: undefined
})

export const move = (from: string, to: string, promotion?: string) => {
  const chessMove: ShortMove = {
    from: from as Square,
    to: to as Square
  }
  if (promotion) {
    chessMove.promotion = promotion as PromotionPiece
  }
  const legalMove = chess.move(chessMove)

  if (legalMove) {
    updateGame()
  }
}

const updateGame = (pendingPromotion?: PendingPromotion) => {
  const isGameOver = chess.game_over()
  const newGame = {
    board: chess.board(),
    pendingPromotion,
    isGameOver,
    turn: chess.turn(),
    result: isGameOver ? getGameResult() : null
  }
  localStorage.setItem('savedGame', chess.fen())
  gameSubject.next(newGame)
}

const getGameResult = () => {
  if (chess.in_checkmate()) {
    const winner = chess.turn() === 'w' ? 'BLACK' : 'WHITE'
    return `CHECKMATE - WINNER - ${winner}`
  }
  if (chess.in_draw()) {
    let reason = '50 - MOVES - RULE'
    if (chess.in_stalemate()) {
      reason = 'STALEMATE'
    } else if (chess.in_threefold_repetition()) {
      reason = 'THREEFOLD - REPETITION'
    } else if (chess.insufficient_material()) {
      reason = 'INSUFFICIENT - MATERIAL'
    }
    return `DRAW - ${reason}`
  }
  return 'UNKNOWN - RESULT'
}

export const initGame = () => {
  const savedGame = localStorage.getItem('savedGame')
  if (savedGame) {
    chess.load(savedGame)
  }
  updateGame()
}

export const resetGame = () => {
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
