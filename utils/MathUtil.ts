export function add(...numbers: number[]) {
  return numbers.reduce((total, value) => total + value, 0);
}

export function multiply(...numbers: number[]) {
  return numbers.reduce((total, value) => total * value, 1);
}
