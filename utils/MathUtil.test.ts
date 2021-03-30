import { add, multiply } from './MathUtil';

// Test Suite
describe('MathUtil - add method', () => {
  // Unit Test
  it('should return the correct result', () => {
    // Assertion
    expect(add(1, 2, 3, 4, 5)).toBe(15);
  });

  it('should return zero when no argument is provided', () => {
    expect(add()).toBe(0);
  });
});

describe('MathUtil - multiply method', () => {
  it('should return the correct result', () => {
    expect(multiply(1, 2, 3, 4, 5)).toBe(120);
  });

  it('should return zero when no argument is provided', () => {
    // Oops.. This test doesn't pass. We should fix the code.
    expect(multiply()).toBe(0);
  });
});
