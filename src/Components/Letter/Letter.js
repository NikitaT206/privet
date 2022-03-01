import './Letter.css'
import { useState, useEffect, useMemo, useCallback, useContext} from 'react'
import CountContext from '../../Context/CountContext'
import ScoreContext from '../../Context/ScoreContext'
import useSound from 'use-sound'
import sound1 from '../../Sounds/1.mp3'

export function Letter(props) {
  const [rotate, setRotate] = useState(false)
  const [color, setColor] = useState('')
  const count = useContext(CountContext)
  const score = useContext(ScoreContext)
  const time = 4000 - Number(score + '00')
  const [width, setWidth] = useState(window.innerWidth)
  const mobile = width <= 700

  const [play1] = useSound(
    sound1,
    { volume: 0.25 }
  );

  const handleRotate = useCallback(() => {
    if (!rotate) {
      setRotate(true)
      play1()
      props.onIncrement()
    }
    if (rotate) {
      setRotate(false)
      props.onDecrement()
    }
  }, [rotate, props])  

  function getRandomColor() {
    const colors = ['yellow', 'greenyellow', 'cyan', 'blueviolet', 'white', 'tomato', 'teal', 'deeppink', 'aqua', 'coral']
    return `${colors[Math.floor(Math.random() * colors.length)]}`
  }

  useEffect(() => {
    const resizeListener = () => {
      setTimeout(() => {
        setWidth(window.innerWidth)
      }, 1000)
    };
    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    }
  }, [])

 

  useEffect(() => {
    if (!props.loader) {
      if (rotate) {
        setTimeout(() => {
          setRotate(false)
        }, time)
      }
      if (count === 5) {
        setTimeout(() => {
          setRotate(false)
        }, 400)
      }
    }
  }, [rotate, count, time, props.loader])

  useEffect(() => {
    if (!props.loader) {
      setInterval(() => {
        setColor(getRandomColor())
      }, 4000)
    }
  }, [props.loader])

  useEffect(() => {
    setRotate(true)
    if (!props.loader) {
      setRotate(false)
    }
  }, [props.loader])

  function getRandomPosition(number) {
    return Math.floor(Math.random() * -number + Math.random() * number)
  }

  return (
    <div
      className={rotate ? `letter letter-${props.index}`  : `letter letter_transform letter-${props.index}`} 
      onClick={handleRotate} 
      style={
        rotate ? {boxShadow: `inset white 0 0 10px 10px`} : {boxShadow: ''} 
        && props.level1 ? {top: 0} 
        : props.level2 ? mobile ? {right: getRandomPosition(10)} : {top: getRandomPosition(10)}
        : props.level3 ? mobile ? {right: getRandomPosition(30)} : {top: getRandomPosition(30)}
        : props.level4 ? mobile ? {right: getRandomPosition(60)} : {top: getRandomPosition(60)}
        : props.level5 ? mobile ? {right: getRandomPosition(100)} : {top: getRandomPosition(100)} : {top: 0}
        }>
      <div className='letter__background'></div>
      <p 
        className='letter__text'
        style={rotate ? {textShadow: `${color} 0 0 10px`, color: 'white'} : {textShadow: `${color} 0 0 10px`, color: color}}
        >{props.letter}</p>
    </div>
  )
}