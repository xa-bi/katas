// Getting along with Integer Partitions
// https://www.codewars.com/kata/55cf3b567fc0e02b0b00000b

const getPartition = (num, max, actual) => {
  let res = []
  if (num === 0) res.push(actual)
  else {
    if (max > 1) res = [...getPartition(num, max - 1, actual), ...res]
    if (max <= num)
      res = [...getPartition(num - max, max, [...actual, max]), ...res]
  }
  return res
}

const getProduct = partition =>
  partition
    .map(p => p.reduce((total, e) => total * e, 1))
    .filter((e, i, a) => a.indexOf(e) === i)
    .sort((a, b) => a - b)

const getRange = product => product[product.length - 1] - product[0]

const getAverage = product => product.reduce((a, e) => a + e) / product.length

const getMediam = product => {
  if (product.length === 0) return 0
  if (product.length === 1) return product[0]
  let h = Math.floor(product.length / 2)
  if (product.length % 2) {
    return product[h]
  } else {
    return (product[h - 1] + product[h]) / 2
  }
}

const part = n => {
  let partition = getPartition(n, n, [])
  let product   = getProduct(partition)
  let range     = getRange(product)
  let average   = getAverage(product)
  let mediam    = getMediam(product)
  return `Range: ${range} Average: ${Number(average).toFixed(2)} Median: ${Number(mediam).toFixed(2)}`
}