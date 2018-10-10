/**
 * 采购reducer
 * @author chenym1992
 * @time 2017-07-05 11:17:16
 */
import {
	combineReducers
} from 'redux'
import {
	GET_PURCHASE_LIST,
	GET_PURCHASE_ADMIN
} from 'constants/ActionTypes'
// 仪器采购列表
const purchaseList = (state = [], action) => {
	switch (action.type) {
		case GET_PURCHASE_LIST:
			state = action.data
			return state
		default:
			return state
	}
}

// 采购管理员
const purchaseAdmin = (state = {}, action) => {
	switch (action.type) {
		case GET_PURCHASE_ADMIN:
			state = action.data
			return state
		default:
			return state
	}
}

const purchasereducer = combineReducers({
	purchaseList,
	purchaseAdmin
});
export default purchasereducer