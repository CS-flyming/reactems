/**
 * 实验相关
 */
import {
	GET_STUDENT_ING_EXP,
	GET_EXP_BASE_DETAIL_BY_ID,
	GET_TEA_FQ_EXP,
	GET_DSP_EXP,
	GET_TEA_YWC_EXP,
	GET_YWC_EXP_DETAIL
} from 'constants/ActionTypes'
// import '../api/nav'
import $ax from 'constants/axiosUtil'
/*
 * action 创建函数
 */
/**
 * 获取老师正在进行的实验
 */
export function getStuIngExp(url) {
	return function(dispatch, getState) {
		$ax.get(url, {
			dataType: 'json'
		}).then(res => {
			let data = res.data.data
			dispatch(fetchStuIngExpList(data))
		})
	}
}
/**
 * 查询实验
 * @return {[type]} [description]
 */
export function searchExp(data, url) {
	return function(dispatch, getState) {
		$ax.get(url, {
			dataType: 'json',
			data: data
		}).then(res => {
			let data = res.data.data
			dispatch(fetchStuIngExpList(data))
		})
	}
}

/**
 * 查询实验
 * @return {[type]} [description]
 */
export function getExpById(id, callback) {
	$ax.get('/xssyController.do?syjlck', {
		dataType: 'json',
		data: {
			id: id
		}
	}).then(res => {
		let data = res.data
		callback(data)
	}).catch(error => {
		let data = {
			status: false
		}
		callback(data)
	})
}

/**
 * 获取老师发起的实验
 */
export function getTeaFqExp(url) {
	return function(dispatch, getState) {
		$ax.get(url, {
			dataType: 'json'
		}).then(res => {
			let data = res.data.data
			dispatch(fetchTeaFqExpList(data))
		})
	}
}



/**
 * 获取待审批的实验
 */
export function getDspExp(url) {
	return function(dispatch, getState) {
		$ax.get(url, {
			dataType: 'json'
		}).then(res => {
			let data = res.data.data
			dispatch(fetchDspExpList(data))
		})
	}
}

/**
 * 获取实验基础信息
 */
export function getExpBaseDetail(url, data) {
	return function(dispatch, getState) {
		$ax.get(url, {
			dataType: 'json',
			data: data
		}).then(res => {
			let data = res.data.data
			dispatch(fetchExpBaseDetail(data))
		})
	}
}

/**
 * 获取老师已完成实验
 */
export function getTeacYwcExp(url) {
	return function(dispatch, getState) {
		$ax.get(url, {
			dataType: 'json'
		}).then(res => {
			let data = res.data.data
			dispatch(fetchTeaYwcExpList(data))
		})
	}
}

/**
 * 获取已完成实验所有信息
 */
export function getYwcExpDetail(url, data) {
	return function(dispatch, getState) {
		$ax.get(url, {
			dataType: 'json',
			data: data
		}).then(res => {

			dispatch(fetchYwcExpDetail(res.data))
		})
	}
}

/**
 * 获取实验的学生
 */
export function getTeaFqExpStu(url, data) {
	return ($ax.get(url, {
		dataType: 'json',
		data: data
	}))


}
/**
 * 获取审批实验详情
 */
export function getDspExpInfo(url, data) {
	return ($ax.get(url, {
		dataType: 'json',
		data: data
	}))
}

/**
 * 审批实验
 */
export function getApproveExp(url, data) {
	return ($ax.get(url, {
		dataType: 'json',
		data: data
	}))
}



function fetchStuIngExpList(data) {
	return {
		type: GET_STUDENT_ING_EXP,
		data: data
	}
}

function fetchExpBaseDetail(data) {
	return {
		type: GET_EXP_BASE_DETAIL_BY_ID,
		data: data
	}
}

function fetchTeaFqExpList(data) {
	return {
		type: GET_TEA_FQ_EXP,
		data: data
	}
}

function fetchDspExpList(data) {
	return {
		type: GET_DSP_EXP,
		data: data
	}
}

function fetchTeaYwcExpList(data) {
	return {
		type: GET_TEA_YWC_EXP,
		data: data
	}
}

function fetchYwcExpDetail(data) {
	return {
		type: GET_YWC_EXP_DETAIL,
		data: data
	}
}