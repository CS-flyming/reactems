import {
	GET_PURCHASE_LIST,
	GET_PURCHASE_ADMIN
} from 'constants/ActionTypes'
// import '../api/nav'
import $ax from 'constants/axiosUtil'


/*
 * action 创建函数
 */
/**
 * 获取仪器采购列表
 */
export function getPurchaseList(url, type, callback) {
	return function(dispatch, getState) {
		$ax.get(url, {
			dataType: 'json'
		}).then(res => {
			let data = res.data.data
			dispatch(fetchPurchaseList(data))
			if (type === 'instrument') {
				callback({
					insFetched: 1,
					matFetched: 0
				})
			}
			if (type === 'material') {
				callback({
					insFetched: 0,
					matFetched: 1
				})
			}
		})
	}
}

/**
 * 获取采购管理员
 */
export function getPurchaseAdmin(url) {
	return function(dispatch, getState) {
		$ax.get(url, {
			dataType: 'json'
		}).then(res => {
			dispatch(fetchPurchaseAdmin(res.data))
		})
	}
}

export function fetchPurchaseList(data) {
	return {
		type: GET_PURCHASE_LIST,
		data: data
	}
}

export function fetchPurchaseAdmin(data) {
	return {
		type: GET_PURCHASE_ADMIN,
		data: data
	}
}