import React from 'react';
import {
	connect
} from 'react-redux';
import {
	Layout,
	Breadcrumb,
	Row,
	Col,
	Select
} from 'antd'
import {
	bindActionCreators
} from 'redux'
import {
	getPurchaseAdmin
} from 'actions/purchase'
const {
	Content
} = Layout
const Option = Select.Option;
const adminUrl = '/cgController.do?find'

function mapStateToProps(state) {
	let {
		purchaseAdmin
	} = state.purchase
	return {
		hcArray: purchaseAdmin.hc,
		yqArray: purchaseAdmin.yq
	}
}

export class Setadmin extends React.Component {
	constructor(props) {
		super(props);
		this.getPurchaseAdmin = bindActionCreators(getPurchaseAdmin, this.props.dispatch)
	}
	state = {
		availableUser: [],
		yqSelected: '',
		hcSelected: ''
	}

	componentWillMount() {
		this.getPurchaseAdmin(adminUrl)
	}

	getAvailableUser = () => {
		if (!this.state.availableUser.length) {
			this.setState({
				availableUser: ['jack', 'lucy', 'benjieming']
			});
		}
	}

	handleChange = (value, type) => {
		if (type === 1) {
			this.setState({
				yqSelected: value
			});
		} else {
			this.setState({
				hcSelected: value
			});
		}
	}

	formatArrayName = names => {
		if (names) {
			return names.join('，')
		}
		return '暂无数据'
	}

	render() {
		return (
			<Layout style={{minHeight:'100%'}}>
	          <Content style={{ margin: '0 16px' }}>
	            <Breadcrumb style={{ margin: '12px 0' }}>
	              <Breadcrumb.Item>当前管理员</Breadcrumb.Item>
	            </Breadcrumb>
	            <div style={{ padding: 24, background: '#fff', minHeight: '100%' }}>
	            	<Row>
	            		<Col span={3}>仪器管理员：</Col>
	            		<Col span={19}>{this.formatArrayName(this.props.yqArray)}</Col>
	            	</Row>
	            	<Row>
	            		<Col span={3}>耗材管理员：</Col>
	            		<Col span={19}>{this.formatArrayName(this.props.hcArray)}</Col>
	            	</Row>
	            </div>
	            <Breadcrumb style={{ margin: '12px 0' }}>
	              <Breadcrumb.Item>仪器管理员</Breadcrumb.Item>
	            </Breadcrumb>
	            <div style={{ padding: 24, background: '#fff', minHeight: '100%' }}>
	            	<Row>
	            		<Select  
	            			style={{ width: 240 }} 
	            			onFocus={this.getAvailableUser} 
	            			onChange={(value)=>this.handleChange(value,1)}
	            			placeholder="请选择">
	            			{this.state.availableUser.map((v,k)=>{
	            				return <Option key={k} value={v}>{v}</Option>
	            			})}
					    </Select>
	            	</Row>
	            </div>
	            <Breadcrumb style={{ margin: '12px 0' }}>
	              <Breadcrumb.Item>耗材管理员</Breadcrumb.Item>
	            </Breadcrumb>
	            <div style={{ padding: 24, background: '#fff', minHeight: '100%' }}>
	            	<Row>
	            		<Select  
	            			style={{ width: 240 }} 
	            			onChange={(value)=>this.handleChange(value,2)}
	            			placeholder="请选择">
					      	{this.state.availableUser.map((v,k)=>{
	            				return <Option key={k} value={v}>{v}</Option>
	            			})}
					    </Select>
	            	</Row>
	            </div>
	          </Content>
	         </Layout>
		);
	}
}

export default connect(
	mapStateToProps,
	// Implement map dispatch to props
)(Setadmin)