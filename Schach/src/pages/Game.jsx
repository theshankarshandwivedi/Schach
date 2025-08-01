import React, { useEffect, useState } from 'react'
import Board from '../components/Chessboard/Board'
import PlayerInfoHeader from '../components/others/PlayerInfoHeader'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { off, onValue, ref } from 'firebase/database'
import { db } from '../firebase/FirebaseConfig'

const Game = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const [player1, setPlayer1] = useState({name: "Anonymous", rating: 0, color: 'white'})
  const [player2, setPlayer2] = useState({name: "Anonymous", rating: 0, color: 'black'})

  // to handle back button
  useEffect(() => {
    const handleBackPressed = (event) => {
      event.preventDefault(); // Prevents default back navigation
      if (window.confirm("Your progress will be lost. Are you sure you want to exit?")) {
        navigate('/home/new'); // Navigate to new game
      } else {
        window.history.pushState(null, null, location.pathname); // Prevent back
      }
    };
    window.addEventListener("popstate", handleBackPressed);
    return () => {
      window.removeEventListener("popstate", handleBackPressed);
    };
  }, [navigate, location]);

  //load players' data 
  const gameRef = ref(db, 'games/' + params.gameId);
  useEffect(() => {
    onValue(gameRef, (snapshot) => {
      const data = snapshot.val();
      if(data){
        setPlayer1(data.player1);
        setPlayer2(data.player2);
      }
      console.log(data)
    })  
  },[params.gameId])


  const color = (sessionStorage.getItem('username') === player1.name) ? 'white' : 'black'
  

  return (
    <>
    <div className='flex justify-center items-center w-screen h-screen'>
        <div>
            <PlayerInfoHeader 
                playerName={ color === 'white' ? player2.name : player1.name}
                playerRating={ color === 'white' ? player2.rating : player1.rating}
                playerImg={ color === 'white' ? player2.img : player1.img}
                timer={"0:00"}/>
            <Board color={color} gameId={params.gameId}/>
            <PlayerInfoHeader 
                playerName={ color === 'white' ? player1.name : player2.name}
                playerRating={ color === 'white' ? player1.rating : player2.rating}
                playerImg={ color === 'white' ? player1.img : player2.img}
                timer={"0:00"}/>
        </div>
    </div>

    </>
  )
}

export default Game