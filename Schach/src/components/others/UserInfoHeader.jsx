import React from 'react'

const UserInfoHeader = (props) => {
  return (
    <>
    <div className='flex h-16 items-center px-1.5 py-2'>
        <div className='flex justify-center items-center h-12 w-12 bg-slate-300 rounded-full border-2 overflow-hidden mr-5 ml-2.5'>
            <i class="fa-solid fa-user fa-2xl"></i>
        </div>
        <div>
            <h1 className='font-bold font-sans text-black italic'>{props.username}</h1>
            <h2 className='font-bold text-[#8b0000] italic'>{props.rating}</h2>
        </div>
    </div>


    </>
  )
}

export default UserInfoHeader