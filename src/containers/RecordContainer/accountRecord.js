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
	accountRecordColumns,
	paginationConfig
} from 'constants/constant'
import RecordTable from 'components/RecordTable'
import * as recordActionsCreators from 'actions/record'

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
					<Col span={6}>
						<FormItem {...formItemLayout} label="姓名">
				          {getFieldDecorator('name ')(
				            <Input placeholder="姓名" />
				          )}
				        </FormItem>
		          	</Col>
		          	<Col span={6}>
						<FormItem {...formItemLayout} label="账号">
				          {getFieldDecorator('bh')(
				            <Input placeholder="账号" />
				          )}
				        </FormItem>
		          	</Col>
		          	<Col>
			            <Button type="primary" htmlType="submit">查询</Button>
		          	</Col>
		        </Row>
		     </Form>

		)
	}
}

const SearchForm = Form.create()(NormalSearchForm)
const listUrl = '/daglController.do?userlist'
const btnStyle = {
	marginLeft: 8
}

function mapStateToProps(state) {
	let {
		accountRecordList
	} = state.record
	return {
		list: accountRecordList.list,
		total: accountRecordList.totalRecords
	}
}
export class AccountRecord extends React.Component {
	constructor(props) {
		super(props);

		/**
		 * 设置分页
		 * @type {Number}
		 */

		this.recordActionsCreators = bindActionCreators(recordActionsCreators, this.props.dispatch)
	}
	componentWillMount() {
		this.recordActionsCreators.getAccountRecordList(listUrl)
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
	 * 文献档案编辑
	 * @param  {[type]} record [description]
	 * @return {[type]}        [description]
	 */
	editFile = (record) => {
		const {
			history
		} = this.props

		history.push({
			pathname: '/cj_otherda',
			state: record
		})
	}

	/**
	 * 文献档案删除
	 * @param  {[type]} record [description]
	 * @return {[type]}        [description]
	 */
	deleteFile = (record) => {
		console.log(record);
	}

	/**
	 * 文献档案分享
	 * @param  {[type]} record [description]
	 * @return {[type]}        [description]
	 */
	shareFile = (record) => {
		console.log(record);
	}

	/**
	 * 文献档案隐私
	 * @param  {[type]} record [description]
	 * @return {[type]}        [description]
	 */
	privateFile = (record) => {
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
	              <Breadcrumb.Item>人员档案</Breadcrumb.Item>
	            </Breadcrumb>
	            <div style={{ padding: 24, background: '#fff', minHeight: '100%' }}>
	            	<SearchForm/>
					<RecordTable
						data={list}
						columns={accountRecordColumns}
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
)(AccountRecord)