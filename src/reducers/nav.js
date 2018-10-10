import {
	GET_NAV_LIST
} from 'constants/ActionTypes'

const nav = (state = [], action) => {
	switch (action.type) {
		case GET_NAV_LIST:
			state = action.data
			return state
		default:
			return state
	}
}

export default nav