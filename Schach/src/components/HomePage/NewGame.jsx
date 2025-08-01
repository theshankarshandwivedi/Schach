import React from 'react'
import './NewGame.css'
import { useNavigate } from 'react-router-dom'

const NewGame = () => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col items-center justify-between'>
        <h1 className='text-7xl mb-10 text-red-800 font-bold font-sans'>Chess Duel</h1>
        <button
          onClick={() => navigate('/game')} 
          className='bg-white text-black'>Offline(with Computer)</button>
        <br/>
        <button
          onClick={() => navigate('/home/link')} 
          className='bg-red-800 text-white'>Online(with Friend)</button>
    </div>
    
  )
}

export default NewGame