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

import * as purchaseActionsCreators from 'actions/purchase'


import {
	procurementManagementColumns,
	paginationConfig,
	handlePurchaseRowRender
} from 'constants/constant'
import RecordTable from 'components/RecordTable'
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
	goPurchase = type => {
		this.props.history.push({
			pathname: '/purchase/' + type
		})
	}
	formatLabel = (type, label) => {
		if (label === 1) {
			if (type === 'instrument') {
				return '仪器名称'
			}
			if (type === 'material') {
				return '耗材名称'
			}
		} else {
			if (type === 'instrument') {
				return '申请仪器采购'
			}
			if (type === 'material') {
				return '申请耗材采购'
			}
		}

	}
	render() {
		const {
			getFieldDecorator
		} = this.props.form
		const type = this.props.type
		return (
			<Form
		        className="ant-advanced-search-form"
		        onSubmit={this.handleSubmit}
		      	>
		        <Row gutter={40}>
					<Col span={6}>
						<FormItem {...formItemLayout} label={this.formatLabel(type,1)}>
				          {getFieldDecorator('name ')(
				            <Input placeholder={this.formatLabel(type,1)} />
				          )}
				        </FormItem>
		          	</Col>
		          	<Col span={6}>
						<FormItem {...formItemLayout} label={'用途'}>
				          {getFieldDecorator('yt')(
				            <Input placeholder="用途" />
				          )}
				        </FormItem>
		          	</Col>
		          	<Col>
			            <Button type="primary" htmlType="submit">查询</Button>
			            <Button style={{ marginLeft: 8 }} type="primary" onClick={this.goPurchase.bind(this,type)}>
							{this.formatLabel(type,2)}
						</Button>
		          	</Col>
		        </Row>
		     </Form>

		)
	}
}

const SearchForm = Form.create()(NormalSearchForm)

function mapStateToProps(state) {
	let {
		purchaseList
	} = state.purchase
	return {
		list: purchaseList.list,
		total: purchaseList.totalRecords
	}
}
let insListUrl = '/cgController.do?yqgdList'
let matListUrl = '/cgController.do?hcgdList'
class Purchase extends React.Component {

	constructor(props) {
		super(props);
		this.purchaseActionsCreators = bindActionCreators(purchaseActionsCreators, this.props.dispatch)
		this.state = {
			insFetched: 0,
			matFetched: 0
		}
	}
	componentWillMount() {
		const type = this.formatType(this.props.location.pathname)
		this.getPurchaseList(type)
	}

	componentWillReceiveProps(nextProps) {
		const type = this.formatType(nextProps.location.pathname)
		this.getPurchaseList(type)
	}
	getPurchaseList = (type) => {
		const {
			insFetched,
			matFetched
		} = this.state
		if (type === 'instrument' && !insFetched) {
			this.purchaseActionsCreators.getPurchaseList(insListUrl, type, this.callback)
		}
		if (type === 'material' && !matFetched) {
			this.purchaseActionsCreators.getPurchaseList(matListUrl, type, this.callback)
		}
	}

	callback = (data) => {
		this.setState(data);
	}

	handlePaginationChange = (index) => {
		console.log(index);
	}
	formatType = path => {
		return path === '/yqgl_list' ? 'instrument' : 'material'
	}
	formatTitle = type => {
		if (type === 'instrument') {
			return '仪器采购列表'
		}
		if (type === 'material') {
			return '耗材采购列表'
		}
	}
	render() {
		let {
			list,
			total,
			location,
			history
		} = this.props
		paginationConfig.total = total
		paginationConfig.onChange = this.handlePaginationChange
		let pagination = paginationConfig
		const type = this.formatType(location.pathname)
		return (
			<Layout style={{minHeight:'100%'}}>
	          <Content style={{ margin: '0 16px' }}>
	            <Breadcrumb style={{ margin: '12px 0' }}>
	              <Breadcrumb.Item>{this.formatTitle(type)}</Breadcrumb.Item>
	            </Breadcrumb>
	            <div style={{ padding: 24, background: '#fff', minHeight: '100%' }}>
	            	<SearchForm type={type} history={history}/>
					<RecordTable
						data={list}
						columns={procurementManagementColumns}
						handleRowRender = {handlePurchaseRowRender}
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
)(Purchase)