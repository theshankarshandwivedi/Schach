import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db, ref} from '../firebase/FirebaseConfig'
import { get } from 'firebase/database'
import { signInWithEmailAndPassword } from 'firebase/auth'

const Login = () => {

    let navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const submitHandler = async (e) => {
        e.preventDefault()
        try{
            await signInWithEmailAndPassword(auth, email, password)
            await saveUserDataLocally()
            navigate('/home/new')
        }
        catch(error){
            setError(error.message)
        }
        

    }

    const saveUserDataLocally = async () => {
        const userRef = ref(db, 'users/' + auth.currentUser.uid);
        const snapshot = await get(userRef);
        const userData = snapshot.val();
        const username = userData.username;
        const rating = userData.rating;
        sessionStorage.setItem('username', username)
        sessionStorage.setItem('rating', rating)
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)

    }


  return (
    <div className='flex h-screen w-screen bg-white justify-center items-center'>
        <div className='bg-white border-2 border-red-800 p-10 rounded-2xl font-serif '>
            <h1 className='text-3xl mb-10 text-red-800 font-bold'>Login</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={(e) => submitHandler(e)} className='flex flex-col gap-5 text-xl'>
                <label className='text-red-800 font-semibold'>Email</label>
                <input 
                    onChange={(e) => setEmail(e.target.value)}
                    required className="w-96 h-10 text-slate-900 bg-white border-2 border-red-800 rounded-full px-3 mb-3 placeholder:text-red-800 placeholder:opacity-40"
                    type="email" placeholder='Enter email' />
                <div className='flex justify-between p-1'>
                    <label className='text-red-800 font-semibold'>Password</label>
                    <button type='button' className='text-red-800 text-base font-bold'
                        onClick={togglePasswordVisibility} ><i className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"} style={{color: "#991b1b"}}></i> Show</button>
                </div>
                <input 
                    onChange={(e) => setPassword(e.target.value)}
                    required className="w-96 h-10 text-slate-500 bg-white border-2 border-red-800 rounded-full px-3 mb-3 placeholder:text-red-800 placeholder:opacity-40" 
                    type={showPassword ? "text" : "password"} placeholder='Enter password' />
                    
                <button
                    type='submit' 
                    className='w-96 h-11 rounded-full bg-red-800 text-white'>Login</button>
            </form>

            <Link to="/register" className='text-red-800 text-base font-bold'>Don't have an account? Register</Link>
            
        </div>
        
    </div>
  )
}

export default Login