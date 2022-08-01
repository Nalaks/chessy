import { FC, useEffect, useState } from 'react'
import Board from './components/Board'
import { gameSubject, initGame } from './lib/game'
import './App.css'

const App: FC = () => {
  const [board, setBoard] = useState<any[]>([])
  useEffect(() => {
    initGame()
    const subscribe = gameSubject.subscribe((game: any) => {
      setBoard(game.board)
    })
    return () => subscribe.unsubscribe()
  }, [])
  return (
    <div className='container'>
      <div className='board-container'>
        <Board board={board} />
      </div>
    </div>
  )
}

export default App
