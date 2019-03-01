// Adding Big Numbers
// https://www.codewars.com/kata/525f4206b73515bffb000b21

const add = (a,b) => {
  let aDigits = a.split(""),
      bDigits = b.split(""),
      result = "",
      carry = 0
  while (aDigits.length || bDigits.length || carry) {
    let d1 = +aDigits.pop() || 0
    let d2 = +bDigits.pop() || 0
    let sum = d1 + d2 + carry
    carry = Math.floor(sum / 10)
    result = (sum % 10) + result
  }
  return result.replace(/^0+/, "")
}