// Are they the "same"?
// https://www.codewars.com/kata/550498447451fbbd7600041c

function comp(array1, array2){
  if (!array1 || !array2) return false
  let isValid = true
  array1.forEach( e => {
    let pos = array2.indexOf(e * e)
    if (pos === -1) isValid = false;
    array2.splice(pos, 1)
  })
  return isValid && array2.length === 0;
}