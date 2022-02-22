import { createContext, useContext, useEffect, useState } from 'react';
import { Letter } from '../Letter/Letter';
import './App.css';
import CountContext from '../../Context/CountContext';
import ScoreContext from '../../Context/ScoreContext';
import { Win } from '../Win/Win';
import stars from '../../Images/stars.png'

function App() {
  const [letters, setLetters] = useState(['h', 'e', 'l', 'l', 'o'])
  const [count, setCount] = useState(0)
  const [win, setWin] = useState(false)
  const [score, setScore] = useState(0)
  const time = 3000 - Number(score + '00')
  const [loader, setLoader] = useState(false)

  function handleIncrement() {
    setCount(prev => prev + 1)
  }

  function handleDecrement() {
    setCount(prev => prev - 1)
  }

  function handleIncrementScore() {
    setScore(prev => prev + 1)
  }

  function handleResetScore() {
    setScore(0)
    localStorage.removeItem('score')
  }

  useEffect(() => {
    if (count === 5) {
      setWin(true)
      setCount(5)
      setTimeout(() => {
        setCount(0)
      }, 400)
      setTimeout(() => {
        setWin(false)
      }, 3000)
    }
    if (count < 5 && count > 0) {
      setTimeout(() => {
        handleDecrement()
      }, time) 
    }
    if (count < 0) setCount(0)
  }, [count, time])

  useEffect(() => {
    if (win) {
      handleIncrementScore()
    }
  }, [win])

  useEffect(() => {
    if (score > 0) {
      localStorage.setItem('score', JSON.stringify(score))
    }
  }, [score])

  useEffect(() => {
    if (localStorage.getItem('score')) {
      setScore(JSON.parse(localStorage.getItem('score')))
    }
  }, [])

  useEffect(() => {
    setLoader(true)
    setTimeout(() => {
      setLoader(false)
    }, 5000)
  }, [])



  return (
    <CountContext.Provider value={count}>
    <ScoreContext.Provider value={score}>

    <div className={loader ? 'App App_loader' : 'App'}>
      {loader ? <div className='overlay'></div> : ''}
      <img src={stars} className={loader ? 'background' : 'background background_active'} alt='stars'/>
      <div className={win ? 'letters letters_blur' : 'letters'}>
        <div className={win ? 'letters-grid-container_win letters-grid-container' : 'letters-grid-container'} >
         {letters.map((item, index) => {
           return (
            <Letter 
              letter={item} 
              key={index} 
              onIncrement={handleIncrement} 
              onDecrement={handleDecrement}
              loader={loader}
            />)})}
        </div>
        
      </div>
      {/* <div className='count'>{count}</div> */}
        {!loader ? <div className={score > 0 ? 'score score_active' : 'score'}>{score}</div> : ''}
        {! loader ? <button 
          className={score > 0 ? 'resetButton resetButton_active' : 'resetButton'} 
          onClick={handleResetScore}
        >Reset</button> : ''}
     
        <Win isWin={win} text={`you win!   try again?`}/>
    </div>

    </ScoreContext.Provider>
    </CountContext.Provider>
  );
}

export default App;
