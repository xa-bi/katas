// Bit Counting
// https://www.codewars.com/kata/526571aae218b8ee490006f4

const countBits = n => n ? parseInt(n).toString(2).match(/1/g).length : 0