import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useEffect, useReducer } from 'react';
import cn from 'classnames';
import { formReducer, INITIAL_STATE } from './JournalForm.state';

function JournalForm({ onSubmit }) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const { isFormValid, values, isFormReadyToSubmit } = formState;

	useEffect(() => {
		let timerID;
		if (!isFormValid.title || !isFormValid.date || !isFormValid.post) {
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
		}
	}, [isFormReadyToSubmit]);

	const addJournalItem = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);
		dispatchForm({ type: 'SUBMIT', payload: formProps });
	};

	return (
		<>
			<form className={styles['journal-form']} onSubmit={addJournalItem}>
				<div className={styles['input-title']}>
					<input
						type="text"
						name="title"
						className={cn(styles['input-title'], {
							[styles['invalid']]: !isFormValid.title,
						})}
					/>
				</div>
				<div className={styles['form-row']}>
					<label htmlFor="date" className={styles['form-label']}>
						<img src="/calendar.svg" alt="Иконка календаря" />
						<span>Дата</span>
					</label>
					<input
						type="date"
						name="date"
						id="date"
						className={cn(styles['input'], {
							[styles['invalid']]: !isFormValid.date,
						})}
					/>
				</div>
				<div className={styles['form-row']}>
					<label htmlFor="tag" className={styles['form-label']}>
						<img src="/folder.svg" alt="Иконка папки" />
						<span>Метки</span>
					</label>
					<input type="text" id="tag" name="tag" className={styles['input']} />
				</div>

				<textarea
					name="post"
					id=""
					cols="30"
					rows="10"
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
