import { render } from '@testing-library/react';
import UtilityClassComponent from './UtilityClassComponent';

describe('Components - Utility - UtilityClassComponent', () => {
  const consoleSpy = jest.spyOn(console, 'log');

  beforeEach(() => consoleSpy.mockClear());

  afterAll(() => consoleSpy.mockRestore());

  it('should show console.log when componentDidMount', () => {
    render(<UtilityClassComponent />);

    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy.mock.calls[0][0]).toBe(
      'This is utility class component!'
    );
  });

  it('should show console.log when componentWillUnmount', () => {
    const { unmount } = render(<UtilityClassComponent />);

    unmount();

    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy.mock.calls[1][0]).toBe(
      'Bye-bye from utility class component!'
    );
  });
});
