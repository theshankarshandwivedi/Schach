import React from 'react'
import './LinkGame.css'
import { useNavigate } from 'react-router-dom'

const LinkGame = () => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col items-center justify-between'>
        <h1 className='text-7xl mb-10 text-red-800 font-bold font-sans'>Chess Duel</h1>
        <button
          onClick={() => navigate('/home/link/generate')}  
          className='bg-white text-black'>Generate game link</button>
        <br/>
        <button
          onClick={() => navigate('/home/link/enter')} 
          className='bg-red-800 text-white'>Join using link</button>
    </div>
  )
}

export default LinkGame