import React from 'react';
import {
	Row,
	Col,
	Button
} from 'antd'
import {
	Link
} from 'react-router-dom'
export const rowStyle = {
	'margin': '20px 0'
}
export const colStyle = {
	'paddingRight': '40px',
	'maxHeight': '320px',
	'overflow': 'auto'
}


export const divStyle = {
	'padding': '5px 0'
}

const dspColStyle = {
	'paddingRight': '40px',
	'maxHeight': '160px',
	'overflow': 'auto'
}
const linkStyle = {
	padding: ' 0 10px'
}
export const fqExpColumns = [{
	title: '实验编号',
	dataIndex: 'sybh',
	key: 'sybh',
}, {
	title: '实验名称',
	dataIndex: 'name',
	key: 'name',
}, {
	title: '创建时间',
	dataIndex: 'cjsj',
	key: 'cjsj',
}, {
	title: '实验日期',
	dataIndex: 'syrq',
	key: 'syrq',
}]

export const teaYwcExpColumns = [{
	title: '实验编号',
	dataIndex: 'sybh',
	key: 'sybh',
}, {
	title: '实验名称',
	dataIndex: 'name',
	key: 'name',
}, {
	title: '创建时间',
	dataIndex: 'cjsj',
	key: 'cjsj',
}, {
	title: '实验日期',
	dataIndex: 'syrq',
	key: 'syrq',
}]
export const dspExpColumns = [{
	title: '实验编号',
	dataIndex: 'sybh',
	key: 'sybh',
}, {
	title: '实验名称',
	dataIndex: 'name',
	key: 'name',
}, {
	title: '创建时间',
	dataIndex: 'czsj',
	key: 'czsj',
}, {
	title: '学生姓名',
	dataIndex: 'xsname',
	key: 'xsname',
}, {
	title: '状态',
	dataIndex: 'syzt',
	key: 'syzt',
	render: syzt => formatExpStatus(syzt)
}]

export const formatExpStatus = zt => {
	switch (zt) {
		case 0:
			return '实验未启动'
		case 1:
			return '实验带接受'
		case 2:
			return '实验准备中'
		case 3:
			return '实验进行中'
		default:
			return '状态异常'
	}
}

export const handleRecordRender = (type, obj) => {
	if (type === 2) {
		return <div>
        <Row style={rowStyle}>
            <Col span={5} className="ant-form-item-label">
                  <div>操作方法：</div>
            </Col>
            <Col span={17} style={dspColStyle}>
                <div dangerouslySetInnerHTML={{__html:obj.czff}} style={divStyle}/>
            </Col>
            <Col span={2} >
                <Link to={{
        			pathname:'/article_detail/'+obj.id+'/czff',
        		}} style={linkStyle} target="_blank">查看详细</Link>
            </Col>
        </Row>
         <Row style={rowStyle}>
            <Col span={5} className="ant-form-item-label">
                <div>预期结果：</div>
            </Col>
            <Col span={17} style={dspColStyle}>
                <div dangerouslySetInnerHTML={{__html:obj.syxxjfx}} style={divStyle}/>
            </Col>
             <Col span={2}>
                <Link to={{
        			pathname:'/article_detail/'+obj.id+'/syxxjfx',
        		}} style={linkStyle} target="_blank">查看详细</Link>
            </Col>
        </Row>
      </div>
	}
	if (type === 3) {
		return <div>
        <Row style={rowStyle}>
            <Col span={5} className="ant-form-item-label">
                <div>操作方法：</div>
            </Col>
            <Col span={17} style={dspColStyle}>

                <div dangerouslySetInnerHTML={{__html:obj.czff}} style={divStyle}/>
            </Col>
            <Col span={2} >
                <Link to={{
        			pathname:'/article_detail/'+obj.id+'/czff',
        		}} style={linkStyle} target="_blank">查看详细</Link>
            </Col>
        </Row>
         <Row style={rowStyle}>
            <Col span={5} className="ant-form-item-label">
                <div>实验结果：</div>
            </Col>
            <Col span={17} style={dspColStyle}>

              	<div dangerouslySetInnerHTML={{__html:obj.syxxjfx}} style={divStyle}/>
            </Col>
            <Col span={2} >
                <Link to={{
        			pathname:'/article_detail/'+obj.id+'/syxxjfx',
        		}} style={linkStyle} target="_blank">查看详细</Link>
            </Col>
        </Row>
      </div>
	}
}

export const stuGdExpColumns = [{
	title: '学生姓名',
	dataIndex: 'xsname',
	key: 'xsname',
}, {
	title: '归档时间',
	dataIndex: 'gdsj',
	key: 'gdsj',
}, {
	title: '操作',
	key: 'action',
	render: (record) => createButtons(record)
}]

const createButtons = record => {
	return (
		<Button type="primary" >
			<Link to={{
				  pathname:'/gd_exp/'+record.syid
				}}>查看详情</Link>
		</Button>
	)
}