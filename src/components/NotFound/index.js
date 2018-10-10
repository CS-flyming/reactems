import React from 'react'
import './index.less'

class NotFound extends React.Component {
	componentWillMount() {
		document.title = "页面丢失了"
	}
	render() {
		return (
			<div className="not-found">
				<h1>404</h1>
			</div>
		)
	}
}

export default NotFound