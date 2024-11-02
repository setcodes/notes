import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import Input from '../Input/Input';
import { useContext, useEffect, useReducer, useRef } from 'react';
import cn from 'classnames';
import { formReducer, INITIAL_STATE } from './JournalForm.state';
import { UserContext } from '../context/user.context';

function JournalForm({ onSubmit, data, onDelete }) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const { isFormValid, values, isFormReadyToSubmit } = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const postRef = useRef();
	const { userId } = useContext(UserContext);

	const focusValid = (isFormValid) => {
		switch (true) {
			case !isFormValid.title:
				titleRef.current.focus();
				break;
			case !isFormValid.date:
				dateRef.current.focus();
				break;
			case !isFormValid.post:
				postRef.current.focus();
				break;
		}
	};

	useEffect(() => {
		if (!data) {
			dispatchForm({ type: 'CLEAR' });
			dispatchForm({ type: 'SET_VALUE', payload: { userId } });
		}
		dispatchForm({ type: 'SET_VALUE', payload: { ...data } });
	}, [data, userId]);

	useEffect(() => {
		let timerID;
		if (!isFormValid.title || !isFormValid.date || !isFormValid.post) {
			focusValid(isFormValid);
			timerID = setTimeout(() => {
				dispatchForm({ type: 'RESET_VALIDITY' });
			}, 2000);
		}
		return () => {
			clearTimeout(timerID);
		};
	}, [isFormValid]);

	useEffect(() => {
		if (isFormReadyToSubmit) {
			onSubmit(values);
			dispatchForm({ type: 'CLEAR' });
			dispatchForm({ type: 'SET_VALUE', payload: { userId } });
		}
	}, [isFormReadyToSubmit, values, onSubmit, userId]);

	useEffect(() => {
		dispatchForm({ type: 'SET_VALUE', payload: { userId } });
	}, [userId]);

	const onChange = (e) => {
		dispatchForm({
			type: 'SET_VALUE',
			payload: { [e.target.name]: [e.target.value] },
		});
	};

	const addJournalItem = (e) => {
		e.preventDefault();
		dispatchForm({ type: 'SUBMIT' });
	};

	const deleteJournalItem = () => {
		onDelete(data.id);
		dispatchForm({ type: 'CLEAR' });
		dispatchForm({ type: 'SET_VALUE', payload: { userId } });
	};

	return (
		<>
			<form className={styles['journal-form']} onSubmit={addJournalItem}>
				<div className={styles['form-row']}>
					<Input
						type="text"
						ref={titleRef}
						onChange={onChange}
						value={values.title}
						name="title"
						isFormValid={!isFormValid.title}
						appearence="title"
					/>
					{data?.id && (
						<button
							className={styles['delete']}
							type="button"
							onClick={deleteJournalItem}
						>
							<img src="./archive.svg" alt="delete" />
						</button>
					)}
				</div>
				<div className={styles['form-row']}>
					<label htmlFor="date" className={styles['form-label']}>
						<img src="/calendar.svg" alt="Иконка календаря" />
						<span>Дата</span>
					</label>

					<Input
						type="date"
						ref={dateRef}
						onChange={onChange}
						value={
							values.date
								? new Date(values.date).toISOString().slice(0, 10)
								: ''
						}
						name="date"
						isFormValid={!isFormValid.date}
						appearence="text"
					/>
				</div>
				<div className={styles['form-row']}>
					<label htmlFor="tag" className={styles['form-label']}>
						<img src="/folder.svg" alt="Иконка папки" />
						<span>Метки</span>
					</label>
					<Input
						type="text"
						onChange={onChange}
						value={values.tag}
						name="tag"
						appearence="text"
					/>
				</div>

				<textarea
					name="post"
					id=""
					cols="30"
					rows="10"
					value={values.post}
					onChange={onChange}
					ref={postRef}
					className={cn(styles['input'], {
						[styles['invalid']]: !isFormValid.post,
					})}
				></textarea>
				<Button
					text={'сохранить'}
					onClick={() => console.log('click submit')}
				/>
			</form>
		</>
	);
}

export default JournalForm;
