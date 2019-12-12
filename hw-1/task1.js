import * as readline from 'readline';

const readLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

readLine.on('line', (text) => {
  console.log(reverse(text));
});

function reverse(str) {
  return str.split('').reverse().join('');
}
