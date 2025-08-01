import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase/FirebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { getDatabase, ref, set } from 'firebase/database'

const Register = () => {
  let navigate = useNavigate()
  
      const [showPassword, setShowPassword] = useState(false)
      const [email, setEmail] = useState('')
      const [username, setUsername] = useState('')
      const [rating, setRating] = useState('')
      const [password, setPassword] = useState('')
      const [error, setError] = useState('')
  
      const submitHandler = async (e) => {
          e.preventDefault()
          try{
              await createUserWithEmailAndPassword(auth, email, password)
              await saveUserData()
              navigate('/login')
          }
          catch(error){
              setError(error.message)
          }
      }

      const saveUserData = async () => {
        const db = getDatabase();
        const userRef = ref(db, 'users/' + auth.currentUser.uid);
         return await set(userRef, {
          username: username,
          rating: rating,
        });
      }
  
      const togglePasswordVisibility = () => {
          setShowPassword(!showPassword)
  
      }
    return (
      <div className='flex h-screen w-screen bg-white justify-center items-start'>
          <div className='bg-white border-2 border-red-800 p-10 rounded-2xl font-serif '>
              <h1 className='text-3xl mb-10 text-red-800 font-bold'>Register</h1>
              {error && <p className="text-red-500">{error}</p>}
              <form onSubmit={(e) => submitHandler(e)} className='flex flex-col gap-5 text-xl'>
                  {/*Email*/}
                  <label className='text-red-800 font-semibold'>Email</label>
                  <input 
                      onChange={(e) => setEmail(e.target.value)}
                      required className="w-96 h-10 text-slate-900 bg-white border-2 border-red-800 rounded-full px-3 mb-3 placeholder:text-red-800 placeholder:opacity-40"
                      type="email" placeholder='Enter email' />

                  <label className='text-red-800 font-semibold'>Username</label>
                  <input 
                      onChange={(e) => setUsername(e.target.value)}
                      required className="w-96 h-10 text-slate-900 bg-white border-2 border-red-800 rounded-full px-3 mb-3 placeholder:text-red-800 placeholder:opacity-40"
                      type="text" placeholder='Enter username' />

                  <label className='text-red-800 font-semibold'>Initial Rating</label>
                  <input 
                      onChange={(e) => setRating(e.target.value)}
                      required className="w-96 h-10 text-slate-900 bg-white border-2 border-red-800 rounded-full px-3 mb-3 placeholder:text-red-800 placeholder:opacity-40"
                      type="number" placeholder='Enter rating' />

                  <div className='flex justify-between p-1'>
                      <label className='text-red-800 font-semibold w-full'>Password</label>
                      <button type='button' className='text-red-800 font-bold'
                          onClick={togglePasswordVisibility} ><i className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"} style={{color: "#991b1b"}}></i> Show</button>
                  </div>
                  <input 
                      onChange={(e) => setPassword(e.target.value)}
                      required className="w-96 h-10 text-slate-500 bg-white border-2 border-red-800 rounded-full px-3 mb-3 placeholder:text-red-800 placeholder:opacity-40" 
                      type={showPassword ? "text" : "password"} placeholder='Enter password' />
                      
                  <button
                      type='submit' 
                      className='w-96 h-11 rounded-full bg-red-800 text-white'>Register</button>
              </form>

              <Link to='/login' className='text-red-800 text-base font-bold'>Already have an account ?</Link>
              
          </div>
          
      </div>
    )
}

export default Register