const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (text) => {
  console.log(`${text} -> ${reverse(text)}`);
});


/**
 * Reverses a string.
 * @param {String} str
 */
function reverse(str) {
  return str.split('').reverse().join('');
}
