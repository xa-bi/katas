// Human readable duration format
// https://www.codewars.com/kata/52742f58faf5485cae000b9a

function formatDuration (seconds) {
  if (!seconds) return "now"
  
  const units = [
    [ 'year'   , 365 * 24 * 60 * 60 ],
    [ 'day'    , 24 * 60 * 60 ],
    [ 'hour'   , 60 * 60 ],
    [ 'minute' , 60 ],
    [ 'second' , 1 ]
  ]
  const res = []

  units.forEach( ([unit, s]) => {
    total = Math.floor(seconds / s)
    if (total) {
      res.push( total + ' ' + unit + (total > 1 ? "s" : ""))
      seconds -= (total * s)
    }
  })

  let lastTwo = res.splice(-2, 2)
  res.push( lastTwo.join(" and ") )
  return res.join(", ")
}