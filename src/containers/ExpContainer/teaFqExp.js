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
	Table,
	Row,
	Col,
	Button,
	Modal
} from 'antd'
import {
	Link
} from 'react-router-dom'
import {
	paginationConfig,
	judgeKey
} from 'constants/constant'
import {
	fqExpColumns,
	formatExpStatus
} from './constant'
import RecordTable from 'components/RecordTable'
import * as expActionsCreators from 'actions/exp'
// import './index.less'
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
			            <Button type="primary" style={{marginLeft:8}}><Link to="/add_exp">添加新实验</Link></Button>
		          	</Col>
		        </Row>
		     </Form>

		)
	}
}

const SearchForm = Form.create()(NormalSearchForm)

class StuTableModel extends React.Component {
	constructor(props) {
		super(props)
		this.columns = [{
			title: '姓名',
			dataIndex: 'name',
			key: 'name',
		}, {
			title: '状态',
			dataIndex: 'zt',
			key: 'zt',
			render: zt => formatExpStatus(zt)
		}]
		this.pagination = {
			defaultCurrent: 1,
			pageSize: 5
		}
	}
	state = {
		modalVisible: false,
		stuList: []
	}
	setModalVisible(modalVisible) {
		this.setState({
			modalVisible
		});
	}
	render() {
		return (
			<Modal
		          title={<h3>实验学生</h3>}
		          wrapClassName="vertical-center-modal"
		          onCancel={() => this.setModalVisible(false)}
		          visible={this.state.modalVisible}
		          footer={null}
		          width={640}
		        >
	          <Table
	          		dataSource={this.state.stuList}
	          		columns={this.columns}
	          		rowKey="name"
	          		pagination={this.pagination}/>
        	</Modal>
		)
	}
}

const listUrl = '/fqsyController.do?list'
const btnStyle = {
	marginLeft: 8
}

function mapStateToProps(state) {
	let {
		expTeaFqList
	} = state.expreducer
	return {
		list: expTeaFqList.list,
		total: expTeaFqList.totalRecords
	}
}
class TeaFqExp extends React.Component {
	constructor(props) {
		super(props);

		/**
		 * 设置分页
		 * @type {Number}
		 */

		this.expActionsCreators = bindActionCreators(expActionsCreators, this.props.dispatch)
		const has = judgeKey('action', fqExpColumns)
		if (!has) {
			fqExpColumns.push({
				title: '操作',
				key: 'action',
				width: 350,
				render: (record) => this.createButtons(record)
			})
		}
	}
	componentWillMount() {
		this.expActionsCreators.getTeaFqExp(listUrl)
	}

	createButtons(record) {
		if (record.zt === 0) {
			return (<div>
				<Button  onClick={this.lookStu.bind(this,record)}>查看学生</Button>
				<Button  style={btnStyle} onClick={this.edit.bind(this,record)}>编辑</Button>
				<Button type="danger" style={btnStyle} onClick={this.delete.bind(this,record)}>删除</Button>
				<Button type="primary" style={btnStyle} onClick={this.startExp.bind(this,record)}>启动实验</Button>
			</div>)
		}
		return (<Button  onClick={this.lookStu.bind(this,record)}>查看学生</Button>)
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
	 * 编辑实验
	 * @param  {[type]} record [description]
	 * @return {[type]}        [description]
	 */
	edit = (record) => {
		const {
			history
		} = this.props

		history.push({
			pathname: '/add_exp',
			state: {
				expInfo: record
			}
		})
	}

	/**
	 * 删除实验
	 * @param  {[type]} record [description]
	 * @return {[type]}        [description]
	 */
	delete = (record) => {
		console.log(record);
	}

	/**
	 * 启动实验
	 * @param  {[type]} record [description]
	 * @return {[type]}        [description]
	 */
	startExp = (record) => {
		console.log(record);
	}

	/**
	 * 查看学生
	 * @param  {[type]} record [description]
	 * @return {[type]}        [description]
	 */
	lookStu = (record) => {
		let url = '/fqsyController.do?finduser'
		let data = {
			id: record.id
		}
		let stuTableModel = this.refs.stuTableModel
		expActionsCreators.getTeaFqExpStu(url, data).then(res => {
			stuTableModel.setState({
				modalVisible: true,
				stuList: res.data.data
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
	              <Breadcrumb.Item>发起实验</Breadcrumb.Item>
	            </Breadcrumb>
	            <div style={{ padding: 24, background: '#fff', minHeight: '100%' }}>
	            	<SearchForm/>
					<RecordTable
						data={list}
						columns={fqExpColumns}
						pagination = {pagination}
						/>
	            </div>
	            <StuTableModel ref="stuTableModel"/>
	          </Content>
	         </Layout>
		);
	}
}

export default connect(
	mapStateToProps,
	// Implement map dispatch to props
)(TeaFqExp)