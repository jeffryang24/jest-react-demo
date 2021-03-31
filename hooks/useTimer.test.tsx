import { act, render } from '@testing-library/react';

import useTimer from './useTimer';

interface UseTimerWrapperOptions {
  autoStart?: boolean;
  interval?: number;
  startFrom: number;
}

type UseTimerReturnType = ReturnType<typeof useTimer>;
type UseTimerWrapperReturnType = {
  0: UseTimerReturnType[0];
  1: UseTimerReturnType[1];
};

describe('Hooks - useTimer', () => {
  function createOptions(
    options?: Partial<UseTimerWrapperOptions>
  ): UseTimerWrapperOptions {
    return {
      startFrom: 10,
      ...options,
    };
  }

  function useTimerWrapper(
    customOptions?: Partial<UseTimerWrapperOptions>
  ): UseTimerWrapperReturnType {
    const options = createOptions(customOptions);
    const returnValue: UseTimerWrapperReturnType = {} as UseTimerWrapperReturnType;

    function UseTimerWrapper() {
      Object.assign(returnValue, useTimer(options));
      return null;
    }

    render(<UseTimerWrapper />);
    return returnValue;
  }

  beforeAll(() => jest.useFakeTimers());

  afterAll(() => jest.useRealTimers());

  it('should show IDLE status on the first time with autoStart disabled', () => {
    const timerHook = useTimerWrapper();

    expect(timerHook[0].status).toBe('IDLE');
    expect(timerHook[0].interval).toBe(1000);
  });

  it('should show RUNNING status on the first time with autoStart enabled', () => {
    const timerHook = useTimerWrapper({ autoStart: true });

    expect(timerHook[0].status).toBe('RUNNING');
  });

  it('should use default interval when interval was set to lower than one', () => {
    const timerHook = useTimerWrapper({ interval: -10 });

    expect(timerHook[0].interval).toBe(1000);
  });

  it('should start the timer when execute startTimer method', () => {
    const timerHook = useTimerWrapper();

    // Before start assertion
    expect(timerHook[0].status).toBe('IDLE');
    expect(timerHook[0].currentDuration).toBe(10);

    // Start the timer manually
    act(() => {
      timerHook[1].startTimer();
    });

    // Assert the result
    expect(timerHook[0].status).toBe('RUNNING');
    expect(timerHook[0].currentDuration).toBeLessThanOrEqual(
      timerHook[0].initialDuration
    );
  });

  it('should stop the timer when execute stopTimer method', () => {
    const timerHook = useTimerWrapper();

    // Before start assertion
    expect(timerHook[0].status).toBe('IDLE');
    expect(timerHook[0].currentDuration).toBe(10);

    // Start the timer manually
    act(() => {
      timerHook[1].startTimer();
    });

    // Assert the result
    expect(timerHook[0].status).toBe('RUNNING');
    expect(timerHook[0].currentDuration).toBeLessThanOrEqual(
      timerHook[0].initialDuration
    );

    // Force stop the timer
    act(() => {
      timerHook[1].stopTimer();
    });

    // Assert the result
    expect(timerHook[0].status).toBe('STOPPED');
    expect(timerHook[0].currentDuration).toBe(timerHook[0].initialDuration);
  });

  it('should pause the timer when execute pauseTimer method', () => {
    const timerHook = useTimerWrapper();

    // Before start assertion
    expect(timerHook[0].status).toBe('IDLE');
    expect(timerHook[0].currentDuration).toBe(10);

    // Start the timer manually
    act(() => {
      timerHook[1].startTimer();
    });

    // Assert the result
    expect(timerHook[0].status).toBe('RUNNING');
    expect(timerHook[0].currentDuration).toBeLessThanOrEqual(
      timerHook[0].initialDuration
    );

    // Force stop the timer
    act(() => {
      timerHook[1].pauseTimer();
    });

    // Assert the result
    expect(timerHook[0].status).toBe('PAUSED');
  });

  it('should change the interval lively', () => {
    const timerHook = useTimerWrapper();

    // Assert default interval
    expect(timerHook[0].interval).toBe(1000);

    // Speed up the interval
    act(() => {
      timerHook[1].setTimerInterval(800);
    });

    // Assert the result
    expect(timerHook[0].interval).toBe(800);
  });

  it('should set the status to STOPPED when the timer has done', async () => {
    const timerHook = useTimerWrapper({ startFrom: 1 });

    // Before start assertion
    expect(timerHook[0].status).toBe('IDLE');
    expect(timerHook[0].currentDuration).toBe(1);

    // Start the timer manually
    act(() => {
      timerHook[1].startTimer();
      jest.advanceTimersByTime(2000);
    });

    expect(timerHook[0].currentDuration).toBe(0);
    expect(timerHook[0].status).toBe('STOPPED');
  });
});
