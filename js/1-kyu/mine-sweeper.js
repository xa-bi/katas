// Mine Sweeper
// https://www.codewars.com/kata/57ff9d3b8f7dda23130015fa

// Simulate Game class provided by codewars
let game = {
  read : (result) => {
    this.board = convertStringToBoard(result)
  },
  open : (y,x) => {
    let total = 0
    doCellsAround(y, x, this.board, (yy,xx, bb) => {
      if (bb[yy][xx] === "x") total++
    })
    return total
  },
  getBoard : () => {
    return this.board
  }
}

const convertStringToBoard = (s) => s.split("\n").map( row => row.split(" ") )
const doCellsAround = (y,x, board, action) => {
  if (y > 0) {
    if (x > 0)                     action(y - 1, x - 1, board)
                                   action(y - 1, x    , board)
    if (x < (board[y].length - 1)) action(y - 1, x + 1, board)
  }
  if (x > 0)                       action(y, x - 1, board)
  if (x < (board[y].length - 1))   action(y, x + 1, board)
  if (y < (board.length - 1)) {
    if (x > 0)                     action(y + 1, x - 1, board)
                                   action(y + 1, x    , board)
    if (x < (board[y].length - 1)) action(y + 1, x + 1, board)
  }
}

// --------------------------------------------------
// Actual solution
function solveMine(map, numBombs) {
  const NUMREGEXP = /^\d$/
  const convertStringToBoard = s => s.split("\n").map( row => row.split(" ") )

  const doCellsAround = (y,x, board, action) => {
    if (y > 0) {
      if (x > 0)                     action(y - 1, x - 1, board)
                                     action(y - 1, x    , board)
      if (x < (board[y].length - 1)) action(y - 1, x + 1, board)
    }
    if (x > 0)                       action(y, x - 1, board)
    if (x < (board[y].length - 1))   action(y, x + 1, board)
    if (y < (board.length - 1)) {
      if (x > 0)                     action(y + 1, x - 1, board)
                                     action(y + 1, x    , board)
      if (x < (board[y].length - 1)) action(y + 1, x + 1, board)
    }
  }

  const getUnsolvedCells = (b) => {
    let total = []
    b.forEach( (row, y) => {
      row.forEach( (cell, x) => {
        if (cell === '?') total.push( {y,x} )
      })
    })
    return total
  }

  const isValid = (board, unsolvedCells) => {
    let isValid = true
    unsolvedCells.forEach(cell => {
      doCellsAround(cell.y, cell.x, board, (y, x, board) => { // cells around unknown cell
        let cellValue = board[y][x]
        if (cellValue.match(NUMREGEXP)) {
          let total = 0;
          doCellsAround(y, x, board, (y, x, board) => {
            if (board[y][x] === "x") total++
          })
          if (total !== +cellValue) isValid = false
        }
      })
      if (isValid === false) return
    })
    return isValid
  }

  let numUnsolvedCells = map.replace(/[^\?]/g, "").length
  let board = convertStringToBoard(map)
  let boardChanged = true
  while (boardChanged) {
    boardChanged = false

    board.forEach( (row, y) => {
      row.forEach( (cell, x) => {
        if (cell.match(NUMREGEXP)) {
          let cellValue = +cell
          let unknownCount = 0
          doCellsAround(y, x, board, (y, x, board) => {
            if (board[y][x] === "x") cellValue--
            if (board[y][x] === "?") unknownCount++
          })
          if (cellValue === unknownCount) {
            doCellsAround(y, x, board, (y, x, board) => {
              if (board[y][x] === "?") {
                board[y][x] = "x"
                numBombs--
                numUnsolvedCells--
                boardChanged = true
              }
            })
          }
          if (cellValue === 0) {
            doCellsAround(y, x, board, (y, x, board) => {
              if (board[y][x] === "?") {
                board[y][x] = '' + game.open(y, x)
                boardChanged = true
                numUnsolvedCells--
              }
            })
          }
        }
      })
    })

    if (boardChanged === false) {
      const unsolvedCells = getUnsolvedCells(board)
      let totalUnsolved = unsolvedCells.length
      let posibleSolutions = []
      if (totalUnsolved > 0) { // Lets binary bruteforce
        let cache = board.map(s => s.join("")).join(",")
        for (let i=0, j=1<<totalUnsolved; i<j; i++) {
          if ((i).toString(2).replace(/0/g,"").length !== numBombs) continue
          const newBoard = cache.split(",").map( s => s.split("") )
          let bombsToFind = numBombs
          unsolvedCells.forEach((cell, pos) => {
            if ((i >> pos) & 1) {
              newBoard[ cell.y ][ cell.x ] = "x" 
              bombsToFind--
              if (bombsToFind === 0) return
            }
          });
          if (isValid(newBoard, unsolvedCells)) posibleSolutions.push( i )
        }
        if (posibleSolutions.length > 0) {
          unsolvedCells.forEach((cell, pos) => {
            let zeros = 0
            let ones  = 0
            posibleSolutions.forEach( posisbleSolution => {
              if ((posisbleSolution >> pos) & 1) ones++
              else zeros++
            })
            if (ones === posibleSolutions.length) {
              board[ cell.y ][ cell.x ] = "x" 
              numUnsolvedCells--
              numBombs--
              boardChanged = true
            }
            if (zeros === posibleSolutions.length) {
              board[ cell.y ][ cell.x ] = '' + game.open(cell.y, cell.x)
              numUnsolvedCells--
              boardChanged = true
            }
          })
        }
      }
    }
  }

  return numUnsolvedCells ? '?' : board.map(row => row.join(" ")).join("\n")
}

