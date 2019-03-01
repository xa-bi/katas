// IQ Test
// https://www.codewars.com/kata/552c028c030765286c00007d

function iqTest(numbers){
  const A = numbers.split(" ")
  const isEven = A.reduce((a,i) => a += i % 2, 0) > 1
  return (+A.indexOf( A.filter( i => i % 2 == (isEven ? 0 : 1))[0] ))+1
}