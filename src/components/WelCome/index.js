import React from 'react'
import {
	connect
} from 'react-redux'

import './index.less'

function mapStateToProps(state) {
	return {

	}
}

class WelCome extends React.Component {

	render() {
		return (
			<div className="welcome">
				<p>欢迎使用</p>
			</div>

		)
	}
}

export default connect(
	mapStateToProps,
	// Implement map dispatch to props
)(WelCome)