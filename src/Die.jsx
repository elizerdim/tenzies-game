// import React from 'react'

export default function Die(props) {
  return (
    <button type="button" className="die-face">
      <p className="die-num">{props.value}</p>
    </button>
  )
}