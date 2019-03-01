// Bouncing Balls
// https://www.codewars.com/kata/5544c7a5cb454edb3c000047

function bouncingBall(h, bounce, window) {
  if (h <= 0 || bounce <= 0 || bounce >= 1 || window >= h) return -1
  let count = -1
  do {
    h *= bounce
    count += 2
  } while (h >= window)
  return count
}