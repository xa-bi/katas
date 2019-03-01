// Recover a secret string from random triplets
// https://www.codewars.com/kata/53f40dff5f9d31b813000774

var recoverSecret = function(triplets) {
  let totalLetters = triplets.reduce((a,arr) => a + arr.length,0)
  let secretString = ""
  while (totalLetters) {
    for (let triplet of triplets) {
      if (triplet.length === 0) continue
      let posibleLetter = triplet[0]
      let letterIsValid = triplets.reduce((valid, arr) => arr.indexOf(posibleLetter) > 0 ? false : valid , true)
      if (!letterIsValid) continue
      secretString += posibleLetter
      triplets.map( t => {
        if (t.indexOf(posibleLetter) === 0) {
          t.shift()
          totalLetters--
        }
      })
      break
    }
  }
  return secretString
}