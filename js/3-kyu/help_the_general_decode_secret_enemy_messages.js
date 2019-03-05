// Help the general decode secret enemy messages.
// https://www.codewars.com/kata/52cf02cd825aef67070008fa/

let device = {}
device.decode = function (w) {
  let key = 'abdhpF,82QsLirJejtNmzZKgnB3SwTyXG ?.6YIcflxVC5WE94UA1OoD70MkvRuPqH'.split("")
  return w.split("").map( (c,i) => key.indexOf(c) > -1 ? key[(key.indexOf(c) + 65 - i) % 66 ] : c).join("")
}

// console.log(device.decode("-FNYhdmEdViBbxc40,ROYNxwfwvjg5CHUYUhiIkp2CMIvZ.1qPz"))