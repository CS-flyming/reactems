/**
 * 实验相关reducer
 * @author chenym1992
 * @time 2017-06-20 16:48:07
 */
import {
	combineReducers
} from 'redux'
import {
	GET_STUDENT_ING_EXP,
	GET_EXP_BASE_DETAIL_BY_ID,
	GET_TEA_FQ_EXP,
	GET_DSP_EXP,
	GET_TEA_YWC_EXP,
	GET_YWC_EXP_DETAIL
} from 'constants/ActionTypes'
// 实验列表
const expStuIngList = (state = [], action) => {
	switch (action.type) {
		case GET_STUDENT_ING_EXP:
			state = action.data
			return state
		default:
			return state
	}
}

// 实验列表
const expTeaFqList = (state = [], action) => {
	switch (action.type) {
		case GET_TEA_FQ_EXP:
			state = action.data
			return state
		default:
			return state
	}
}

// 实验列表
const expDspList = (state = [], action) => {
	switch (action.type) {
		case GET_DSP_EXP:
			state = action.data
			return state
		default:
			return state
	}
}

// 实验列表
const expTeaYwcList = (state = [], action) => {
		switch (action.type) {
			case GET_TEA_YWC_EXP:
				state = action.data
				return state
			default:
				return state
		}
	}
	// 实验详情
const expDetail = (state = {}, action) => {
	switch (action.type) {
		case GET_EXP_BASE_DETAIL_BY_ID:
		case GET_YWC_EXP_DETAIL:
			state = action.data
			return {
				...state
			}
		default:
			return state
	}
}
const expreducer = combineReducers({
	expStuIngList,
	expTeaFqList,
	expDspList,
	expTeaYwcList,
	expDetail
});
export default expreducer