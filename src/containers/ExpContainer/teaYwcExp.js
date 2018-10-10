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
	Table
} from 'antd'

import {
	getTeacYwcExp
} from 'actions/exp'

import {
	paginationConfig,
} from 'constants/constant'
import RecordTable from 'components/RecordTable'
import {
	teaYwcExpColumns,
	stuGdExpColumns
} from './constant'
import './index.less'
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
				          {getFieldDecorator('sybh ')(
				            <Input placeholder="实验编号" />
				          )}
				        </FormItem>
		          	</Col>
		          	<Col span={6}>
						<FormItem {...formItemLayout} label={'实验名称'}>
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

function mapStateToProps(state) {
	let {
		expTeaYwcList
	} = state.expreducer
	return {
		list: expTeaYwcList.list,
		total: expTeaYwcList.totalRecords
	}
}
let teaYwcExpUrl = '/fqsyController.do?ywclist'
class TeaYwcExp extends React.Component {

	constructor(props) {
		super(props);
		this.getTeacYwcExp = bindActionCreators(getTeacYwcExp, this.props.dispatch)

	}
	componentWillMount() {
		this.getTeacYwcExp(teaYwcExpUrl)
	}


	handlePaginationChange = (index) => {
		console.log(index);
	}

	regArray = expArr => {
		let arr = []
		if (expArr) {
			for (let i of expArr) {
				i['fqsy']['userlist'] = i['userlist']
				arr.push(i['fqsy'])
			}
		}
		return arr
	}

	handleYwcExpRowRender = record => {
		return (
			<Table
				rowClassName={()=>("cym-stu-gdexp-row")}
				bordered
				columns={stuGdExpColumns}
				dataSource={record.userlist}
				rowKey="syid"/>
		)
	}
	render() {
		let {
			list,
			total,
		} = this.props
		paginationConfig.total = total
		paginationConfig.onChange = this.handlePaginationChange
		let pagination = paginationConfig
		return (
			<Layout style={{minHeight:'100%'}}>
	          <Content style={{ margin: '0 16px' }}>
	            <Breadcrumb style={{ margin: '12px 0' }}>
	              <Breadcrumb.Item>已完成的实验</Breadcrumb.Item>
	            </Breadcrumb>
	            <div style={{ padding: 24, background: '#fff', minHeight: '100%' }}>
	            	<SearchForm/>
					<RecordTable
						data={list?this.regArray(list):[]}
						columns={teaYwcExpColumns}
						handleRowRender = {this.handleYwcExpRowRender}
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
)(TeaYwcExp)