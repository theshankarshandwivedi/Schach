import React, { useState } from 'react'
import './EnterLink.css'
import { useNavigate } from 'react-router-dom'
import { get, ref, update } from 'firebase/database'
import { db } from '../../firebase/FirebaseConfig'

const EnterLink = () => {

  const navigate = useNavigate()
  const [link, setLink] = useState('')

  const startGame = async () => {
    const gameRef = ref(db, 'games/'+link)
    const snapshot = await get(gameRef)
    if(!snapshot) {
      alert('Invalid Link')
    }
    else {
      update(gameRef, {
        player2: {name: sessionStorage.getItem('username'), rating: sessionStorage.getItem('rating'), color: 'black'}, 
      })
      navigate(`/game/${link}`)
    }
    
  }

  return (
      <div className='flex flex-col items-center justify-between'>
          <h1 className='text-7xl mb-10 text-red-800 font-bold font-sans'>Chess Duel</h1>
         <div className='flex items-center justify-between  w-full py-1 mb-3'>
            <h2 className='w-1/2 font-bold text-xl '>Enter Link :</h2>
            <input onChange={(e) => setLink(e.target.value)} className='w-full border-2 rounded px-1 text-lg italic font-sans' type='text' ></input>
         </div>
          <button onClick={startGame} className='start bg-red-800 text-white'>Start Game</button>
      </div>
    )
}

export default EnterLink