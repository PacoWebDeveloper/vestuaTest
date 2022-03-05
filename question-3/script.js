/**
 * On this module you should write your answer to question #3.
 * This file would be executed with the following command:
 * $ node script.js 'a * (b + c)'
 */

const args = process.argv.slice(-1);
console.log(`Running question #3 with args ${args}`)

let aux = '', next = '', open = 0, close = 0;
let a ='';
let parenthesisArray = new Array();
let parenthesisPendingClose = new Array();

/**
 * Check if a string has correct use of parenthesis.
 * 
 * @param {String} str - String to be evaluated
 * @returns {Boolean} Returns true if string is valid.
 */
function parenthesisChecker(str) {
  // TODO: Implement validation logic
  const string = str[0];
  //Separa parentesis en un array
  for (let i = 0; i < string.length; i++) {
    const char = string.charAt(i);
    if (openParenthesis[char] || closeParenthesis[char]) {
      parenthesisArray.push(char);
    }
  }
  //Ahora tengo recorrer el array y verificar que, si es un parentesis de apertura el siguiente debe ser de apertura o su parentesis de cierre; si el siguiente es un parentesis de cierre que no sea del mismo tipo devuelve false de inmediato
  
  if (parenthesisArray[0] in closeParenthesis)
    return false;
  
  for (let i = 0; i < parenthesisArray.length; i++) {

    if (parenthesisArray[i] in openParenthesis) {
      let j = i;
      while (j >= 0) {
        const p = parenthesisArray[j];
        if (p in openParenthesis) {
          parenthesisPendingClose.push(p);
          j = -1;
        }
        j--;

        a = parenthesisPendingClose[parenthesisPendingClose.length - 1];
        a = a == '(' ? ')' : a == '['? ']' : a == '{' ? '}' : '*';
      }
      aux = parenthesisArray[i];
      next = aux == '(' ? ')' : aux == '[' ? ']' : aux == '{' ? '}': '*';
      open++;
    } else if (parenthesisArray[i] == next) {
        redifineValues();
        close++;
    } else if (parenthesisArray[i] == a) {
        redifineValues();
        close++;
    } else return false;
  }
  //en caso de que se termine de recorrer todo el array y se haya cumplido la condicion anterior,debo contar los parentesis de apertura y los de cierre para que al final veamos si son la misma cantidad de parentesis de apertura y de cierre
  return open == close ? true : false;
}

const openParenthesis = {
  '(': true,
  '{': true,
  '[': true
};
const closeParenthesis = {
  ']': true,
  ')': true,
  '}': true
}

function redifineValues() {
  next = '*';
  parenthesisPendingClose.pop();
  a = parenthesisPendingClose[parenthesisPendingClose.length - 1];
  a = a == '(' ? ')' : a == '['? ']' : a == '{' ? '}' : '*';
}

const isValid = parenthesisChecker(args);
console.log(`parenthesisChecker("${args}") = ${isValid}`);