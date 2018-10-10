import {
	GET_NAV_LIST,
	SET_USER_INFO
} from 'constants/ActionTypes'

import $ax from 'constants/axiosUtil'

/*
 * action 创建函数
 */
/**
 * 菜单获取
 */
export function initReq(name) {
	return function(dispatch, getState) {
		$ax.get('/menuController.do?qx', {
			dataType: 'json',
			data: {
				name: name
			}
		}).then(res => {
			let data = res.data.data
			dispatch(fetchNavList(data))
		})
	}
}
/**
 * 初始化用户信息
 */
export function initEnv() {
	return function(dispatch, getState) {
		$ax({
			method: 'get',
			url: '/userController.do?hqyhxx',
			dataType: 'json',
		}).then(res => {
			let data = res.data.data
			dispatch(fetchUserInfo(data))
		})
	}
}

export function fetchNavList(data) {
	return {
		type: GET_NAV_LIST,
		data: data
	}
}
export function fetchUserInfo(data) {
	return {
		type: SET_USER_INFO,
		data: data
	}
}