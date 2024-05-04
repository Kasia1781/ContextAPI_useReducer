import { createContext, type ReactNode } from 'react';

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
