const themeReducer = (state = {name: 'light', originator: 'Oliver'}, action) => {

	console.log('----------------> state: ', state);

	const newState = {...state};

	switch (action.type) {
		case 'CHANGE_THEME':
			newState.name = action.theme;
		default:
	}

	return newState;
};

export default themeReducer;
