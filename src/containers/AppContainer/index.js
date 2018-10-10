import React from 'react'
import {
	connect
} from 'react-redux'
import {
	bindActionCreators
} from 'redux'
import {
	BrowserRouter as Router,
	Link
} from 'react-router-dom'
import ComSider from 'components/Sider'
import './index.less'
import * as navActionsCreators from 'actions'
import {
	routes,
	articleRoutes
} from '../../routes/route'
import {
	Layout,
	Icon,
	Menu,
	Dropdown,
	BackTop,
	// notification
} from 'antd';
//socket.io

const {
	Header,
	Content,
	Sider
} = Layout;
// const openNotificationWithIcon = (type, msg, desc, duration) => {
// 	notification[type]({
// 		message: msg,
// 		description: desc,
// 		duration: duration ? duration : 0,
// 	});
// };
const mapStateToProps = state => {
	let {
		nav,
		userInfo
	} = state
	return {
		nav: nav,
		userInfo: userInfo
	}
}
const menu = (
	<Menu>
    <Menu.Item>
      	<Link to="userinfo">个人中心</Link>
    </Menu.Item>
    <Menu.Item>
    	<Link to="logout">退出</Link>
    </Menu.Item>
  </Menu>
)
class AppContainer extends React.Component {

	constructor(props) {
		super(props)
		this.navActionsCreators = bindActionCreators(navActionsCreators, this.props.dispatch)
	}
	componentWillMount() {
		this.navActionsCreators.initReq(this.props.userInfo.bh)

	}

	render() {
		const {
			pathname
		} = this.props.location
		if (/\/article_detail/.test(pathname)) {
			return <Router>
				{articleRoutes}
			</Router>
		} else {
			return (
				<Router>
				<div className="app-ct">
					<Layout>
						<Header className="cym-nav-header">
						<span className="ems-title">实验室信息管理系统</span>
						<Dropdown overlay={menu}>
							<div className="ant-dropdown-link">
								<span className="ems-userinfo">
									<span>
										{this.props.userInfo.name}
									</span>
									<span>
										到期时间：{this.props.userInfo.dqsj}
									</span>
										<Icon className="cym-user-icon" type="user" />
								</span>
							</div>
						</Dropdown>
				        </Header>
				    <Layout >
				        <Sider className="cym-left-sider" width='240' ><ComSider menu={this.props.nav}/><div className="copyright-text"> Ems ©2017 Created by chenym1992</div></Sider>
				        <Content className="cym-content">
					        {routes}
				        </Content>
				      </Layout>
				    </Layout>
				    <BackTop>
				      	<div className="ant-back-top-inner">UP</div>
				    </BackTop>
				</div>
				</Router>
			)
		}
	}
}

export default connect(
	mapStateToProps,
)(AppContainer)