import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { Chess } from "chess.js";
import './board.css'
import Tile from './Tile';
import { asciiToPieces } from '../../game logic/AsciiToBoard.js';
import bdt from '../../assets/pieces/bdt.svg'
import kdt from '../../assets/pieces/kdt.svg'
import klt from '../../assets/pieces/klt.svg'
import ndt from '../../assets/pieces/ndt.svg'
import nlt from '../../assets/pieces/nlt.svg'
import qlt from '../../assets/pieces/qlt.svg'
import qdt from '../../assets/pieces/qdt.svg'
import blt from '../../assets/pieces/blt.svg'
import rlt from '../../assets/pieces/rlt.svg'
import rdt from '../../assets/pieces/rdt.svg'
import plt from '../../assets/pieces/plt.svg'
import pdt from '../../assets/pieces/pdt.svg'
import { get, onValue, ref, update } from 'firebase/database';
import { db } from '../../firebase/FirebaseConfig.js';


const Board = ({color, gameId}) => {
  let board = []
  const horizontalIndex = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  const verticalIndex = [1, 2, 3, 4, 5, 6, 7, 8]

  const gameRef = ref(db, 'games/' + gameId)
  const game = useRef(new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"));
  
  const [isWhiteTurn, setIsWhiteTurn] = useState(true);

  const [pieces, setPieces] = useState([
  { key: '0,0', pieceName: 'rook dark left', image: rdt, x: 0, y: 0},
  { key: '1,0', pieceName: 'knight dark left', image: ndt, x: 1, y: 0 },
  { key: '2,0', pieceName: 'bishop dark light-squared', image: bdt, x: 2, y: 0 },
  { key: '3,0', pieceName: 'queen dark', image: qdt, x: 3, y: 0 },
  { key: '4,0', pieceName: 'king dark', image: kdt, x: 4, y: 0 },
  { key: '5,0', pieceName: 'bishop dark dark-squared', image: bdt, x: 5, y: 0 },
  { key: '6,0', pieceName: 'knight dark right', image: ndt, x: 6, y: 0 },
  { key: '7,0', pieceName: 'rook dark right', image: rdt, x: 7, y: 0 },
  { key: '0,1', pieceName: 'pawn dark a7', image: pdt, x: 0, y: 1 },
  { key: '1,1', pieceName: 'pawn dark b7', image: pdt, x: 1, y: 1 },
  { key: '2,1', pieceName: 'pawn dark c7', image: pdt, x: 2, y: 1 },
  { key: '3,1', pieceName: 'pawn dark d7', image: pdt, x: 3, y: 1 },
  { key: '4,1', pieceName: 'pawn dark e7', image: pdt, x: 4, y: 1 },
  { key: '5,1', pieceName: 'pawn dark f7', image: pdt, x: 5, y: 1 },
  { key: '6,1', pieceName: 'pawn dark g7', image: pdt, x: 6, y: 1 },
  { key: '7,1', pieceName: 'pawn dark h7', image: pdt, x: 7, y: 1 },
  { key: '0,6', pieceName: 'pawn light a2', image: plt, x: 0, y: 6 },
  { key: '1,6', pieceName: 'pawn light b2', image: plt, x: 1, y: 6 },
  { key: '2,6', pieceName: 'pawn light c2', image: plt, x: 2, y: 6 },
  { key: '3,6', pieceName: 'pawn light d2', image: plt, x: 3, y: 6 },
  { key: '4,6', pieceName: 'pawn light e2', image: plt, x: 4, y: 6 },
  { key: '5,6', pieceName: 'pawn light f2', image: plt, x: 5, y: 6 },
  { key: '6,6', pieceName: 'pawn light g2', image: plt, x: 6, y: 6 },
  { key: '7,6', pieceName: 'pawn light h2', image: plt, x: 7, y: 6 },
  { key: '0,7', pieceName: 'rook light left', image: rlt, x: 0, y: 7 },
  { key: '1,7', pieceName: 'knight light left', image: nlt, x: 1, y: 7 },
  { key: '2,7', pieceName: 'bishop light light-squared', image: blt, x: 2, y: 7 },
  { key: '3,7', pieceName: 'queen light', image: qlt, x: 3, y: 7 },
  { key: '4,7', pieceName: 'king light', image: klt, x: 4, y: 7 },
  { key: '5,7', pieceName: 'bishop light dark-squared', image: blt, x: 5, y: 7 },
  { key: '6,7', pieceName: 'knight light right', image: nlt, x: 6, y: 7 },
  { key: '7,7', pieceName: 'rook light right', image: rlt, x: 7, y: 7 }
])
  let vertical = []
  let horizontal = []


  useEffect(() => {

    onValue(gameRef, (snapshot) => {
      if (snapshot.exists()) {
        
        const turn = snapshot.val().turn
        const boardPos = snapshot.val().boardPosition
        const movesArr = snapshot.val().moveHistory
        const move = movesArr ? movesArr[movesArr.length-1] : null;
        console.log(`turn: ${turn}, move: ${move}`)
        if(move && game.current.moves().includes(move)) {
          console.log(`correct move: ${move}`)

          if (move.match(/^[a-h][17]$/)) { // Pawn reaches last rank
            game.current.move(`${move}=Q`); // Promote to queen
          } else {
            game.current.move(move);
          }
          console.log(game.current.ascii())
          setPieces(asciiToPieces(boardPos))
          setIsWhiteTurn(turn === 'white')
        }
        else{
          console.log(`wrong move: ${move}`)
          console.log(game.current.ascii())
        }

      } else {
        console.log("No data available");    
      }
    })
  },[])




  // Render axes*********************************************************************************************************************************
  for(let i=7;i>=0;i--){
    vertical.push(<div className='vertical-index'>{verticalIndex[color === 'white' ? i : 7-i]}</div>)
  }
  for(let i=0;i<8;i++){
    horizontal.push(<div className='horizontal-index'>{horizontalIndex[i]}</div>)
  }

  //Start Game************************************************************************************************************************
  
  const moveIfValid = (fromX, fromY, toX, toY) => {
    console.log('flag 4')
    const file = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const rank = ['8', '7', '6', '5', '4', '3', '2', '1'];
    const fromPos = file[fromX] + rank[fromY]; // Convert (x, y) to chess notation
    const toPos = file[toX] + rank[toY];

    const validMoves = game.current.moves({square: fromPos})
    const move = validMoves.find(m => m.includes(toPos)|| m==='O-O'|| m==='O-O-O')
    console.log(game.current.moves({square: fromPos}))
    if(move){
      console.log('flag 5')
      game.current.move({from: fromPos, to: toPos, promotion: 'q'});
      console.log(move)
      return move
    }
    else console.log(move)
  }

  // Handle piece selection***********************************************************************************************************
  const [selectedPiece, setSelectedPiece] = useState(null);
  const onTileClick = (xCoord, yCoord) => {
    console.log('flag 1')
    if(selectedPiece){
      console.log('flag 2')
      if(xCoord === selectedPiece.x && yCoord === selectedPiece.y){
        setSelectedPiece(null);
      }
      else{
        console.log('flag 3')
        const move = moveIfValid(selectedPiece.x, selectedPiece.y, xCoord, yCoord)
        if(move){
          console.log(game.current.ascii())
          setPieces(asciiToPieces(game.current.ascii()));
          makeMove(move)
        }
        setSelectedPiece(null);
      }
    }
    else{
      const piece = pieces.find((piece) => piece.x === xCoord && piece.y === yCoord);
      if (piece) {
        setSelectedPiece(piece); // Store selected piece
      }

    }
  }

  const helperOnTileClick = (j, i) => {
    console.log(color)
    console.log(isWhiteTurn? 'white turn' : 'black turn')
    if(isWhiteTurn && color === 'white' || !isWhiteTurn && color === 'black') onTileClick(j, i)
  }



  // Render board******************************************************************************************************************************
  for(let i = color === 'white' ? 0 : 7; color === 'white' ? i < 8 : i >= 0; color === 'white' ? i++ : i--){
    for(let j = 0; j < 8; j++){
      let piece = pieces.find((piece) => piece.x === j && piece.y === i);
      let im = piece ? piece.image : null;
      let isSelected = selectedPiece && selectedPiece.x === j && selectedPiece.y === i;
      board.push(
        <div key={`${j}-${i}`} onClick={() => helperOnTileClick(j, i)}>
        <Tile 
          color={(i + j) % 2 === 0 ? 'white' : 'black'}
          image={im}
          isSelected={isSelected}
        />
        </div>
      )
    }
  }
  
  // Firebase handling on making move******************************************************************************************************************************
  const makeMove = async (move) => {
    const boardPos = game.current.ascii()
    await update(gameRef, { boardPosition : boardPos })
    const snapshot = await get(gameRef)
    if (snapshot.exists()) {
      let movesArr = snapshot.val().moveHistory
      if(movesArr) movesArr.push(move)
      else movesArr = [move]
      await update(gameRef, { moveHistory : movesArr , turn : color === 'white' ? 'black' : 'white' })
      setIsWhiteTurn((isTurn) => !isTurn)
    } else {
      console.log("No data available");
    }    
  }

  // Firebase handling on getting move******************************************************************************************************************************
  
  
  
  // const getMove = async () => {
  //   const snapshot = await get(gameRef)
  //   if (snapshot.exists()) {
  //     const turn = snapshot.val().turn
  //     const boardPos = snapshot.val().boardPosition
  //     setIsWhiteTurn(turn === 'white')
  //     setPieces(asciiToPieces(boardPos))
  //   } else {
  //     console.log("No data available");    
  //   }
  // }


  return (
    <>
    <div id='full-board'>
      <div className='vertical-axis'>{vertical}</div>
      <div id='chessboard'>{board}</div>
      <div></div>
      <div className='horizontal-axis'>{horizontal}</div>
    </div>
    </>
  )
}

export default Board