// Common Denominators
// https://www.codewars.com/kata/54d7660d2daf68c619000d95

const factors = n => {
  const f = { 1 : 1 }
  let actual = 2
  while (n > 1 && n >= actual) {
    if (n % actual) {
      actual++
    } else {
      f[actual] = f[actual] ? f[actual] + 1 : 1
      n /= actual
    }
  }
  return f
}

const calculateLcm = allFactors => {
  return Object.entries(
    allFactors.reduce((a,f) => {
      for (let [value, times] of Object.entries(f)) {
        if (!a[value] || a[value] < times) a[value] = times
      }
      return a
    }, {})
  ).reduce((a, [value,times]) => a*(Math.pow(value, times)), 1)
}

const convertFrac = lst => {
  const allFactors = lst.map(([numer, denom]) => factors(denom))
  const lcm = calculateLcm( allFactors )
  return lst.reduce((a,[numer, denom]) => {
    return `${a}(${(lcm/denom)*numer},${lcm})`
  }, "")
}