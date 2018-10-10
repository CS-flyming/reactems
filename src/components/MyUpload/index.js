import React from 'react';
import PropTypes from 'prop-types'
import {
	Upload,
	Button,
	Icon
} from 'antd';

class MyUpload extends React.Component {
	static propTypes = {
		uploadUrl: PropTypes.string.isRequired,
		limit: PropTypes.number, //是否限制上传数默认一个文件
		defaultFileList: PropTypes.arrayOf(PropTypes.object)
	}


	constructor(props) {
		super(props)
		this.state = {
			fileList: props.defaultFileList ? props.defaultFileList : [],
		}
	}
	handleChange = (limit, info) => {
		let fileList = info.fileList;

		// 1. Limit the number of uploaded files
		//    Only to show two recent uploaded files, and old ones will be replaced by the new
		if (!limit) {
			fileList = fileList.slice(-1);
		} else {
			fileList = fileList.slice(-limit);
		}


		// 2. read from response and show file link
		fileList = fileList.map((file) => {
			if (file.response) {
				// Component will show file.url as link
				file.url = file.response.data;
			}
			return file;
		});

		// 3. filter successfully uploaded files according to response from server
		// fileList = fileList.filter((file) => {
		// 	if (file.response) {
		// 		return file.response.status === 'success';
		// 	}
		// 	return true;
		// });

		this.setState({
			fileList
		});
	}
	render() {
		const props = {
			action: this.props.uploadUrl,
			onChange: this.handleChange.bind(this, this.props.limit),
		};
		return (
			<Upload {...props} fileList={this.state.fileList}>
		        <Button>
		          <Icon type="upload" /> 上传文件
		        </Button>
		    </Upload>
		);
	}
}

export default MyUpload