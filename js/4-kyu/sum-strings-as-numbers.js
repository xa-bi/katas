// Sum Strings as Numbers
// https://www.codewars.com/kata/5324945e2ece5e1f32000370

const sumStrings = (a,b) => {
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