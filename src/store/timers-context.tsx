import { createContext, useContext, useReducer, type ReactNode } from 'react';

type TimerState = {
	isRunning: boolean;
	timers: Timer[];
};

//dane początkowe potrzebne do useReducer
const initialState: TimerState = {
	isRunning: true,
	timers: [],
};

type Timer = {
	name: string;
	duration: number;
};

type TimersContextValue = TimerState & {
	addTimer: (timerData: Timer) => void;
	startTimer: () => void;
	stopTimer: () => void;
};

export const TimersContext = createContext<TimersContextValue | null>(null);

//niestandardowy hook żeby context nie przyjmował wartości null
export function useTimersContext() {
	const timersCtx = useContext(TimersContext);

	if (timersCtx === null) {
		throw new Error('TimersContext is null - that should not be case!');
	}
	return timersCtx;
}

type TimersContextProviderProps = {
	children: ReactNode;
};

type StartTimersAction = {
	type: 'START_TIMER';
};

type StopTimersAction = {
	type: 'STOP_TIMER';
};

type AddTimersAction = {
	type: 'ADD_TIMER';
};

type Action = {
	type: StartTimersAction | StopTimersAction | AddTimersAction;
};
function timersReducer(state: TimerState, action: Action): TimerState {
	if (action.type === 'START_TIMER') {
		return {
			...state,
			isRunning: true,
		};
	}

	if (action.type === 'STOP_TIMER') {
		return {
			...state,
			isRunning: false,
		};
	}

	if (action.type === 'ADD_TIMER') {
		return {
			...state,
			timers: [
				...state.timers,
				{ name: action.payload.name, duration: action.payload.duration },
			],
		};

		return state;
	}
}

export function TimersContextProvider({
	children,
}: TimersContextProviderProps) {
	const [timersState, dispatch] = useReducer(timersReducer, initialState);

	const ctx: TimersContextValue = {
		timers: timersState.timers,
		isRunning: timersState.isRunning,
		addTimer(timerData) {
			dispatch({ type: 'ADD_TIMER', payload: timerData });
		},
		startTimer() {
			dispatch({ type: 'START_TIMER' });
		},
		stopTimer() {
			dispatch({ type: 'STOP_TIMER' });
		},
	};

	return (
		<TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
	);
}
