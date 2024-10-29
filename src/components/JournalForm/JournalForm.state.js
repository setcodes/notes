export const INITIAL_STATE = {
	isFormValid: {
		title: true,
		post: true,
		date: true,
	},
	values: {
		title: '',
		post: '',
		date: '',
		tag: '',
	},
	isFormReadyToSubmit: false,
};

export function formReducer(state, action) {
	switch (action.type) {
		case 'SET_VALUE':
			return { ...state, values: { ...state.values, ...action.payload } };
		case 'CLEAR':
			return {
				...state,
				values: INITIAL_STATE.values,
				isFormReadyToSubmit: false,
			};
		case 'RESET_VALIDITY':
			return { ...state, isFormValid: INITIAL_STATE.isFormValid };
		case 'SUBMIT': {
			const titleValidity = state.values.title;
			const postValidity = state.values.post;
			const dateValidity = state.values.date;

			return {
				...state,
				isFormValid: {
					title: titleValidity,
					post: postValidity,
					date: dateValidity,
				},
				isFormReadyToSubmit: titleValidity && postValidity && dateValidity,
			};
		}
	}
}
