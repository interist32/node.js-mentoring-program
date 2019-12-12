import * as readline from 'readline';

const readLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function reverse(str) {
  return str.split('').reverse().join('');
}

readLine.on('line', (text) => {
  console.log(reverse(text));
});
