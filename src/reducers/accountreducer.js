/**
 * 档案reducer
 * @author chenym1992
 * @time 2017-07-05 11:17:16
 */
import {
	combineReducers
} from 'redux'
import {
	GET_ACCOUNT_LIST,
	GET_SCHOOL_ACCOUNT_LIST
} from 'constants/ActionTypes'
// 账号列表
const accountList = (state = [], action) => {
	switch (action.type) {
		case GET_ACCOUNT_LIST:
			state = action.data
			return state
		default:
			return state
	}
}

// 学校列表
const schoolList = (state = [], action) => {
	switch (action.type) {
		case GET_SCHOOL_ACCOUNT_LIST:
			state = action.data
			return state
		default:
			return state
	}
}

const accountreducer = combineReducers({
	accountList,
	schoolList
});
export default accountreducer