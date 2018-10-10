import React from 'react'
import {
	connect
} from 'react-redux'
import {
	bindActionCreators
} from 'redux'
import * as expActionsCreators from 'actions/exp'
import {
	paginationConfig
} from 'constants/constant'

import {
	Layout,
	Breadcrumb,
	Table,
	Form,
	Row,
	Col,
	Input,
	Button
} from 'antd'

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

function mapStateToProps(state) {
	let {
		expStuIngList
	} = state.expreducer
	return {
		list: expStuIngList.list,
		total: expStuIngList.totalRecords
	}
}
class NormalSearchForm extends React.Component {
	handleSubmit = (e) => {
		e.preventDefault()
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values)
				this.props.searchfunc(values)
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
					<Col span={8}>
						<FormItem {...formItemLayout} label={'实验编号'}>
				          {getFieldDecorator('sybh')(
				            <Input placeholder="实验编号" />
				          )}
				        </FormItem>
		          	</Col>
		          	<Col span={8}>
						<FormItem {...formItemLayout} label={'实验名称'}>
				          {getFieldDecorator('name')(
				            <Input placeholder="实验名称" />
				          )}
				        </FormItem>
		          	</Col>
		          	<Col span={8}>
			            <Button type="primary" htmlType="submit">查询</Button>
			            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>清除</Button>
		          	</Col>
		        </Row>
		     </Form>

		)
	}
}

const SearchForm = Form.create()(NormalSearchForm)
const listUrl = '/xssyController.do?listjxz'
class Exp extends React.Component {
	constructor(props) {
		super(props)
		this.expActionsCreators = bindActionCreators(expActionsCreators, this.props.dispatch)
		this.columns = [{
			title: '实验编号',
			dataIndex: 'sybh',
			key: 'sybh'
		}, {
			title: '实验名称',
			dataIndex: 'name',
			key: 'name',
		}, {
			title: '实验日期',
			dataIndex: 'syrq',
			key: 'syrq',
		}, {
			title: '发起人',
			dataIndex: 'lsname',
			key: 'lsname',
		}, {
			title: '状态',
			dataIndex: 'xszt',
			key: 'xszt',
			render: text => {
				if (text === 3) {
					return '实验进行中'
				}
				if (text === 2) {
					return '实验准备中'
				}
			},
		}, {
			title: '操作',
			key: 'action',
			render: (text) => {
				if (text.xszt === 3) {
					return <Button type="primary" onClick={this.goExpInfo.bind(this,text.id,text.xszt)}>提交实验记录</Button>
				}
				if (text.xszt === 2) {
					return <Button type="primary" onClick={this.goExpInfo.bind(this,text.id,text.xszt)}>提交实验准备</Button>
				}

			},
		}]
	}
	componentWillMount() {
		this.expActionsCreators.getStuIngExp(listUrl)
	}
	handleSearch = (data) => {
		this.expActionsCreators.searchExp(data, listUrl)
	}
	goExpInfo = (params, xszt) => {
		let {
			history
		} = this.props
		expActionsCreators.getExpById(params, function(calldata) {
			if (calldata.status) {
				history.push(`/tjsyzb/${params}`, {
					expInfo: calldata,
					xszt: xszt
				})
			}
		})


	}
	onChange = (page, size) => {
		console.log(page, size)
		this.expActionsCreators.searchExp({
			page: page
		})
	}
	render() {
		/*分页配置*/
		let expPaConf = paginationConfig
		expPaConf.total = this.props.total ? this.props.total : 0
		expPaConf.onChange = this.onChange.bind(this, paginationConfig.pageSize)

		return (
			<Layout >
	          <Content style={{ margin: '0 16px' }}>
	            <Breadcrumb style={{ margin: '12px 0' }}>
	              <Breadcrumb.Item>正在进行的实验</Breadcrumb.Item>
	            </Breadcrumb>
	            <div style={{ padding: 24, background: '#fff'}}>
			      	<SearchForm searchfunc={this.expActionsCreators.searchExp.bind(this)}></SearchForm>
              	  	<Table columns={this.columns} dataSource={this.props.list} rowKey="id" pagination={paginationConfig}/>
	            </div>
	          </Content>
	        </Layout>

		)
	}
}

export default connect(
	mapStateToProps,
	// Implement map dispatch to props
)(Exp)