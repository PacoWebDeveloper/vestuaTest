/**
 * On this module you should write your answer to question #1.
 * This file would be executed with the following command (N=100):
 * $ node scritp.js 100
 */
const args = process.argv.slice(-1);
console.log(`Running question #1 with args ${args}`);

let first = 1;
let second = 2;

if (args < 3) second = args;

for (let i = 2; i < args; i++) {
  const last = first + second;
  first = second;
  second = last;
}
console.log(second + ' ways to up stairs');