// import React from 'react'

export default function Die(props) {
  return (
    <button 
      type="button" 
      className={`die-face ${props.isFrozen && ' frozen'}`} 
      onClick={props.onClick}
    >
      <p className="die-num">{props.value}</p>
    </button>
  )
}