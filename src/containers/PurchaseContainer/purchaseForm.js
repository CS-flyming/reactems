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

	formatText = type => {
		if (type === 'instrument') {
			return '仪器'
		}
		if (type === 'material') {
			return '耗材'
		}
	}
	render() {
		const {
			getFieldDecorator,
		} = this.props.form
		const {
			type
		} = this.props
		return (
			<div>
		        <FormItem {...formItemLayout} label="名称">
		          {getFieldDecorator('name', {
		            rules: [{
		              required: true,
		              message: '请输入'+this.formatText(type)+'名称',
		            }]
		          })(
		            <Input placeholder={'请输入'+this.formatText(type)+'名称'} />
		          )}
		        </FormItem>
		        <FormItem {...formItemLayout} label="单价(元)">
		          {getFieldDecorator('dj', {
		            rules: [{
		              required: true,
		              message: '请输入'+this.formatText(type)+'单价',
		            },{
	            		validator:(rule, value, callback)=>{
							let flag = /^[0-9]+(.[0-9]{0,2})?$/.test(value)
							if(!flag){
								callback(new Error('单价最多两位小数'))
							}
	            		}
		            }]
		          })(
		            <Input placeholder={'请输入'+this.formatText(type)+'单价'} type="number"/>
		          )}
		        </FormItem>
				<FormItem {...formItemLayout} label="数量">
		          {getFieldDecorator('sl', {
		            rules: [{
		              required: true,
		              message: '请输入数量',
		            },{
	            		validator:(rule, value, callback)=>{
							let flag = /^[1-9]\d*$/.test(value)
							if(!flag){
								callback(new Error('请输入正整数'))
							}
	            		}
		            }]
		          })(
		            <Input placeholder="请输入数量" type="number"/>
		          )}
		        </FormItem>
		        <FormItem {...formItemLayout} label="供货商">
		          {getFieldDecorator('cgs', {
		            rules: [{
		              required: true,
		              message: '请输入供货商',
		            }]
		          })(
		            <Input placeholder="请输入供货商"/>
		          )}
		        </FormItem>
		        <FormItem {...formItemLayout} label="用途">
		          {getFieldDecorator('yt', {
		            rules: [{
		              required: true,
		              message: '请输入用途',
		            }]
		          })(
		            <Input placeholder="请输入用途"/>
		          )}
		        </FormItem>
		        <FormItem {...formItemLayout} label="规格">
		          {getFieldDecorator('gg', {
		            rules: [{
		              required: true,
		              message: '请输入规格',
		            }]
		          })(
		            <Input placeholder="请输入规格"/>
		          )}
		        </FormItem>
		        <FormItem {...formTailLayout}>
		          <Button type="primary" onClick={this.check}>
		            立即提交
		          </Button>
		          <Button type="primary"style={btnStyle} onClick={this.cancel}>
		            取消
		          </Button>
		        </FormItem>
      		</div>
		)
	}
}


const PurchaseApplyForm = Form.create()(NormalForm)

class PurchaseForm extends React.Component {
	render() {
		const {
			type
		} = this.props.match.params
		return (
			<Layout style={{minHeight:'100%'}}>
	          <Content style={{ margin: '0 16px' }}>
	            <Breadcrumb style={{ margin: '12px 0' }}>
	              <Breadcrumb.Item>{type==='instrument'?'发起仪器采购':'发起耗材采购'}</Breadcrumb.Item>
	            </Breadcrumb>
	            <div style={{ padding: 24, background: '#fff', minHeight: '100%' }}>
	            	<Row >
						<PurchaseApplyForm  history={this.props.history} type={type}/>
					</Row>
	            </div>
	          </Content>
	         </Layout>
		)
	}
}

export default PurchaseForm