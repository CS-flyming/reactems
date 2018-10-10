import {
	SET_USER_INFO
} from 'constants/ActionTypes'

const userInfo = (state = {}, action) => {
	switch (action.type) {
		case SET_USER_INFO:
			state = action.data
			return state
		default:
			return state
	}
}

export default userInfo