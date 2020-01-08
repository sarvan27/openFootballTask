import * as actiontypes from '../../actionTypes';

const initState = {
  teams: {},
  matches: {}
}

const reducer = (state = initState, action) => {
	switch(action.type){
		case actiontypes.SAVE_TEAMS:
			return {
				...state,
				teams: action.payload
			}
		case actiontypes.SAVE_MATCHES:
			return {
				...state,
				matches: action.payload
			}
		default:
			return state
	}
}

export default reducer;
