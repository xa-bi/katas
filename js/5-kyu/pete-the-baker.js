// Pete, the baker
// https://www.codewars.com/kata/525c65e51bf619685c000059

function cakes(recipe, available) {
  let total = 0
  let isDoable = true // asume we have all needed ingredients
  do {
    for (const [ing, qty] of Object.entries(recipe)) { // check all ingredients
      if (available[ing] &&                            // Have the ingredient
          (available[ing] -= qty) >= 0) continue       // and enought quantity
      isDoable = false                                 // No -> is not doable
      break         // Not needed, but it's an optimization for large recipes
    }
    if (isDoable) total++
  } while (isDoable)
  return total
}