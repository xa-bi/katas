// RGB To Hex Conversion
// https://www.codewars.com/kata/513e08acc600c94f01000001

const rgb = (r, g, b) => {
  const i2h = i => i < 0 ? "00" : i > 255 ? "FF" : ("0" + i.toString(16)).slice(-2).toUpperCase()
  return i2h(r) + i2h(g) + i2h(b)
}