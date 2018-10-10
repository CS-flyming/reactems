import React from 'react';
import {
	connect
} from 'react-redux';
import {
	bindActionCreators
} from 'redux'
import {
	getExpBaseDetail
} from 'actions/exp'
import './index.less'

function mapStateToProps(state) {
	let {
		expDetail
	} = state.expreducer
	return {
		expDetail: expDetail
	}
}
const url = 'lsspController.do?hqsy'

export class ArticleDetail extends React.Component {

	constructor(props) {
		super(props);
		this.getExpBaseDetail = bindActionCreators(getExpBaseDetail, this.props.dispatch)
	}
	componentWillMount() {
		let {
			id,
			type
		} = this.props.match.params
		let data = {
			id: id
		}
		this.getExpBaseDetail(url, data)
		document.title = type === 'czff' ? "操作方法" : "预期结果或实验结果"
	}
	render() {
		let {
			type
		} = this.props.match.params
		return (
			<div dangerouslySetInnerHTML={{__html:this.props.expDetail[type]}} className="article-ct"/>
		);
	}
}

export default connect(
	mapStateToProps,
	// Implement map dispatch to props
)(ArticleDetail)