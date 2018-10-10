import {
	GET_FILE_RECORD_LIST,
	GET_ACCOUNT_RECORD_LIST,
	GET_PURCHASE_RECORD_LIST
} from 'constants/ActionTypes'
// import '../api/nav'
import $ax from 'constants/axiosUtil'

/*
 * action 创建函数
 */
/**
 * 获取文献档案列表
 */
export function getFileRecordList(url) {
	return function(dispatch, getState) {
		$ax.get(url, {
			dataType: 'json'
		}).then(res => {
			let data = res.data.data
			dispatch(fetchFileRecordList(data))
		})
	}
}

/**
 * 获取人员档案列表
 */
export function getAccountRecordList(url) {
	return function(dispatch, getState) {
		$ax.get(url, {
			dataType: 'json'
		}).then(res => {
			let data = res.data.data
			dispatch(fetchAccountRecordList(data))
		})
	}
}

/**
 * 获取采购档案列表
 */
export function getPurchaseRecordList(url) {
	return function(dispatch, getState) {
		$ax.get(url, {
			dataType: 'json'
		}).then(res => {
			let data = res.data.data
			dispatch(fetchPurchaseRecordList(data))
		})
	}
}

export function fetchFileRecordList(data) {
	return {
		type: GET_FILE_RECORD_LIST,
		data: data
	}
}

export function fetchAccountRecordList(data) {
	return {
		type: GET_ACCOUNT_RECORD_LIST,
		data: data
	}
}

export function fetchPurchaseRecordList(data) {
	return {
		type: GET_PURCHASE_RECORD_LIST,
		data: data
	}
}