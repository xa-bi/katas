// Square into Squares. Protect trees!
// https://www.codewars.com/kata/54eb33e5bc1a25440d000891

const findValid = (total, actual, arr) => {
  if (total === 0) return true
  for (let i=actual-1; i>=1; i--) {
    let square = i * i
    if (square > total) continue
    arr.push(i)
    if (findValid(total - square, i, arr)) return true
    arr.pop()
  }
  
  return null
}

const decompose = n => {
  let arr = []
  let res = findValid( n*n, n, arr )
  return res ? arr.reverse() : null
}