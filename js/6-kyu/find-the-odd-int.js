// Find the odd int
// https://www.codewars.com/kata/54da5a58ea159efa38000836

function findOdd(A) {
  let times = {}
  A.forEach(i => times[i] = (times[i] || 0) + 1)
  return +Object.keys(times).filter(i => times[i] % 2)[0]
}