import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Letter } from '../Letter/Letter';
import './App.css';
import CountContext from '../../Context/CountContext';
import ScoreContext from '../../Context/ScoreContext';
import { Win } from '../Win/Win';
import stars from '../../Images/stars.png'
import useSound from 'use-sound';

import music from '../../Sounds/music2.mp3'

import sound1 from '../../Sounds/1.mp3'
import sound2 from '../../Sounds/2.mp3'
import sound3 from '../../Sounds/3.mp3'
import sound4 from '../../Sounds/4.mp3'
import sound5 from '../../Sounds/5.mp3'
import soundWin from '../../Sounds/win.mp3'



function App() {
  const [letters, setLetters] = useState(['h', 'e', 'l', 'l', 'o'])
  const [count, setCount] = useState(0)
  const [win, setWin] = useState(false)
  const [score, setScore] = useState(0)
  const time = 3000 - Number(score + '00')
  const [loader, setLoader] = useState(false)
  const [play, setPlay] = useState(false)
  

  const [playActive] = useSound(
    music,
    { volume: 0.25 }
  );
  const [playOn] = useSound(
    music,
    { volume: 0.25 }
  );
  const [playOff] = useSound(
    music,
    { volume: 0.25 }
  );

  const [play1] = useSound(
    sound1,
    { volume: 0.10 }
  );
  const [play2] = useSound(
    sound2,
    { volume: 0.10}
  );
  const [play3] = useSound(
    sound3,
    { volume: 0.10 }
  );
  const [play4] = useSound(
    sound4,
    { volume: 0.10 }
  );
  const [play5] = useSound(
    sound5,
    { volume: 0.10 }
  );
  const [playWin] = useSound(
    soundWin,
    { volume: 0.25 }
  );

  const returnSound = useCallback(() => {
    switch(count) {
      case 1: 
        play1()
        break
      case 2: 
        play2()
        break
      case 3: 
        play3()
        break
      case 4: 
        play4()
        break
      case 5: 
        // play5()
        playWin()
        break
      default: return
    }
  }, [count])   

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

  function startPlay() {
    setPlay(false)
    setTimeout(() => {
      playOn()

    }, 300)

    setTimeout(() => {
      setLoader(false)
    }, 2000)
  }

  useEffect(() => {
    if (count === 5) {
      setWin(true)
      setCount(5)
      playWin()
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
      setCount(0)
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
      setPlay(true)
    }, 2000)
  }, [])

  return (
    <CountContext.Provider value={count}>
    <ScoreContext.Provider value={score}>

    <div className={loader ? 'App App_loader' : 'App'}>
      {/* {loader ? <div className='overlay'></div> : ''} */}
      <img src={stars} className={loader ? 'background' : 'background background_active'} alt='stars'/>
      <div className={win || play ? 'letters letters_blur' : 'letters'}>
        <div className={win || play ? 'letters-grid-container_win letters-grid-container' : 'letters-grid-container'} >
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
        <Win isWin={play} text={`Tap to play`} onTap={startPlay}/>
       
    </div>

    </ScoreContext.Provider>
    </CountContext.Provider>
  );
}

export default App;
