// Categorize New Member
// https://www.codewars.com/kata/5502c9e7b3216ec63c0001aa

function openOrSenior(data){
  return data.map(([a,h]) => a >= 55 && h > 7 ? 'Senior' : 'Open')
}