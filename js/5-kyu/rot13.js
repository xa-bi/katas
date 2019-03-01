// Rot13
// https://www.codewars.com/users/xa_bi/completed_solutions

const TRANS =
  'abcdefghijklmnopqrstuvwxyz'
  .split("")
  .reduce((a,c,i,f) => {
    i = i < 13 ? i + 13 : i - 13
    a[c] = f[i]
    a[c.toUpperCase()] = f[i].toUpperCase()
    return a
  }, {})

const rot13 = message => 
  message
    .split("")
    .map(c => TRANS[c] || c)
    .join("")