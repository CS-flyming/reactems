import React from 'react'
import {
	connect
} from 'react-redux'
import {
	bindActionCreators
} from 'redux'
import * as newsActionsCreators from 'actions/news'
import {
	Layout,
	Breadcrumb,
	Collapse,
	Button
} from 'antd'

import './index.less'
const {
	Content
} = Layout

const Panel = Collapse.Panel

function mapStateToProps(state) {
	let {
		msg
	} = state.msgreducer
	return {
		list: msg.list,
		total: msg.totalRecords
	}
}
const listUrl = '/msgController.do?listjs'
const CollapseHeader = (item, callback) => (
	<div>
		<span>{item.main}</span>
		<div className="new-info">
			<span>{item.fqr}</span>
			<span>{item.dqsj}</span>
			<Button type="danger" onClick={callback}>删除</Button>
		</div>	
	</div>
)
export class MsgList extends React.Component {

	constructor(props) {
		super(props)
		this.newsActionsCreators = bindActionCreators(newsActionsCreators, this.props.dispatch)
	}

	componentWillMount() {
		this.newsActionsCreators.getMsgList(listUrl)
	}


	test = () => {
		console.log(123)
	}
	showMsgList = () => {
		return (this.props.list ? this.props.list.map((item, key) => (
			<Panel header={CollapseHeader(item,this.test.bind(this))} key={key+1}>
		      <p>{item.text}</p>
		    </Panel>
		)) : '')
	}
	render() {
		return (
			<Layout >
	          <Content style={{ margin: '0 16px' }}>
	            <Breadcrumb style={{ margin: '12px 0' }}>
	              <Breadcrumb.Item>我的消息</Breadcrumb.Item>
	            </Breadcrumb>
	            <Collapse bordered={false}>
					{this.showMsgList()}
	            </Collapse>
	          </Content>
	        </Layout>
		)
	}
}

export default connect(
	mapStateToProps,
	// Implement map dispatch to props
)(MsgList)