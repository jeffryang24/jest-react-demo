export function add(...numbers: number[]) {
  return numbers.reduce((total, value) => total + value, 0);
}

export function multiply(...numbers: number[]) {
  // HINT: Remove the code for fixing unit test.
  // if (numbers.length === 0) {
  //   return 0;
  // }

  return numbers.reduce((total, value) => total * value, 1);
}
