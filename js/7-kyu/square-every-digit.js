// Square Every Digit
// https://www.codewars.com/kata/546e2562b03326a88e000020

function squareDigits(num){
  return parseInt(num.toString().split("").map(num => num * num).join(""), 10)
}