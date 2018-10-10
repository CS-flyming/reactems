import React from 'react'
import {
	Layout,
	Breadcrumb,
	Form,
	Input,
	Button,
	Row,
} from 'antd'
import MyUpload from 'components/MyUpload'
import {
	UPLOAD_URL,
	formatFileName
} from 'constants/constant'
const FormItem = Form.Item
const {
	Content
} = Layout
const formItemLayout = {
	labelCol: {
		span: 4
	},
	wrapperCol: {
		span: 8
	},
}
const formTailLayout = {
	labelCol: {
		span: 4
	},
	wrapperCol: {
		span: 8,
		offset: 4
	},
}
const btnStyle = {
	marginLeft: 15
}
class NormalForm extends React.Component {

	check = () => {
		this.props.form.validateFields(
			(err, values) => {
				if (!err) {
					console.info('success', values, this.refs.fileRecordUpload)
				}
			},
		)
	}
	cancel = () => {
		this.props.history.goBack()
	}
	render() {
		const {
			getFieldDecorator,
		} = this.props.form
		const {
			defaultFileList,
			value
		} = this.props
		return (
			<div>
		        <FormItem {...formItemLayout} label="主题">
		          {getFieldDecorator('main', {
		            rules: [{
		              required: true,
		              message: '请输入主题',
		            }]
		          })(
		            <Input placeholder="请输入主题" />
		          )}
		        </FormItem>
		        <FormItem {...formItemLayout} label="内容">
		          {getFieldDecorator('text', {
		            rules: [{
		              required: true,
		              message: '请输入内容',
		            }]
		          })(
		            <Input placeholder="请输入内容" type="textarea" rows={10}/>
		          )}
		        </FormItem>
		         <FormItem {...formItemLayout} label="上传">
		            <MyUpload ref="fileRecordUpload" uploadUrl={UPLOAD_URL} defaultFileList={defaultFileList}/>
		        </FormItem>
		        <FormItem {...formTailLayout}>
		          <Button type="primary" onClick={this.check}>
		            立即创建
		          </Button>
		          <Button type="primary"style={btnStyle} onClick={this.cancel}>
		            取消
		          </Button>
		        </FormItem>
      		</div>
		)
	}
}


const FqMsgForm = Form.create()(NormalForm)

export class FqMsg extends React.Component {

	render() {
		return (
			<Layout style={{minHeight:'100%'}}>
	          <Content style={{ margin: '0 16px' }}>
	            <Breadcrumb style={{ margin: '12px 0' }}>
	              <Breadcrumb.Item>发送消息</Breadcrumb.Item>
	            </Breadcrumb>
	            <div style={{ padding: 24, background: '#fff', minHeight: '100%' }}>
	            	<Row >
						<FqMsgForm history={this.props.history}/>
					</Row>
	            </div>
	          </Content>
	         </Layout>
		)
	}
}

export default FqMsg