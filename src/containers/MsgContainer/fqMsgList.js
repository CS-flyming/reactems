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
	judgeKey,
	fqMsgColumns
} from 'constants/constant'
import RecordTable from 'components/RecordTable'
import {
	getFqMsgList
} from 'actions/news'

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
						<FormItem {...formItemLayout} label="主题">
				          {getFieldDecorator('main ')(
				            <Input placeholder="主题" />
				          )}
				        </FormItem>
		          	</Col>
		          	<Col span={6}>
						<FormItem {...formItemLayout} label="内容">
				          {getFieldDecorator('text')(
				            <Input placeholder="内容" />
				          )}
				        </FormItem>
		          	</Col>
		          	<Col>
			            <Button type="primary" htmlType="submit">查询</Button>
			            <Button type="primary" style={{marginLeft:8}}><Link to="/fqmsg">发送消息</Link></Button>
		          	</Col>
		        </Row>
		     </Form>

		)
	}
}

const SearchForm = Form.create()(NormalSearchForm)
const listUrl = '/msgController.do?listfq'
const btnStyle = {
	marginLeft: 8
}

function mapStateToProps(state) {
	let {
		fqMsgList
	} = state.msgreducer
	return {
		list: fqMsgList.list,
		total: fqMsgList.totalRecords
	}
}
export class FqMsgList extends React.Component {
	constructor(props) {
		super(props);

		/**
		 * 设置分页
		 * @type {Number}
		 */

		this.getFqMsgList = bindActionCreators(getFqMsgList, this.props.dispatch)
		const has = judgeKey('action', fqMsgColumns)
		if (!has) {
			fqMsgColumns.push({
				title: '操作',
				key: 'action',
				render: (record) => this.createButtons(record)
			})
		}
	}
	componentWillMount() {
		this.getFqMsgList(listUrl)
	}

	createButtons(record) {
		return (<Button type="danger" onClick={this.deleteMsg.bind(this,record)}>删除</Button>)
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
	 * 删除消息
	 * @param  {[type]} record [description]
	 * @return {[type]}        [description]
	 */
	deleteMsg = (record) => {
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
	              <Breadcrumb.Item>消息列表</Breadcrumb.Item>
	            </Breadcrumb>
	            <div style={{ padding: 24, background: '#fff', minHeight: '100%' }}>
	            	<SearchForm/>
					<RecordTable
						data={list}
						columns={fqMsgColumns}
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
)(FqMsgList)