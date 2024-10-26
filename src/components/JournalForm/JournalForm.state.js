export const INITIAL_STATE = {
	isFormValid: {
		title: true,
		post: true,
		date: true,
	},
	values: {
		title: undefined,
		post: undefined,
		date: undefined,
	},
	isFormReadyToSubmit: false,
};

export function formReducer(state, action) {
	switch (action.type) {
		case 'RESET_VALIDITY':
			return { ...state, isFormValid: INITIAL_STATE.isFormValid };
		case 'SUBMIT': {
			const titleValidity = action.payload.title?.trim().length;
			const postValidity = action.payload.post?.trim().length;
			const dateValidity = action.payload.date;

			return {
				values: action.payload,
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
