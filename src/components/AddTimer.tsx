import { useRef } from 'react';
import Button from './UI/Button';
import Form, { FormHandle } from './UI/Form';
import Input from './UI/Input';

export default function AddTimer() {
	const form = useRef<FormHandle>(null);

	function handleSaveTimer(data: unknown) {
		const extractedData = data as { name: string; duration: number };
		console.log(extractedData);

		form.current?.clear();
	}

	return (
		<Form onSave={handleSaveTimer}>
			<Input type='text' label='Name' id='name' name='name' />
			<Input type='number' label='Duration' id='duration' name='duration' />
			<p>
				<Button>Add Timer</Button>
			</p>
		</Form>
	);
}
