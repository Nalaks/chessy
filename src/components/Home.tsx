import { FC, useState } from 'react'
import { auth, db } from '../lib/firebase'
import { addDoc, doc, setDoc, collection } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const Home: FC = () => {
  const { currentUser } = auth
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  const gameOptions = [
    { name: 'Black pieces', value: 'b' },
    { name: 'White pieces', value: 'w' },
    { name: 'Random pieces', value: 'r' }
  ]
  const handlePlayOnline = () => {
    setShowModal(true)
  }

  const startOnlineGame = async (startingPiece: string) => {
    const member = {
      uuid: currentUser?.uid,
      piece:
        startingPiece === 'r'
          ? Math.random() > 0.5
            ? 'w'
            : 'b'
          : startingPiece,
      name: localStorage.getItem('userName') || 'Anonymous',
      creator: true
    }
    const game = {
      status: 'waiting',
      members: [member],
      gameId: `${Math.random().toString(36).substring(2, 9)}_${Date.now()}`
    }
    await addDoc(collection(db, game.gameId), game)
    navigate(`/game/${game.gameId}`)
  }
  return (
    <>
      <div className='columns home-container'>
        <div className='column has-background-primary home-columns'>
          <button className='button is-link' onClick={handlePlayOnline}>
            Play locally
          </button>
        </div>
        <div className='column has-background-link home-columns'>
          <button className='button is-primary' onClick={handlePlayOnline}>
            Play online
          </button>
        </div>
      </div>
      <div
        className={`modal ${showModal ? 'is-active' : ''}`}
        onClick={() => setShowModal(false)}>
        <div className='modal-background'></div>
        <div className='modal-content'>
          <div className='card'>
            <div className='card-content'>
              Please select which side to start
            </div>{' '}
            <footer className='card-footer'>
              {gameOptions.map(({ name, value }) => (
                <span
                  className='card-footer-item curser-pointer'
                  key={value}
                  onClick={() => startOnlineGame(value)}>
                  {name}
                </span>
              ))}
            </footer>
          </div>
        </div>
        <button
          className='modal-close is-large'
          onClick={() => setShowModal(false)}></button>
      </div>
    </>
  )
}

export default Home
