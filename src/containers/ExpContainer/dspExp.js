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
	Modal,
	Radio,
	message
} from 'antd'
import {
	paginationConfig,
	judgeKey
} from 'constants/constant'
import {
	dspExpColumns,
	handleRecordRender
} from './constant'
import RecordTable from 'components/RecordTable'
import * as expActionsCreators from 'actions/exp'
import './index.less'
const {
	Content
} = Layout
const FormItem = Form.Item
const RadioGroup = Radio.Group;
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
						<FormItem {...formItemLayout} label="实验编号">
				          {getFieldDecorator('sybh')(
				            <Input placeholder="实验编号" />
				          )}
				        </FormItem>
		          	</Col>
		          	<Col span={6}>
						<FormItem {...formItemLayout} label="实验名称">
				          {getFieldDecorator('name')(
				            <Input placeholder="实验名称" />
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

class NormalDspForm extends React.Component {
	state = {
		value: 0
	}
	onChange = (e) => {
		this.setState({
			value: e.target.value,
		});
	}
	render() {
		const {
			getFieldDecorator
		} = this.props.form
		const {
			syzt
		} = this.props
		return (
			<Form
		        className="ant-advanced-search-form"
		      	>
		        <Row gutter={40}>
					<Col span={24}>
						<FormItem {...formItemLayout} label="审批评语">
				          {getFieldDecorator('py')(
				            <Input placeholder="评语" />
				          )}
				        </FormItem>
		          	</Col>
		          	<Col span={24}>
						<FormItem {...formItemLayout} label="审批状态">
				          {getFieldDecorator('shjg',{
							rules:[{
								required:true,
								message:'请选择审批状态'
							}]
				          })(
				          (syzt&&syzt===2)?
					          	<RadioGroup onChange={this.onChange}>
							        <Radio value={0}>驳回</Radio>
							        <Radio value={1}>通过</Radio>
							    </RadioGroup>:
								<RadioGroup onChange={this.onChange}>
							        <Radio value={0}>继续实验</Radio>
							        <Radio value={2}>完成实验</Radio>
							    </RadioGroup>
				          )}
				        </FormItem>
		          	</Col>
		        </Row>
		     </Form>

		)
	}
}

const DspForm = Form.create()(NormalDspForm)

class ExpDspModel extends React.Component {
	state = {
		modalVisible: false,
		expInfo: '',
		spInfo: ''
	}
	setModalVisible(modalVisible) {
		this.setState({
			modalVisible
		});
	}
	handleOk = (e) => {
		let {
			validateFields
		} = this.refs.dspForm.getForm()
		const approveUrl = '/lsspController.do?pssy'
		validateFields((err, values) => {
			if (!err) {
				values.id = this.state.spInfo.id
				values.syzt = this.state.expInfo.syzt
				expActionsCreators.getApproveExp(approveUrl, values).then(res => {
					if (res.data && res.data.status) {
						this.setModalVisible(false)
						message.success(res.data.msg);
					} else {
						message.error((res.data && res.data.msg) ? res.data.msg : '审核失败');
					}
				})
			}
		})

	}

	render() {
		return (
			<Modal
		          title={<h3>{this.state.expInfo.syzt===2?'实验准备记录':'实验报告记录'}</h3>}
		          wrapClassName="vertical-center-modal"
		          onOk={this.handleOk}
		          onCancel={() => this.setModalVisible(false)}
		          visible={this.state.modalVisible}
		          width={900}
		        >
		        {handleRecordRender(this.state.expInfo.syzt,this.state.spInfo)}
		        <DspForm syzt={this.state.expInfo.syzt} ref="dspForm" />
        	</Modal>
		)
	}
}

const listUrl = '/lsspController.do?syspList'

function mapStateToProps(state) {
	let {
		expDspList
	} = state.expreducer
	return {
		list: expDspList.list,
		total: expDspList.totalRecords
	}
}
class DspExp extends React.Component {
	constructor(props) {
		super(props);

		/**
		 * 设置分页
		 * @type {Number}
		 */

		this.expActionsCreators = bindActionCreators(expActionsCreators, this.props.dispatch)
		const has = judgeKey('action', dspExpColumns)
		if (!has) {
			dspExpColumns.push({
				title: '操作',
				key: 'action',
				render: (record) => this.createButtons(record)
			})
		}
	}
	componentWillMount() {
		this.expActionsCreators.getDspExp(listUrl)
	}

	createButtons(record) {
		return (<Button type="primary"  onClick={this.approve.bind(this,record)}>审批</Button>)
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
	 * 审批实验
	 * @param  {[type]} record [description]
	 * @return {[type]}        [description]
	 */
	approve = (record) => {
		let url = 'lsspController.do?hqsy'
		let data = {
			id: record.id,
			syzt: record.syzt
		}
		let expDspModel = this.refs.expDspModel
		expActionsCreators.getDspExpInfo(url, data).then(res => {
			expDspModel.setState({
				modalVisible: true,
				expInfo: record,
				spInfo: res.data.data
			})
		})
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
	              <Breadcrumb.Item>待审批的实验</Breadcrumb.Item>
	            </Breadcrumb>
	            <div style={{ padding: 24, background: '#fff', minHeight: '100%' }}>
	            	<SearchForm/>
					<RecordTable
						data={list}
						columns={dspExpColumns}
						pagination = {pagination}
						/>
	            </div>
	            <ExpDspModel ref="expDspModel"/>
	          </Content>
	         </Layout>
		);
	}
}

export default connect(
	mapStateToProps,
	// Implement map dispatch to props
)(DspExp)