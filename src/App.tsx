import './App.css';
import AddTimer from './components/AddTimer';
import Header from './components/Header';
import Timers from './components/Timers';
import { TimersContextProvider } from './store/timers-context';

function App() {
	return (
		<TimersContextProvider>
			<Header />
			<main>
				<AddTimer />
			</main>
			<Timers />
		</TimersContextProvider>
	);
}

export default App;
