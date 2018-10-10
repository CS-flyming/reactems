import React from 'react';
import {
	connect
} from 'react-redux';
import {
	Layout,
	Breadcrumb,
	Row
} from 'antd'
const {
	Content
} = Layout

function mapStateToProps(state) {
	return {

	};
}

export class AddAccount extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const {
			state
		} = this.props.location
		return (
			<Layout style={{minHeight:'100%'}}>
	          <Content style={{ margin: '0 16px' }}>
	            <Breadcrumb style={{ margin: '12px 0' }}>
	              <Breadcrumb.Item>{state?'编辑账号':'添加账号'}</Breadcrumb.Item>
	            </Breadcrumb>
	            <div style={{ padding: 24, background: '#fff', minHeight: '100%' }}>
	            	<Row >
						
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
)(AddAccount)