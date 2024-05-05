import { createContext, useContext, type ReactNode } from 'react';

type TimerState = {
	isRunning: boolean;
	timers: Timer[];
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

export function TimersContextProvider({
	children,
}: TimersContextProviderProps) {
	const ctx: TimersContextValue = {
		timers: [],
		isRunning: false,
		addTimer(timerData) {
			//...
		},
		startTimer() {
			//...
		},
		stopTimer() {
			//...
		},
	};

	return (
		<TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
	);
}
