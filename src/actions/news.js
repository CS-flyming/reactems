import {
	GET_MSG_LIST,
	GET_FQ_MSG_LIST
}
from 'constants/ActionTypes'
// import '../api/news'
import $ax from 'constants/axiosUtil'
/*
 * action 创建函数
 */
/**
 * 获取老师正在进行的实验
 */
export function getMsgList(url) {
	return function(dispatch, getState) {
		$ax.get(url, {
			dataType: 'json'
		}).then(res => {
			let data = res.data.data
			dispatch(fetchMsgList(data))
		})
	}
}
/**
 * 获取已发送的消息列表
 */
export function getFqMsgList(url) {
	return function(dispatch, getState) {
		$ax.get(url, {
			dataType: 'json'
		}).then(res => {
			let data = res.data.data
			dispatch(fetchFqMsgList(data))
		})
	}
}
export function fetchMsgList(data) {
	return {
		type: GET_MSG_LIST,
		data: data
	}
}

export function fetchFqMsgList(data) {
	return {
		type: GET_FQ_MSG_LIST,
		data: data
	}
}