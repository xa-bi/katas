// Hamming Numbers
// https://www.codewars.com/kata/526d84b98f428f14a60008da

function hamming (n) {
  const numbers = [1]
  let i = 0, j = 0, k = 0
  while(--n) {
    let nextNumber = Math.min(2*numbers[i], 3*numbers[j], 5*numbers[k])
    numbers.push(nextNumber)
    if (2*numbers[i] <= nextNumber) i += 1
    if (3*numbers[j] <= nextNumber) j += 1
    if (5*numbers[k] <= nextNumber) k += 1
  }
  return numbers.pop()
}