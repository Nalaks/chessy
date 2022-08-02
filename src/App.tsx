import { FC, useEffect, useState } from 'react'
import Board from './components/Board'
import { gameSubject, initGame, resetGame } from './lib/game'
import './App.css'

const App: FC = () => {
  const [board, setBoard] = useState<any[]>([])
  const [isGameOver, setIsGameOver] = useState(false)
  const [result, setResult] = useState('')
  const [turn, setTurn] = useState('')

  useEffect(() => {
    initGame()
    const subscribe = gameSubject.subscribe((game: any) => {
      setBoard(game.board)
      setIsGameOver(game.isGameOver)
      setResult(game.result)
      setTurn(game.turn)
    })
    return () => subscribe.unsubscribe()
  }, [])
  return (
    <div className='app-container'>
      {isGameOver && (
        <>
          <h2 className='vertical-text'>
            GAME OVER
            <button className='new-game-btn' onClick={() => resetGame()}>
              <span className='vertical-text'>NEW GAME</span>
            </button>
          </h2>
        </>
      )}
      <div className='board-container'>
        <Board board={board} turn={turn} />
      </div>
      {result && <p className='vertical-text'>{result}</p>}
    </div>
  )
}

export default App
