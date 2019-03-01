// Large Factorials
// https://www.codewars.com/kata/557f6437bf8dcdd135000010

const bigProduct = (bigM, n) => {
  let remainder = 0
  let result = ''
  while (bigM !== '') {
    let subM = ("" + bigM).slice(-5);
    bigM = ("" + bigM).slice(0,-5);
    let product = (+subM * n) + remainder
    remainder = Math.floor(product / 100000)
    result = ("00000" + (product % 100000)).slice(-5) + result
  }
  result = remainder + result
  return result.replace(/^0+/g, "")
}

function factorial(n){
  let res = 1
  while(n > 1) {
    res = bigProduct(res, n)
    n--
  }
  return "" + res
}