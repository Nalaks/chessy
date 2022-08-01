import { FC, useEffect, useState } from 'react'
import Board from './components/Board'
import { gameSubject } from './lib/game'
import './App.css'

const App: FC = () => {
  const [board, setBoard] = useState<any[]>([])
  useEffect(() => {
    const subscribe = gameSubject.subscribe(game => {
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
