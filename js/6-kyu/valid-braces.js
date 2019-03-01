// Valid Braces
// https://www.codewars.com/kata/5277c8a221e209d3f6000b56

const validBraces = ( braces ) => {
  const buffer = [];
  let isValid = true
  braces.split("").forEach(element => {
    switch (element) {
      case '(': 
          buffer.push(')')
        break;
      case '[': 
          buffer.push(']')
        break;
      case '{': 
          buffer.push('}')
        break;
      case ')': 
      case ']': 
      case '}': 
          if (!buffer.length || buffer.pop() !== element) isValid = false
        break;
    }
  });
  return isValid && buffer.length == 0
}