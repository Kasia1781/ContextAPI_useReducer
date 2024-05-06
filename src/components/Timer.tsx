import { useEffect, useRef, useState } from 'react';
import Container from './UI/Container';

type TimerProps = {
	name: string;
	duration: number;
};

export default function Timer({ name, duration }: TimerProps) {
	const [remainingTime, setRemainingTime] = useState(duration * 1000);

	const interval = useRef<number | null>(null);

	if (remainingTime <= 0 && interval.current) {
		clearInterval(interval.current);
	}

	useEffect(() => {
		const timer = setInterval(function () {
			setRemainingTime((prevTime) => prevTime - 50);
		}, 50);

		interval.current = timer;

		return () => clearInterval(timer);
	}, []);

	const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
	console.log(formattedRemainingTime);

	return (
		<Container as='article'>
			<h2>{name}</h2>
			<p>
				<progress max={duration * 1000} value={remainingTime} />
			</p>
			<p>{formattedRemainingTime}</p>
		</Container>
	);
}
