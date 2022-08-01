import { Chess, Square } from 'chess.js'
import { BehaviorSubject } from 'rxjs'

const chess = new Chess()

export const gameSubject = new BehaviorSubject({
  board: chess.board()
})

export const move = (from: string, to: string) => {
  const chessMove = {
    from: from as Square,
    to: to as Square
  }
  const legalMove = chess.move(chessMove)

  if (legalMove) {
    gameSubject.next({
      board: chess.board()
    })
  }
}
