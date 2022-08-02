import { signInAnonymously } from 'firebase/auth'
import { FC, useState } from 'react'
import { auth } from '../lib/firebase'

const UserForm: FC = () => {
  const [name, setName] = useState('')
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    localStorage.setItem('userName', name)
    await signInAnonymously(auth)
  }
  return (
    <form className='user-form' onSubmit={handleSubmit}>
      <h1>Enter your name to start</h1>
      <br />
      <div className='field'>
        <p className='control'>
          <input
            type='text'
            className='input'
            value={name}
            placeholder='Name'
            onChange={e => setName(e.target.value)}
            required
          />
        </p>
      </div>
      <div className='field'>
        <p className='control'>
          <button className='button is-success' type='submit'>
            Start
          </button>
        </p>
      </div>
    </form>
  )
}

export default UserForm
