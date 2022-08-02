import { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import UserForm from './components/UserForm'
import App from './App'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './lib/firebase'
import './App.css'

const Router: FC = () => {
  const [user, loading, error] = useAuthState(auth)

  return (
    <>
      {loading && 'Loading...'}
      {error && 'There was an error. Please try again.'}
      {!user && <UserForm />}
      {user && (
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/game/:id' element={<App />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  )
}

export default Router
