import React from 'react';
import {
	Row,
	Col,
	Tooltip
} from 'antd'
export const API_URL = 'http://192.168.1.103:8080'
export const DOWNLOAD_URL = 'http://www.flyming.com/xssyController.do?download&wjid='
export const UPLOAD_URL = '/xssyController.do?upload'
export const dateFormat = "YYYY-MM-DD HH:mm:ss"

/**
 * 默认分页
 * @type {Object}
 */
export const paginationConfig = {
	total: 0,
	defaultCurrent: 1,
	pageSize: 20
};

/**
 * 展示表单
 * @type {Array}
 */
export const infoFormfield = [
	[
		'sybh', 'text', '实验编号'
	],
	[
		'cjsj', 'time', '创建时间'
	],
	[
		'fqr', 'text', '发起人'
	],
	[
		'name', 'text', '实验名称'
	],
	[
		'yjlx', 'text', '研究类型'
	],
	[
		'syrq', 'time', '实验日期'
	],
	[
		'xmbh', 'text', '项目编号'
	],
	[
		'fzr', 'text', '负责人'
	],
	[
		'ktz', 'text', '课题组'
	],
	[
		'rwbh', 'text', '任务编号'
	],
	[
		'pzr', 'text', '批准人'
	],
	[
		'ktfx', 'text', '课题方向'
	]
]

/**
 * 提交表单
 * @type {Array}
 */
export const formfield = [
	[
		'name', 'text', '实验名称', [{
			required: true,
			message: "实验名称不能为空"
		}]
	],
	[
		'yjlx', 'text', '研究类型'
	],
	[
		'syrq', 'time', '实验日期', [{
			required: true,
			message: "实验日期不能为空"
		}]
	],
	[
		'xmbh', 'text', '项目编号'
	],
	[
		'fzr', 'text', '负责人'
	],
	[
		'ktz', 'text', '课题组'
	],
	[
		'rwbh', 'text', '任务编号'
	],
	[
		'pzr', 'text', '批准人'
	],
	[
		'ktfx', 'text', '课题方向'
	]
]

/**
 * 日期选择控制
 * @param  {[type]} current [description]
 * @return {[type]}         [description]
 */
export const disabledDate = (current) => {
	// Can not select days before today and today
	return current && current.valueOf() < Date.now();
}

export const expTableColumns = [{
	title: '提交时间',
	dataIndex: 'czsj',
	key: 'tjsj',
	width: 240
}, {
	title: '审核状态',
	dataIndex: 'zt',
	key: 'zt',
	render: text => formatStatus(text, 'exp')
}, {
	title: '评语',
	dataIndex: 'py',
	key: 'py',
	render: text => {
		if (text) {
			return text
		} else {
			return '--'
		}
	}
}]

export const procurementManagementColumns = [{
	title: '仪器名称',
	dataIndex: 'name',
	key: 'name',
	width: 240
}, {
	title: '申请时间',
	dataIndex: 'fqsj',
	key: 'fqsj',
}, {
	title: '单价',
	dataIndex: 'dj',
	key: 'dj',
}, {
	title: '数量',
	dataIndex: 'sl',
	key: 'sl',
}, {
	title: '总价',
	dataIndex: 'zj',
	key: 'zj',
}, {
	title: '审核人',
	dataIndex: 'shr',
	key: 'shr',
}, {
	title: '状态',
	dataIndex: 'zt',
	key: 'zt',
	render: text => formatStatus(text, 'procurement')
}]


export const procurementManagementApproveColumns = [{
	title: '仪器名称',
	dataIndex: 'name',
	key: 'name',
	width: 240
}, {
	title: '申请时间',
	dataIndex: 'fqsj',
	key: 'fqsj',
}, {
	title: '单价',
	dataIndex: 'dj',
	key: 'dj',
}, {
	title: '数量',
	dataIndex: 'sl',
	key: 'sl',
}, {
	title: '总价',
	dataIndex: 'zj',
	key: 'zj',
}, {
	title: '采购人',
	dataIndex: 'cgr',
	key: 'shr',
}, {
	title: '状态',
	dataIndex: 'zt',
	key: 'zt',
	render: text => formatStatus(text, 'procurement')
}]



/**
 * 状态格式化
 * @param  {[type]} text    [description]
 * @param  {[type]} keyword [description]
 * @return {[type]}         [description]
 */
function formatStatus(text, keyword) {
	if (keyword === 'exp') {
		if (text === 3) {
			return '已归档'
		}
		if (text === 2) {
			return '通过'
		}
		if (text === 1 || text === 0) {
			return '审批中'
		}
	}
	if (keyword === 'procurement') {
		if (parseInt(text, 10) === 3) {
			return '完成'
		}
		if (parseInt(text, 10) === 2) {
			return '被驳回'
		}
		if (parseInt(text, 10) === 1 || parseInt(text, 10) === 0) {
			return '审批中'
		}
	}
}

