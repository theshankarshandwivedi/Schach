import React from 'react'

const PlayerInfoHeader = ({playerName, playerRating, playerImg, timer}) => {
  return (
    <div className='w-[400px] p-1 flex justify-between items-center ml-[50px]'>
        <div className='player-image'>
            {/* <img className='w-full h-full' src={playerImg} alt="" /> */}
            <i class="fa-solid fa-user fa-xl"></i>
        </div>
        <div className='player-info w-full ml-2'>
            <h1 className='player-name font-extrabold font-sans text-black'>{playerName}</h1>
            <h1 className='player-score font-bold text-[#8b0000]'>{playerRating}</h1>
        </div>
        <div className='timer py-2 px-4 bg-slate-300 rounded font-bold font-sans text-xl text-black'>{timer}</div>
    </div>
  )
}

export default PlayerInfoHeader