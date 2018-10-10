import React from 'react';
import {
	connect
} from 'react-redux'
import {
	bindActionCreators
} from 'redux'
import {
	Layout,
	Breadcrumb,
	Form,
	Input,
	Row,
	Col,
	Button,
} from 'antd'
import {
	Link
} from 'react-router-dom'
import {
	paginationConfig,
	judgeKey
} from 'constants/constant'
import {
	schoolColumns
} from './constant'
import RecordTable from 'components/RecordTable'
import * as accountActionsCreators from 'actions/account'

const {
	Content
} = Layout
const FormItem = Form.Item
const formItemLayout = {
	labelCol: {
		span: 5
	},
	wrapperCol: {
		span: 19
	},
}

class NormalSearchForm extends React.Component {
	handleSubmit = (e) => {
		e.preventDefault()
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values)
			}
		})
	}
	handleReset = () => {
		this.props.form.resetFields();
	}
	render() {
		const {
			getFieldDecorator
		} = this.props.form
		return (
			<Form
		        className="ant-advanced-search-form"
		        onSubmit={this.handleSubmit}
		      	>
		        <Row gutter={40}>
		          	<Col>
			            <Button type="primary" style={{marginLeft:8}}><Link to="/add_school">添加学校</Link></Button>
		          	</Col>
		        </Row>
		     </Form>

		)
	}
}

const SearchForm = Form.create()(NormalSearchForm)
const listUrl = '/schoolController.do?list'
const btnStyle = {
	marginLeft: 8
}

function mapStateToProps(state) {
	let {
		schoolList
	} = state.account
	return {
		list: schoolList.list,
		total: schoolList.totalRecords
	}
}
export class SchoolAccount extends React.Component {
	constructor(props) {
		super(props);

		/**
		 * 设置分页
		 * @type {Number}
		 */

		this.accountActionsCreators = bindActionCreators(accountActionsCreators, this.props.dispatch)
		const has = judgeKey('action', schoolColumns)
		if (!has) {
			schoolColumns.push({
				title: '操作',
				key: 'action',
				width: 300,
				render: (record) => this.createButtons(record)
			})
		}
	}
	componentWillMount() {
		this.accountActionsCreators.getSchoolAccountList(listUrl)
	}

	createButtons(record) {
		if (record.zt === 1) {
			return (<div>
				<Button onClick={this.editAccount.bind(this,record)}>编辑</Button>
				<Button type="primary" style={btnStyle} onClick={this.lockAccount.bind(this,record)}>锁定学校</Button>
			</div>)
		}
		return (<Button type="primary" onClick={this.noLockAccount.bind(this,record)}>解锁学校</Button>)
	}

	/**
	 * 分页函数
	 * @param  {[type]} index [description]
	 * @return {[type]}       [description]
	 */
	handlePaginationChange = (index) => {
		console.log(index);
	}

	/**
	 * 账号编辑
	 * @param  {[type]} record [description]
	 * @return {[type]}        [description]
	 */
	editAccount = (record) => {
		const {
			history
		} = this.props

		history.push({
			pathname: '/add_school',
			state: record
		})
	}

	/**
	 * 账号删除
	 * @param  {[type]} record [description]
	 * @return {[type]}        [description]
	 */
	deleteAccount = (record) => {
		console.log(record);
	}

	/**
	 * 账号锁定
	 * @param  {[type]} record [description]
	 * @return {[type]}        [description]
	 */
	lockAccount = (record) => {
		console.log(record);
	}

	/**
	 * 账号解锁
	 * @param  {[type]} record [description]
	 * @return {[type]}        [description]
	 */
	noLockAccount = (record) => {
		console.log(record);
	}
	render() {
		let {
			list,
			total
		} = this.props
		paginationConfig.total = total
		paginationConfig.onChange = this.handlePaginationChange
		let pagination = paginationConfig
		return (
			<Layout style={{minHeight:'100%'}}>
	          <Content style={{ margin: '0 16px' }}>
	            <Breadcrumb style={{ margin: '12px 0' }}>
	              <Breadcrumb.Item>账号管理</Breadcrumb.Item>
	            </Breadcrumb>
	            <div style={{ padding: 24, background: '#fff', minHeight: '100%' }}>
	            	<SearchForm/>
					<RecordTable
						data={list}
						columns={schoolColumns}
						pagination = {pagination}
						/>
	            </div>
	          </Content>
	         </Layout>
		);
	}
}

export default connect(
	mapStateToProps,
	// Implement map dispatch to props
)(SchoolAccount)