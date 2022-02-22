import { useEffect, useState } from 'react'
import './Win.css'

export function Win(props) {
  
  return (
    <div className={props.isWin ? 'win win_active' : 'win'}>
      <h1 className='win__text'>{props.text}</h1>
    </div>
  )
}