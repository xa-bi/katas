// Calculating with Functions
// https://www.codewars.com/kata/525f3eda17c7cd9f9e000b39

const numbers = "zero,one,two,three,four,five,six,seven,eight,nine"
numbers.split(",").map( (n,i) => {
  global[n] = op => op ? op(i) : i
})
const minus = n1 => n2 => n2 - n1
const plus = n1 => n2 => n2 + n1
const times = n1 => n2 => n2 * n1
const dividedBy = n1 => n2 => Math.floor(n2 / n1)