/**
 * 采购表格渲染函数
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
export const handlePurchaseRowRender = (obj) => {
	return (
		<div>
	        <Row>
	            <Col span={4}>
	                  <div>名称：</div>
	            </Col>
	            <Col span={8} >
	                  <div>{obj.name}</div>
	            </Col>
	             <Col span={4}>
	                  <div>规格：</div>
	            </Col>
	            <Col span={8} >
	                  <div>{obj.gg}</div>
	            </Col>

	        </Row>
	        <Row>
	        	<Col span={4}>
	                  <div>单价：</div>
	            </Col>
	            <Col span={8} >
	                  <div>{obj.dj}</div>
	            </Col>
	            <Col span={4}>
	                  <div>单价：</div>
	            </Col>
	            <Col span={8} >
	                  <div>{obj.sl}</div>
	            </Col>
	        </Row>
	        <Row>
	        	<Col span={4}>
	                  <div>总价：</div>
	            </Col>
	            <Col span={8} >
	                  <div>{obj.zj}</div>
	            </Col>
	            <Col span={4}>
	                  <div>用途：</div>
	            </Col>
	            <Col span={8} >
	                  <div>{obj.yt}</div>
	            </Col>
	        </Row>
	        <Row>
	        	<Col span={4}>
	                  <div>采购人：</div>
	            </Col>
	            <Col span={8} >
	                  <div>{obj.cgr}</div>
	            </Col>
	            <Col span={4}>
	                  <div>供货商：</div>
	            </Col>
	            <Col span={8} >
	                  <div>{obj.cgs}</div>
	            </Col>
	        </Row>
      	</div>
	)
}

export const fileRecordColumns = [{
	title: '主题',
	dataIndex: 'main',
	key: 'main',
}, {
	title: '简介',
	dataIndex: 'text',
	key: 'text',
	render: text => formatText(text)
}, {
	title: '创建人',
	dataIndex: 'cjr',
	key: 'cjr',
}, {
	title: '创建时间',
	dataIndex: 'cjsj',
	key: 'cjsj',
}, {
	title: '附件',
	dataIndex: 'wjid',
	key: 'wjid',
	render: text => {
		const arr = formatFileName(text)
		if (arr.length >= 2) {
			return <a href={DOWNLOAD_URL+text} target="_blank">{arr[1]}</a>
		}
		return '--'
	}
}]

export const accountRecordColumns = [{
	title: '账号',
	dataIndex: 'bh',
	key: 'bh',
}, {
	title: '姓名',
	dataIndex: 'name',
	key: 'name',
}, {
	title: '手机号',
	dataIndex: 'phone',
	key: 'phone',
}, {
	title: 'QQ',
	dataIndex: 'qq',
	key: 'qq',
}, {
	title: '微信',
	dataIndex: 'wx',
	key: 'wx',
}, {
	title: '邮箱',
	dataIndex: 'email',
	key: 'email',
}, {
	title: '角色',
	dataIndex: 'roleid',
	key: 'roleid',
}, {
	title: '学校',
	dataIndex: 'schoolid',
	key: 'schoolid',
}, {
	title: '状态',
	dataIndex: 'zt',
	key: 'zt',
	render: text => (text === 1 ? '使用中' : '已锁定')
}]

export const purchaseRecordColumns = [{
	title: '仪器名称',
	dataIndex: 'name',
	key: 'name',
}, {
	title: '申请时间',
	dataIndex: 'fqsj',
	key: 'fqsj',
}, {
	title: '单价',
	dataIndex: 'dj',
	key: 'dj',
}, {
	title: '数量',
	dataIndex: 'sl',
	key: 'sl',
}, {
	title: '总价',
	dataIndex: 'zj',
	key: 'zj',
}, {
	title: '审核人',
	dataIndex: 'shr',
	key: 'shr',
}]


function formatText(text) {
	if (text.length > 5) {
		return (
			<Tooltip placement="top" title={text}>
        		{text.substring(0,5)+'...'}
      		</Tooltip>
		)
	}
	return text
}

export const judgeKey = (key, arr) => {
	for (let i of arr) {
		if (i.key && i.key === key) {
			return true
		}
	}
	return false
}
export const formatFileName = (text) => {
	return text.split("=")
}

export const btnStyle = {
	marginLeft: 8
}

export const fqMsgColumns = [{
	title: '主题',
	dataIndex: 'main',
	key: 'main',
}, {
	title: '内容',
	dataIndex: 'text',
	key: 'text',
}, {
	title: '附件',
	dataIndex: 'wjid',
	key: 'wjid',
	render: text => {
		if (text) {
			const arr = formatFileName(text)
			if (arr.length >= 2) {
				return <a href={DOWNLOAD_URL+text} target="_blank">{arr[1]}</a>
			}
		}
		return '--'
	}
}, {
	title: '创建时间',
	dataIndex: 'cjsj',
	key: 'cjsj',
}]