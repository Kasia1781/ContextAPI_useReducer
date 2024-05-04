import {
	type FormEvent,
	type ComponentPropsWithoutRef,
	useRef,
	forwardRef,
	useImperativeHandle,
} from 'react';

export type FormHandle = {
	clear: () => void;
};

type FormProps = ComponentPropsWithoutRef<'form'> & {
	onSave: (value: unknown) => void;
};

const Form = forwardRef<FormHandle, FormProps>(function Form(
	{ onSave, children, ...otherProps },
	ref
) {
	const form = useRef<HTMLFormElement>(null);

	useImperativeHandle(ref, () => {
		return {
			clear() {
				console.log('CLEAR');
				form.current?.reset();
			},
		};
	});

	function handelSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const data = Object.fromEntries(formData); //obiekt danych który zawiera zebrane dane z formularza
		onSave(data);
		form.current?.reset(); //resetowanie formularza
	}

	return (
		<form onSubmit={handelSubmit} {...otherProps} ref={form}>
			{children}
		</form>
	);
});

export default Form;
