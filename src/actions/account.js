import {
	GET_ACCOUNT_LIST,
	GET_SCHOOL_ACCOUNT_LIST
} from 'constants/ActionTypes'
// import '../api/nav'
import $ax from 'constants/axiosUtil'


/*
 * action 创建函数
 */
/**
 * 获取账号列表
 */
export function getAccountList(url) {
	return function(dispatch, getState) {
		$ax.get(url, {
			dataType: 'json'
		}).then(res => {
			let data = res.data
			dispatch(fetchAccountList(data))
		})
	}
}

/**
 * 获取学校列表
 */
export function getSchoolAccountList(url) {
	return function(dispatch, getState) {
		$ax.get(url, {
			dataType: 'json'
		}).then(res => {
			let data = res.data
			dispatch(fetchSchoolAccountList(data))
		})
	}
}

/**
 * 添加账号
 */
export function addAccount(data) {
	return $ax({
		url: '/userController.do?save',
		data: data
	})
}
export function fetchAccountList(data) {
	return {
		type: GET_ACCOUNT_LIST,
		data: data
	}
}

export function fetchSchoolAccountList(data) {
	return {
		type: GET_SCHOOL_ACCOUNT_LIST,
		data: data
	}
}