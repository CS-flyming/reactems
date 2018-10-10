import React from 'react';
import PropTypes from 'prop-types'
import {
	Table
} from 'antd'
class ExpRecordTable extends React.Component {
	static propTypes = {
		data: PropTypes.array,
		columns: PropTypes.array.isRequired,
		handleRowRender: PropTypes.func,
		pagination: PropTypes.object
	}

	render() {
		return (
			<Table
				columns={this.props.columns}
				dataSource={this.props.data}
				expandedRowRender={this.props.handleRowRender?record=>this.props.handleRowRender(record):false}
				rowKey="id"
				pagination={this.props.pagination?this.props.pagination:false}/>
		);
	}
}

export default ExpRecordTable