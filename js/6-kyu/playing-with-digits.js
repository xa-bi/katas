// Playing with digits
// https://www.codewars.com/kata/5552101f47fc5178b1000050

function digPow(n, p){
  const A = ("" + n).split("")
  const total = A.reduce( (a, v, i) => a + Math.pow(v, i + p) , 0)
  return (total / n) % 1 ? -1 : total / n
}