// var map=
// `? ? ? ? ? ?
// ? ? ? ? ? ?
// ? ? ? 0 ? ?
// ? ? ? ? ? ?
// ? ? ? ? ? ?
// 0 0 0 ? ? ?`

// let result=
// `1 x 1 1 x 1
// 2 2 2 1 2 2
// 2 x 2 0 1 x
// 2 x 2 1 2 2
// 1 1 1 1 x 1
// 0 0 0 1 1 1`

// var map=
// `? ? ? ? ? ?
// ? ? ? ? ? ?
// ? ? ? 0 ? ?
// ? ? ? ? ? ?
// ? ? ? ? ? ?
// 0 0 0 ? ? ?`,
// result=
// `1 x 1 1 x 1
// 2 2 2 1 2 2
// 2 x 2 0 1 x
// 2 x 2 1 2 2
// 1 1 1 1 x 1
// 0 0 0 1 1 1`

// let result = 
// `0 0 0 0 0 0 0 0 0 0 0 0 1 x 1 0 0 0 0 0 0 0 0 1 1 1 1 1 1 0
// 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 0 1 1 1 0 0 0 0 2 x 2 1 x 1 0
// 1 1 1 0 0 0 0 1 1 1 0 0 0 0 1 1 2 x 1 0 0 0 0 2 x 2 1 1 1 0
// 1 x 1 1 1 1 0 1 x 2 1 1 0 0 1 x 2 1 1 0 0 0 0 1 1 1 0 0 0 0
// 1 2 2 3 x 2 0 1 1 2 x 1 0 0 1 2 2 1 0 0 0 0 0 1 1 1 0 0 1 1
// 0 1 x 3 x 2 0 0 0 1 1 1 0 1 2 3 x 1 0 0 0 0 0 1 x 1 0 0 1 x
// 0 1 1 3 3 3 2 1 1 1 1 2 1 2 x x 2 2 1 1 0 0 0 1 1 1 1 1 2 1
// 0 0 0 1 x x 2 x 1 1 x 2 x 2 3 3 3 2 x 1 0 1 1 1 0 0 2 x 2 0
// 0 1 1 2 2 2 3 2 2 1 1 2 1 1 1 x 2 x 2 1 0 1 x 1 0 0 2 x 2 0
// 1 2 x 1 0 1 2 x 1 0 0 0 1 1 2 2 3 2 1 0 0 1 1 1 0 0 1 1 1 0
// 1 x 2 1 0 1 x 3 2 1 0 0 1 x 1 1 x 2 1 0 0 0 1 1 1 0 0 0 0 0
// 1 1 2 1 2 2 2 2 x 1 0 0 1 1 1 1 2 x 1 0 0 0 1 x 2 1 0 0 0 0
// 1 1 2 x 2 x 1 1 1 1 0 0 0 0 1 1 2 1 1 0 0 0 1 2 x 1 0 0 0 0
// 1 x 3 2 2 1 1 0 0 1 1 1 0 0 1 x 1 0 0 0 0 0 1 2 2 1 0 0 0 0
// 1 2 x 1 0 0 0 0 0 1 x 1 0 0 1 1 1 0 0 0 0 0 1 x 1 0 0 0 0 0`

