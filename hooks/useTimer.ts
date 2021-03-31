import { useCallback, useEffect, useReducer } from 'react';

type TimerStatus = 'IDLE' | 'RUNNING' | 'STOPPED' | 'PAUSED';

interface TimerOption {
  autoStart?: boolean;
  interval?: number;
  startFrom: number;
}

interface TimerReducerState {
  currentDuration: number;
  initialDuration: number;
  interval: number;
  status: TimerStatus;
}

type TimerReducerActionType =
  | {
      type: 'PAUSE_TIMER';
    }
  | {
      type: 'RESET_DURATION';
    }
  | {
      type: 'SET_INTERVAL';
      newInterval: number;
    }
  | {
      type: 'START_TIMER';
    }
  | {
      type: 'STOP_TIMER';
    }
  | {
      type: 'TICK_TIMER';
    };

function timerReducer(
  state: TimerReducerState,
  action: TimerReducerActionType
): TimerReducerState {
  switch (action.type) {
    case 'PAUSE_TIMER': {
      return {
        ...state,
        status: 'PAUSED',
      };
    }

    case 'RESET_DURATION': {
      return {
        ...state,
        currentDuration: state.initialDuration,
      };
    }

    case 'SET_INTERVAL': {
      return {
        ...state,
        interval: action.newInterval < 1 ? 1000 : action.newInterval,
      };
    }

    case 'START_TIMER': {
      return {
        ...state,
        status: 'RUNNING',
      };
    }

    case 'STOP_TIMER': {
      return {
        ...state,
        status: 'STOPPED',
      };
    }

    case 'TICK_TIMER': {
      const newDuration =
        state.currentDuration < 0
          ? state.currentDuration + 1
          : state.currentDuration - 1;

      return {
        ...state,
        currentDuration:
          state.currentDuration === 0 ? state.currentDuration : newDuration,
        status: state.currentDuration === 0 ? 'STOPPED' : state.status,
      };
    }

    default: {
      return state;
    }
  }
}

type UseTimerReturnType = [
  TimerReducerState,
  {
    pauseTimer: () => void;
    setTimerInterval: (newInterval: number) => void;
    startTimer: () => void;
    stopTimer: () => void;
  }
];

export default function useTimer(options: TimerOption): UseTimerReturnType {
  const [timerState, dispatch] = useReducer(timerReducer, {
    currentDuration: options.startFrom,
    initialDuration: options.startFrom,
    interval:
      !options.interval || Number(options.interval || 0) < 1
        ? 1000
        : options.interval,
    status: 'IDLE',
  });

  const pauseTimer = useCallback(() => {
    dispatch({ type: 'PAUSE_TIMER' });
  }, []);
  const setTimerInterval = useCallback((newInterval: number) => {
    dispatch({ type: 'SET_INTERVAL', newInterval });
  }, []);
  const startTimer = useCallback(() => {
    dispatch({ type: 'START_TIMER' });
  }, []);
  const stopTimer = useCallback(() => {
    dispatch({ type: 'RESET_DURATION' });
    dispatch({ type: 'STOP_TIMER' });
  }, []);

  // Check if autostart is enabled or not?
  useEffect(() => {
    if (options.autoStart) {
      dispatch({ type: 'START_TIMER' });
    }
  }, []);

  // Start the timer
  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;

    if (timerState.status === 'RUNNING') {
      timerId = setInterval(() => {
        dispatch({ type: 'TICK_TIMER' });
      }, timerState.interval);
    } else if (timerId) {
      clearInterval(timerId);
    }

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [timerState.status, timerState.interval]);

  return [
    timerState,
    {
      pauseTimer,
      setTimerInterval,
      startTimer,
      stopTimer,
    },
  ];
}
