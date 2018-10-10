import {
	GET_MSG_LIST,
	GET_FQ_MSG_LIST
} from 'constants/ActionTypes'
import {
	combineReducers
} from 'redux'
const msg = (state = [], action) => {
	switch (action.type) {
		case GET_MSG_LIST:
			state = action.data
			return state
		default:
			return state
	}
}

const fqMsgList = (state = [], action) => {
	switch (action.type) {
		case GET_FQ_MSG_LIST:
			state = action.data
			return state
		default:
			return state
	}
}

const msgreducer = combineReducers({
	msg,
	fqMsgList
});
export default msgreducer