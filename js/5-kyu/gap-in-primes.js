// Gap in Primes
// https://www.codewars.com/kata/561e9c843a2ef5a40c0000a4

const isPrime = n => {
  if (n % 2 == 0) return false
  let t = Math.ceil( n / 2)
  let s = 3
  while (s < t) {
    if (n % s == 0) return false
    t = Math.ceil(n / s)
    s++
  }
  return true
}

const gap = (g, m, n) => {
  let last = -Number.MAX_VALUE
  for (i = m; i<n; i++) {
    if (isPrime(i)) {
      if (i - last === g) return [last, i]
      last = i
    }
  }
  return null
}