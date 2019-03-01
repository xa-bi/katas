// Screen Locking Patterns
// https://www.codewars.com/kata/585894545a8a07255e0002f1

// Dot connections
// FROM -> [TO] (Second character means over it)
let CONNECTIONS = {
  'A' : ['B', 'CB', 'D', 'E', 'F', 'GD', 'H', 'IE'],
  'B' : ['A', 'C', 'D', 'E', 'F', 'G', 'HE', 'I'],
  'C' : ['B', 'AB', 'D', 'E', 'F', 'GE', 'H', 'IF'],
  'D' : ['A', 'B', 'C', 'E', 'FE', 'G', 'H', 'I'],
  'E' : ['A', 'B', 'C', 'D', 'F', 'G', 'H', 'I'],
  'F' : ['A', 'B', 'C', 'DE', 'E', 'G', 'H', 'I'],
  'G' : ['AD', 'B', 'CE', 'D', 'E', 'F', 'H', 'IH'],
  'H' : ['A', 'BE', 'C', 'D', 'E', 'F', 'G', 'I'],
  'I' : ['AE', 'B', 'CF', 'D', 'E', 'F', 'GH', 'H']
}
 
// Given a position and already visited positions
// return new posible positions
const posibleConnections = (point, visited) => {
  return CONNECTIONS[point].reduce( (res, pos) => {
    let [dest, over] = pos.split("")
    if (visited.indexOf(dest) === -1 &&
        (!over || visited.indexOf(over) !== -1)) res.push(dest)
    return res
  }, [])
}

// Recursive search for total posible patterns
const countPatternsFrom = (pattern, max) => {
  let total = 0
  if (pattern.length > max) return total
  if (pattern.length === max) return total + 1
  let last = pattern.slice(-1)
  let posible = posibleConnections(last, pattern)
  if (pattern.length + 1 === max) return posible.length
  for (newPosition of posible) {
    total += countPatternsFrom(pattern + newPosition, max)
  }
  return total
} 