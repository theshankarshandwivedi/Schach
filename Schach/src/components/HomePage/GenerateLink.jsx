import React, { useEffect, useState } from 'react'
import './GenerateLink.css'
import copyIcon from '../../assets/copy-icon.png'
import { db, ref, set } from '../../firebase/FirebaseConfig'
import { useNavigate } from 'react-router-dom'

const GenerateLink = () => {

  const navigate = useNavigate();

  const [link, setLink] = useState('')
  const [isCopied, setIsCopied] = useState(false)
  useEffect(() => {
    setLink(generateLink())
  },[])

  const copyLink = () => {
    navigator.clipboard.writeText(link)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 700)

  }

  const startGame = async () => {
    const gameRef = ref(db, 'games/'+link)
    await set(gameRef, {
      gameId: link,
      player1: {name: sessionStorage.getItem('username'), rating: sessionStorage.getItem('rating'), color: 'white'},
      player2: null,
      turn: null,
      boardPosition: null,
      moveHistory: null
    })
    navigate(`/game/${link}`)
  }

  const generateLink = () => {
    var link = ""
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for(let i = 0 ; i < 15 ; i++) {
      link += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return link
  }

  return (
    <div className='flex flex-col items-center justify-between'>
        <h1 className='text-7xl mb-10 text-red-800 font-bold font-sans'>Chess Duel</h1>
        <div className='flex relative items-center justify-between border-2 rounded w-full px-3 py-1 mb-3'>
            <div className='link w-full text-xl italic font-bold text-red-900'>{link}</div>
            <img onClick={copyLink} className='w-[40px] h-[40px] cursor-pointer bg-slate-400 rounded' src={copyIcon}/>
            {isCopied && <div className='fixed top-[80%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-slate-300 rounded px-2 py-2 font-bold text-xl opacity-70'>Copied</div>}
        </div>
        <button onClick={startGame} className='start bg-red-800 text-white'>Start Game</button>
    </div>
  )
}

export default GenerateLink