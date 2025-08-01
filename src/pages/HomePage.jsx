import React, { useEffect } from 'react'
import './HomePage.css'
import { Outlet, useNavigate } from 'react-router-dom'
import UserInfoHeader from '../components/others/UserInfoHeader'

const HomePage = () => {
  const navigate = useNavigate()
  const username = sessionStorage.getItem('username')
  const rating = sessionStorage.getItem('rating')
  useEffect(() => {
    if(!username || !rating) navigate('/login')
  },[])
  
  return (
    <>
    <div className='home-background flex justify-center items-center w-screen h-screen relative'>
      <div className='fixed top-0 left-0 '>
        {username && rating && <UserInfoHeader username={username} rating={rating}/>}
      </div>
      <Outlet/>
    </div>

    </>
  )
}

export default HomePage