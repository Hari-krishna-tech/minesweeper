const grid = document.querySelector('.grid')
let width = 10
const squares = []
const noOfBombs = 30
let gameOver = false
function createBoard() {
  const bombArray = Array(noOfBombs).fill("bomb")
  const validArray = Array(width*width - noOfBombs).fill("valid")
  const gameArray = validArray.concat(bombArray)
  const shuffledArray = gameArray.sort(() => Math.random() - 0.5)
  
  for (let i = 0; i < width*width; i++) {
    const square = document.createElement('div')
    square.classList.add(shuffledArray[i])
    square.setAttribute('id', i)
    square.addEventListener('click', () => {
      click(square)
    })
    grid.appendChild(square)
    squares.push(square)
  }
  for (let i = 0; i < width*width; i++) {
    if (squares[i].classList.contains('valid')) {
      const isLeftEdge = i%width === 0
      const isRightEdge = i%width === 9
      let total = 0
      if (i > 0 && !isLeftEdge && squares[i-1].classList.contains('bomb')) total++
      if (i < 99 && !isRightEdge && squares[i+1].classList.contains('bomb')) total++
      if (i > 9 && squares[i-width].classList.contains('bomb')) total++
      if (i > 9 && !isRightEdge && squares[i - width + 1].classList.contains('bomb')) total++
      if (i > 9 && !isLeftEdge && squares[i - width- 1].classList.contains('bomb')) total++
      if (i < 90 && squares[i+width].classList.contains('bomb')) total++
      if (i < 90 && !isLeftEdge && squares[i+width-1].classList.contains('bomb')) total++
      if (i < 90 && !isRightEdge && squares[i+width+1].classList.contains('bomb')) total++
      squares[i].setAttribute('total', total)
      squares[i].innerHTML = total?total:null
    }
  }
}
createBoard()
function click(square) {
  if (gameOver) return
  if (square.classList.contains('bomb')) {
    gameOver = true
    console.log('Game Over')
  }
  else {
    uniqueId = square.getAttribute('id')
    addChecked(square, uniqueId)
  }
}
function addChecked(square, uniqueId) {
  console.log(uniqueId)
  if (square.classList.contains('bomb') ||square.classList.contains('checked')) {
    return
  }
  square.classList.add('checked')
  const isLeftEdge = uniqueId%width === 0
  const isRightEdge = uniqueId%width === 9
  const isTop = uniqueId <= 9?true:false
  const isBotton = uniqueId >= 90?true:false
  
  if (!isLeftEdge) addChecked(squares[uniqueId-1],uniqueId-1)
  if (!isRightEdge) addChecked(squares[uniqueId+1], uniqueId + 1)
  if (!isTop) addChecked(squares[uniqueId-width],uniqueId-width)
  
  if (!isBotton) addChecked(squares[uniqueId+width],uniqueId+width)
}