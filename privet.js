const colors = ['red', 'orange', 'yellow', 'greenyellow', 'cyan', 'blue', 'blueviolet']
const container = document.querySelector('.privet-container')
const letters = document.querySelectorAll('.privet')
const win = document.querySelector('.win')

for (let i = 0; i < letters.length; i++) {
  letters[i].addEventListener('click', function() {
    letters[i].classList.toggle('privet_transform')
    letters[i].classList.toggle('privet_transorm_rotate')
    
    if (letters[i].classList.contains('privet_transform')) {
      setTimeout(() => {
        letters[i].classList.remove('privet_transform')
        letters[i].classList.add('privet_transorm_rotate')
      }, 2300)
    }

    if (letters[0].classList.contains('privet_transform') 
        && letters[1].classList.contains('privet_transform')
        && letters[2].classList.contains('privet_transform')
        && letters[3].classList.contains('privet_transform')
        && letters[4].classList.contains('privet_transform')) {
         
          setTimeout(() => {
            
            container.style.boxShadow = 'greenyellow 0px 0px 100px 50px'
            container.style.filter = 'blur(10px)'
            setTimeout(() => {
              win.classList.add('win_active')
            }, 1000)
          }, 500)
         
          setTimeout(() => {
            container.style.boxShadow = ''
            container.style.filter = ''
            win.classList.remove('win_active')
          }, 5000)
        }
  })
}

setTimeout(() => {
  container.style.color = 'white'
  container.style.boxShadow = 'white 0px 7px 100px 0px'
}, 1000)

setTimeout(() => {
  container.style.color = 'black'
  container.style.boxShadow = 'black 0px 7px 100px 0px'
}, 4000)

setTimeout(() => {
  for (let i = 1; i <= 5; i++) {
    const privet = document.querySelector(`.privet-${i}`)
    const color = colors[Math.floor(Math.random() * colors.length)]
    privet.classList.add('privet_transorm_rotate')
    privet.style.transition = '1s linear'
    privet.style.color = color
    privet.style.textShadow = `${color} 0 0 20px`
    privet.style.boxShadow = `${color} 0 0 10px 5px`
  }
}, 5000)

setTimeout(() => {
  setInterval(() => {
    for (let i = 1; i <= 5; i++) {
      const privet = document.querySelector(`.privet-${i}`)
      const color = colors[Math.floor(Math.random() * colors.length)]
      privet.style.transition = '.3s linear'
      privet.style.color = color
      privet.style.textShadow = `${color} 0 0 20px`
      privet.style.boxShadow = `${color} 0 0 ${Math.floor(Math.random() * 30 + 100)}px 10px`
    }
  }, 500)
}, 5500)




