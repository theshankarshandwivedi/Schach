import React from 'react'
import './tile.css'


const Tile = (props) => {

  
  return (
    <div className={`tile ${props.color}-tile ${props.isSelected ? "selected" : ""}`}>
      {props.image && <img src={props.image} alt="chess piece" />}
    </div>
  )
}

export default Tile