import React from 'react'
import { useNavigate } from 'react-router-dom'

function Top() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/home')
  }

  return (
    <div>
      <h1>Weather To Go</h1>
      <p>天気を見て、行動を提案する</p>
      <button onClick={handleClick}>天気を見る</button>
    </div>
  )
}

export default Top