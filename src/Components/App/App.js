import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Letter } from '../Letter/Letter';
import './App.css';
import CountContext from '../../Context/CountContext';
import ScoreContext from '../../Context/ScoreContext';
import { Win } from '../Win/Win';
import stars from '../../Images/stars.png'
import useSound from 'use-sound';

import music from '../../Sounds/music2.mp3'

import soundWin from '../../Sounds/win.mp3'

function App() {
  const [letters, setLetters] = useState(['h', 'e', 'l', 'l', 'o'])
  const [count, setCount] = useState(0)
  const [win, setWin] = useState(false)
  const [score, setScore] = useState(0)
  const time = 4000 - Number(score + '00')
  const [loader, setLoader] = useState(false)
  const [play, setPlay] = useState(false)
  
  const [level1, setLevel1] = useState(false)
  const [level2, setLevel2] = useState(false)
  const [level3, setLevel3] = useState(false)
  const [level4, setLevel4] = useState(false)
  const [level5, setLevel5] = useState(false)
  const [level6, setLevel6] = useState(false)
  const [level7, setLevel7] = useState(false)
  const [level8, setLevel8] = useState(false)
  const [level9, setLevel9] = useState(false)

  
  const [playOn] = useSound(
    music,
    { volume: 0.25 }
  );
  
  const [playWin] = useSound(
    soundWin,
    { volume: 0.25 }
  );

  const setLevel = useCallback(() => {
    if (score < 3) {
      setLevel1(true)
    }
    if (score >= 3 && score <= 4) {
      setLevel1(false)
      setLevel2(true)
    }
    if (score >= 5 && score <= 6) {
      setLevel1(false)
      setLevel2(false)
      setLevel3(true)
    }
    if (score >= 7 && score <= 8) {
      setLevel1(false)
      setLevel3(false)
      setLevel4(true)
    }
    if (score >= 9 && score <= 10) {
      setLevel1(false)
      setLevel4(false)
      setLevel5(true)
    }
    if (score >= 11 && score <= 12) {
      setLevel1(false)
      setLevel5(false)
      setLevel6(true)
    }
    if (score >= 13 && score <= 14) {
      setLevel1(false)
      setLevel6(false)
      setLevel7(true)
    }
    if (score >= 15 && score <= 16) {
      setLevel1(false)
      setLevel7(false)
      setLevel8(true)
    }
    if (score >= 17 ) {
      setLevel1(false)
      setLevel8(false)
      setLevel9(true)
    }
  }, [score])

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
      // playOn()
    }, 300)

    setTimeout(() => {
      setLoader(false)
    }, 2000)
  }

  useEffect(() => {
    setLevel()    
  }, [score, setLevel])

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
        <div className='letters-grid-container'>
         {letters.map((item, index) => {
           return (
            <Letter
              win={win}
              index={index + 1}
              letter={item} 
              key={index} 
              onIncrement={handleIncrement} 
              onDecrement={handleDecrement}
              loader={loader}
              level1={level1}
              level2={level2}
              level3={level3}
              level4={level4}
              level5={level5}
              level6={level6}
              level7={level7}
              level8={level8}
              level9={level9}
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