// let map = 
// `0 0 0 0 0 0 0 0 0 0 0 0 ? ? ? 0 0 0 0 0 0 0 0 ? ? ? ? ? ? 0
// 0 0 0 0 0 0 0 0 0 0 0 0 ? ? ? 0 ? ? ? 0 0 0 0 ? ? ? ? ? ? 0
// ? ? ? 0 0 0 0 ? ? ? 0 0 0 0 ? ? ? ? ? 0 0 0 0 ? ? ? ? ? ? 0
// ? ? ? ? ? ? 0 ? ? ? ? ? 0 0 ? ? ? ? ? 0 0 0 0 ? ? ? 0 0 0 0
// ? ? ? ? ? ? 0 ? ? ? ? ? 0 0 ? ? ? ? 0 0 0 0 0 ? ? ? 0 0 ? ?
// 0 ? ? ? ? ? 0 0 0 ? ? ? 0 ? ? ? ? ? 0 0 0 0 0 ? ? ? 0 0 ? ?
// 0 ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? 0 0 0 ? ? ? ? ? ? ?
// 0 0 0 ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? 0 ? ? ? 0 0 ? ? ? 0
// 0 ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? 0 ? ? ? 0 0 ? ? ? 0
// ? ? ? ? 0 ? ? ? ? 0 0 0 ? ? ? ? ? ? ? 0 0 ? ? ? 0 0 ? ? ? 0
// ? ? ? ? 0 ? ? ? ? ? 0 0 ? ? ? ? ? ? ? 0 0 0 ? ? ? 0 0 0 0 0
// ? ? ? ? ? ? ? ? ? ? 0 0 ? ? ? ? ? ? ? 0 0 0 ? ? ? ? 0 0 0 0
// ? ? ? ? ? ? ? ? ? ? 0 0 0 0 ? ? ? ? ? 0 0 0 ? ? ? ? 0 0 0 0
// ? ? ? ? ? ? ? 0 0 ? ? ? 0 0 ? ? ? 0 0 0 0 0 ? ? ? ? 0 0 0 0
// ? ? ? ? 0 0 0 0 0 ? ? ? 0 0 ? ? ? 0 0 0 0 0 ? ? ? 0 0 0 0 0`

// var map=
// `0 ? ?
// 0 ? ?`,
// result=
// `0 1 x
// 0 1 1`
// game.read(result)
// console.log( solveMine(map, 1) )

var map = 
`0 0 0 ? ? ? ? ? ? 0 0 0 0 0 ? ? ? 0 0 ? ? ? ? ? ? ? ?
? ? 0 ? ? ? ? ? ? 0 0 0 0 0 ? ? ? ? ? ? ? ? ? ? ? ? ?
? ? ? ? 0 0 0 0 0 0 ? ? ? 0 ? ? ? ? ? ? 0 ? ? ? ? ? ?
? ? ? ? 0 0 0 0 0 0 ? ? ? 0 0 0 0 ? ? ? 0 ? ? ? ? ? ?
0 ? ? ? 0 0 0 0 0 0 ? ? ? 0 0 0 0 0 0 0 0 ? ? ? ? ? ?
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 ? ? ? ? 0`
var result =
`0 0 0 1 x 1 1 x 1 0 0 0 0 0 1 1 1 0 0 1 x 3 x 3 1 2 1
1 1 0 1 1 1 1 1 1 0 0 0 0 0 1 x 1 1 1 2 1 3 x 3 x 2 x
x 2 1 1 0 0 0 0 0 0 1 1 1 0 1 1 1 1 x 1 0 2 2 3 1 3 2
1 2 x 1 0 0 0 0 0 0 1 x 1 0 0 0 0 1 1 1 0 1 x 2 1 2 x
0 1 1 1 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 1 2 3 x 2 1
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 x 2 1 0`
game.read(result)
console.log( solveMine(map, 16) )