// Decode the Morse code
// https://www.codewars.com/kata/54b724efac3d5402db00065e

const decodeMorse = m => m.trim().split("   ").map(s => s.split(" ").map(l => MORSE_CODE[l]).join("") ).join(" ")
