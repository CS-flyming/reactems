import React from 'react'
import {
	Layout,
	Breadcrumb,
	Form,
	Input,
	Button,
	Row,
} from 'antd'

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
			value
		} = this.props
		return (
			<div>
		        <FormItem {...formItemLayout} label="学校名称">
		          {getFieldDecorator('name', {
		            rules: [{
		              required: true,
		              message: '请输入学校名称',
		            }],
		            initialValue:value?value.name:''
		          })(
		            <Input placeholder="请输入学校名称" />
		          )}
		        </FormItem>
		        <FormItem {...formItemLayout} label="学校编码">
		          {getFieldDecorator('bm', {
		            rules: [{
		              required: true,
		              message: '请输入学校编码',
		            }],
		            initialValue:value?value.bm:''
		          })(
		            <Input placeholder="请输入学校编码" />
		          )}
		        </FormItem>
		        <FormItem {...formItemLayout} label="可开通账号数">
		          {getFieldDecorator('rs', {
		            rules: [{
		              required: true,
		              message: '请输入可开通账号数',
		            },{
	            		validator:(rule, value, callback)=>{
							let flag = /^[1-9]\d*$/.test(value)
							if(!flag){
								callback('请输入可开通账号数')
							}
	            		}
		            }],
		            initialValue:value?value.rs:''
		          })(
		            <Input placeholder="请输入可开通账号数" type="number"/>
		          )}
		        </FormItem>
		        <FormItem {...formItemLayout} label="账号有效天数">
		          {getFieldDecorator('qx', {
		            rules: [{
		              required: true,
		              message: '账号有效天数',
		            },{
	            		validator:(rule, value, callback)=>{
							let flag = /^[1-9]\d*$/.test(value)
							if(!flag){
								callback('请输入账号有效天数')
							}
	            		}
		            }],
		            initialValue:value?value.qx:''
		          })(
		            <Input placeholder="请输入账号有效天数" type="number"/>
		          )}
		        </FormItem>
		        <FormItem {...formTailLayout}>
		          <Button type="primary" onClick={this.check}>
		            {value?'立即保存':'立即创建'}
		          </Button>
		          <Button type="primary"style={btnStyle} onClick={this.cancel}>
		            取消
		          </Button>
		        </FormItem>
      		</div>
		)
	}
}


const AddAccountForm = Form.create()(NormalForm)

export class AddSchool extends React.Component {

	render() {
		const {
			state
		} = this.props.location
		return (
			<Layout style={{minHeight:'100%'}}>
	          <Content style={{ margin: '0 16px' }}>
	            <Breadcrumb style={{ margin: '12px 0' }}>
	              <Breadcrumb.Item>{state?'编辑学校':'添加学校'}</Breadcrumb.Item>
	            </Breadcrumb>
	            <div style={{ padding: 24, background: '#fff', minHeight: '100%' }}>
	            	<Row >
						<AddAccountForm  value={state} history={this.props.history}/>
					</Row>
	            </div>
	          </Content>
	         </Layout>
		)
	}
}

export default AddSchool