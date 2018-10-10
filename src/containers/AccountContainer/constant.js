export const accountColumns = [{
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
	render: text => (text ? text : '--')
}, {
	title: '微信',
	dataIndex: 'wx',
	key: 'wx',
	render: text => (text ? text : '--')
}, {
	title: '邮箱',
	dataIndex: 'email',
	key: 'email',
	render: text => (text ? text : '--')
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

export const schoolColumns = [{
	title: '学校名称',
	dataIndex: 'name',
	key: 'name',
}, {
	title: '学校编码',
	dataIndex: 'bm',
	key: 'bm',
}, {
	title: '可开通账号数',
	dataIndex: 'rs',
	key: 'rs',
}, {
	title: '到期时间',
	dataIndex: 'endtime',
	key: 'endtime',
}, {
	title: '状态',
	dataIndex: 'zt',
	key: 'zt',
	render: text => (text === 1 ? '使用中' : '已锁定')
}]