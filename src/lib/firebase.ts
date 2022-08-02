import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBdvzIYnW70YnLHn0wekxLta3PQiP9dpoA',
  authDomain: 'react-chess-game-73c22.firebaseapp.com',
  projectId: 'react-chess-game-73c22',
  storageBucket: 'react-chess-game-73c22.appspot.com',
  messagingSenderId: '414340250313',
  appId: '1:414340250313:web:4e2e558402746275c36b18'
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
export default app
