/**
 * 档案reducer
 * @author chenym1992
 * @time 2017-07-05 11:17:16
 */
import {
	combineReducers
} from 'redux'
import {
	GET_FILE_RECORD_LIST,
	GET_ACCOUNT_RECORD_LIST,
	GET_PURCHASE_RECORD_LIST
} from 'constants/ActionTypes'
// 文献档案列表
const fileRecordList = (state = [], action) => {
	switch (action.type) {
		case GET_FILE_RECORD_LIST:
			state = action.data
			return state
		default:
			return state
	}
}

// 人员档案列表
const accountRecordList = (state = [], action) => {
	switch (action.type) {
		case GET_ACCOUNT_RECORD_LIST:
			state = action.data
			return state
		default:
			return state
	}
}

// 采购档案列表
const purchaseRecordList = (state = [], action) => {
	switch (action.type) {
		case GET_PURCHASE_RECORD_LIST:
			state = action.data
			return state
		default:
			return state
	}
}

const recordreducer = combineReducers({
	fileRecordList,
	accountRecordList,
	purchaseRecordList
});
export default recordreducer