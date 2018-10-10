import React from 'react'
import {
  connect
} from 'react-redux'
import {
  Prompt
} from 'react-router'
import {
  Layout,
  Breadcrumb,
  Tabs,
  Row,
  Col,
  Form,
  Button,
  message,
} from 'antd'
// 富文本编辑器
import CKEDITOR from 'ckeditor'
import store from 'store'
import ExpForm from 'components/ExpForm'
import RecordTable from 'components/RecordTable'
import {
  infoFormfield,
  expTableColumns
} from 'constants/constant'

import {
  rowStyle,
  colStyle
} from './constant'
const {
  Content
} = Layout
const TabPane = Tabs.TabPane
const FormItem = Form.Item

function mapStateToProps(state) {
  let {
    userInfo
  } = state
  return {
    userInfo: userInfo
  }
}

const editorHeight = '320px'

class StuIngExp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentWillMount() {
    if (!this.timer) {
      this.timer = setInterval(
        () => {
          this.saveEditValue()
        },
        30000
      )
    }
  }
  componentDidMount() {
    CKEDITOR.replace('editor1', {
      height: editorHeight
    })
    CKEDITOR.replace('editor2', {
      height: editorHeight
    })
  }
  componentWillUnmount() {
    this.saveEditValue()
    this.timer && clearTimeout(this.timer)
  }

  saveEditValue = () => {
    let editor1 = CKEDITOR.instances.editor1
    let editor2 = CKEDITOR.instances.editor2
    let key = 'ems_user_bh_' + this.props.userInfo.bh
    let czff_data = editor1.getData()
    let syjg_data = editor2.getData()
    let storeObject = {
      czff: czff_data,
      syjg: syjg_data
    }
    store.set(key, storeObject)
  }
  setEditValue = (text, type, key) => {
    let storeText, storeObject
    if (text) {
      storeText = text
    } else {
      storeObject = store.get(key) && store.get(key)
      if (!storeObject) {
        return storeText
      }
      if (type === 'czff') {
        storeText = storeObject.czff ? storeObject.czff : ''
      } else if (type === 'syjg') {
        storeText = storeObject.syjg ? storeObject.syjg : ''
      } else {
        storeText = ''
      }
      return storeText
    }
    return {
      __html: storeText
    }
  }

  /**
   * 提交完成清除缓存
   * @return {[type]} [description]
   */
  clearTjsyStore = () => {

  }

  /**
   * submit func
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  handleSubmit = (syid, e) => {
    let editor1 = CKEDITOR.instances.editor1
    let editor2 = CKEDITOR.instances.editor2
    let czff_data = editor1.getData()
    let syjg_data = editor2.getData()
    let submitData = {
      czff: czff_data,
      syxxjfx: syjg_data,
      syid: syid
    }
    if (!submitData.czff) {
      message.error('操作方法不能为空！', 2)
      return
    }
    if (!submitData.syxxjfx) {
      message.error('预期结果不能为空！', 2)
      return
    }
    console.log(submitData)
  }

  /**
   * useless
   * just for remove warning
   */
  handleChange = (e) => {
    console.log(e)
  }

  /**
   * 表格展开
   * @return {[type]} [description]
   */
  handleRowRender = (type, obj) => {
    if (type === 'syzb') {
      return <div>
        <Row style={rowStyle}>
            <Col span={2}>
                  <div>操作方法：</div>
            </Col>
            <Col span={22} style={colStyle}>
                  <div dangerouslySetInnerHTML={{__html:obj.czff}} />
            </Col>
        </Row>
         <Row style={rowStyle}>
            <Col span={2}>
                  <div>预期结果：</div>
            </Col>
            <Col span={22} style={colStyle}>
                  <div dangerouslySetInnerHTML={{__html:obj.syxxjfx}} />
            </Col>
        </Row>
      </div>
    }
    if (type === 'syjl') {
      return <div>
        <Row style={rowStyle}>
            <Col span={2}>
                  <div>操作方法：</div>
            </Col>
            <Col span={22} style={colStyle}>
                  <div dangerouslySetInnerHTML={{__html:obj.czff}} />
            </Col>
        </Row>
         <Row style={rowStyle}>
            <Col span={2}>
                  <div>实验结果</div>
            </Col>
            <Col span={22} style={colStyle}>
                  <div dangerouslySetInnerHTML={{__html:obj.syxxjfx}} />
            </Col>
        </Row>
      </div>
    }
  }

  render() {
    let {
      expInfo,
      xszt
    } = this.props.location.state
    let key = 'ems_user_bh_' + this.props.userInfo.bh
    return (
      <Layout style={{minHeight:'100%'}}>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '12px 0' }}>
              <Breadcrumb.Item>实验进行中</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: '100%' }}>
              <Breadcrumb>
                <Breadcrumb.Item>基本信息：</Breadcrumb.Item>
              </Breadcrumb>
              <ExpForm ref="expform" formfield={infoFormfield} formData={expInfo.fqsy} show={true}/>
               <Breadcrumb>
                    <Breadcrumb.Item>文档记录：</Breadcrumb.Item>
                  </Breadcrumb>
                  <Tabs defaultActiveKey="1">
                    <TabPane tab="实验内容与预期结果" key="1">
                        <Row style={rowStyle}>
                            <Col span={2}>
                                  <div>实验内容：</div>
                            </Col>
                            <Col span={22} style={colStyle}>
                                  <div dangerouslySetInnerHTML={this.setEditValue(expInfo.fqsy.synr)} />
                            </Col>
                        </Row>
                         <Row style={rowStyle}>
                            <Col span={2}>
                                  <div>预期结果：</div>
                            </Col>
                            <Col span={22} style={colStyle}>
                                  <div dangerouslySetInnerHTML={this.setEditValue(expInfo.fqsy.yqjg)} />
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="实验准备" key="2">
                      <RecordTable data={expInfo.syzb} columns={expTableColumns} handleRowRender={this.handleRowRender.bind(this,'syzb')}/>
                    </TabPane>
                    {xszt===3?
                    <TabPane tab="实验记录" key="3">
                      <RecordTable data={expInfo.syjl} columns={expTableColumns} handleRowRender={this.handleRowRender.bind(this,'syjl')}/>
                    </TabPane>:''}
                  </Tabs>
                    <div>
                      <Breadcrumb style={{ margin: '20px 0' }}>
                        <Breadcrumb.Item>实验记录：</Breadcrumb.Item>
                      </Breadcrumb>
                      <Row style={rowStyle}>
                        <FormItem required>
                            <Col span={2}>
                                  <div>操作方法：</div>
                            </Col>
                            <Col span={22}>
                                 <textarea name="czff" id="editor1" rows="10" cols="80" ref="editor1" placeholder="操作方法" value={this.setEditValue('','czff',key)} onChange={this.handleChange.bind(this)}></textarea>
                            </Col>
                        </FormItem>
                      </Row>
                      <Row style={rowStyle}>
                        <FormItem required>
                            <Col span={2}>
                                  <div>{xszt===2?'预期结果：':'实验结果：'}</div>
                            </Col>
                            <Col span={22}>
                                 <textarea name="syjg" id="editor2" rows="10" cols="80" ref="editor2" placeholder="实验结果" value={this.setEditValue('','syjg',key)} onChange={this.handleChange.bind(this)}></textarea>
                            </Col>
                        </FormItem>
                      </Row>
                       <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                          <Button type="primary" onClick={this.handleSubmit.bind(this,expInfo.id)}>提交</Button>
                        </Col>
                      </Row>
                    </div>
            </div>
          </Content>
            <Prompt
              message="你确定要离开吗？"
            />
      </Layout>
    )
  }
}
export default connect(
  mapStateToProps,
  // Implement map dispatch to props
)(StuIngExp)