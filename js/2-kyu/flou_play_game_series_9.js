// Flou--Play game Series #9
// https://www.codewars.com/kata/5a93754d0025e98fde000048

// Coordinates format [Y,X]
const playFlou = gameMap => {
  const INICIAL_CELL_CHAR = 'B'
  const EMPTY_CELL_CHAR = '.'
  let move = 0

  // Convert a gamemap into a 2d array board
  let makeBoard = gameMap => gameMap.split("\n").map( row => row.split("") )

  // Get all initial cells (character B)
  const getInitialCells = board => {
    const res = []
    board.forEach( (row, y) => {
      row.forEach( (cell, x) => {
        if (cell === INICIAL_CELL_CHAR) res.push([y,x])
      })
    })
    return res
  }

  // Given a board and coordinates returns an array of all posible moves
  const getValidPosibleDirections = (cell, board) => {
    const res = []
    const y = cell[0]
    const x = cell[1]
    if (board[y][x + 1] === EMPTY_CELL_CHAR) res.push('Right')
    if (board[y][x - 1] === EMPTY_CELL_CHAR) res.push('Left')
    if (board[y + 1][x] === EMPTY_CELL_CHAR) res.push('Down')
    if (board[y - 1][x] === EMPTY_CELL_CHAR) res.push('Up')
    return res
  }

  const moveBlock = (cell, i, direction, board) => {
    let y = cell[0]
    let x = cell[1]
    let iterate = true
    while (iterate) {
      if (direction === "Right") x++;
      if (direction === "Left")  x--;
      if (direction === "Down")  y++;
      if (direction === "Up")    y--;
      board[y][x] = i
      switch (direction) {
        case "Right": 
          if (board[y][x + 1] !== EMPTY_CELL_CHAR) {
            if (board[y + 1][x] === EMPTY_CELL_CHAR) direction = "Down"
            else iterate = false
          }
          break;
        case "Left": 
          if (board[y][x - 1] !== EMPTY_CELL_CHAR) {
            if (board[y - 1][x] === EMPTY_CELL_CHAR) direction = "Up"
            else iterate = false
          }
          break;
        case "Down": 
          if (board[y + 1][x] !== EMPTY_CELL_CHAR) {
            if (board[y][x - 1] === EMPTY_CELL_CHAR) direction = "Left"
            else iterate = false
          }
          break;
        case "Up": 
          if (board[y - 1][x] !== EMPTY_CELL_CHAR) {
            if (board[y][x + 1] === EMPTY_CELL_CHAR) direction = "Right"
            else iterate = false
          }
          break;
      }
    }
  }

  const undoMoveBlock = (actualmove, board) => {
    board.forEach( (row, y) => {
      row.forEach( (cell, x) => {
        if (cell === actualmove) board[y][x] = EMPTY_CELL_CHAR
      })
    })
  }

  const boardIsFilled = (board) => {
    for (y=0;y<board.length; y++) {
      const row = board[y]
      for (x=0;x<row.length; x++) {
        if (board[y][x] === EMPTY_CELL_CHAR) return false
      }
    }
    return true
  }

  const traverse = (cells, board) => {
    const solution = []
    for (let i = 0; i<cells.length; i++) {
      const cell = cells[i]
      const posibleDirections = getValidPosibleDirections(cell, board)
      if (posibleDirections.length === 0) return [] // No moves left
      for (let direction of posibleDirections) {
        solution.push([...cell, direction])
        let actualmove = move++
        moveBlock(cell, actualmove, direction, board)
        const otherCells = [...cells.slice(0,i), ...cells.slice(i+1,cells.length)]
        if (otherCells.length === 0) {
          if (boardIsFilled(board)) return solution
        } else {
          let moreMoves = traverse(otherCells, board)
          if (moreMoves.length > 0) return [...solution, ...moreMoves]  // Solution  found
        }
        undoMoveBlock(actualmove, board)
        solution.pop()
      }
    }
    return solution
  }

  let board = makeBoard(gameMap)
  let initialCells = getInitialCells(board)
  let solution = traverse(initialCells, board).map( pos => {
    return [pos[0] - 1, pos[1] - 1, pos[2]] // Move coordinates to origin
  })
  return solution.length > 0 ? solution : false
}

// var gameMap=
// `+----+
// |.B..|
// |....|
// |....|
// |..B.|
// +----+`
// var yoursolution=playFlou(gameMap)
// console.log( yoursolution )  