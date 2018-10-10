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
  Row,
  Col,
  Form,
  Button,
  message
} from 'antd'
// 富文本编辑器
import CKEDITOR from 'ckeditor'
import ExpForm from 'components/ExpForm'
import {
  formfield,
  btnStyle,
  dateFormat
} from 'constants/constant'
import moment from 'moment'

const {
  Content
} = Layout
const FormItem = Form.Item

function mapStateToProps(state) {
  let {
    userInfo
  } = state
  return {
    userInfo: userInfo
  }
}
const rowStyle = {
  'margin': '20px 0'
}

const editorHeight = '320px'

class AddExp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentWillMount() {
    // if (this.xszt !== 4 && !this.timer) {
    //   this.timer = setInterval(
    //     () => {
    //       this.saveEditValue()
    //     },
    //     30000
    //   )
    // }
  }
  componentDidMount() {
    let {
      expInfo
    } = this.props.location.state ? this.props.location.state : {}
    let editor1 = CKEDITOR.replace('editor1', {
      height: editorHeight
    })
    let editor2 = CKEDITOR.replace('editor2', {
      height: editorHeight
    })
    if (expInfo && expInfo.synr) {
      editor1.setData(expInfo.synr)
    }
    if (expInfo && expInfo.yqjg) {
      editor2.setData(expInfo.yqjg)
    }
  }
  componentWillUnmount() {
    // if (this.xszt !== 4) {
    //   this.saveEditValue()
    // }
    // this.timer && clearTimeout(this.timer)
  }

  setEditValue = (text, type) => {
    if (type === 'czff') {
      let editor1 = CKEDITOR.instances.editor1
      debugger
      editor1.setData(text)
    }
    if (type === 'syjg') {
      let editor2 = CKEDITOR.instances.editor2
      editor2.setData(text)
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
    const {
      validateFields
    } = this.refs.expform.getForm()
    validateFields((err, values) => {
      if (!err) {
        let time = moment(values.syrq).format(dateFormat)
        values.syrq = time
        values.czff = czff_data
        values.syxxjfx = syjg_data
        if (!values.czff) {
          message.error('操作方法不能为空！', 2)
          return
        }
        if (!values.syxxjfx) {
          message.error('预期结果不能为空！', 2)
          return
        }
        console.log(values)
      }
    })
  }

  /**
   * useless
   * just for remove warning
   */
  handleChange = (e) => {
    console.log(e)
  }



  render() {
    let {
      expInfo
    } = this.props.location.state ? this.props.location.state : {}
    return (
      <Layout style={{minHeight:'100%'}}>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '12px 0' }}>
              <Breadcrumb.Item>发起实验</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: '100%' }}>
              <Breadcrumb>
                <Breadcrumb.Item>基本信息：</Breadcrumb.Item>
              </Breadcrumb>
                <ExpForm ref="expform"
                         formfield={formfield}
                         formData={expInfo}
                         show={(expInfo&&expInfo.sybh)?true:false}
                         canWrite={true}/>

                <Breadcrumb>
                    <Breadcrumb.Item>实验内容与预期结果：</Breadcrumb.Item>
                </Breadcrumb>
                <Row style={rowStyle}>
                  <FormItem required>
                      <Col span={2}>
                            <div>操作方法：</div>
                      </Col>
                      <Col span={22}>
                           <textarea name="czff" id="editor1" rows="10" cols="80" ref="editor1" placeholder="操作方法"  onChange={this.handleChange}></textarea>
                      </Col>
                  </FormItem>
                </Row>
                <Row style={rowStyle}>
                  <FormItem required>
                      <Col span={2}>
                            <div>预期结果</div>
                      </Col>
                      <Col span={22}>
                           <textarea name="syjg" id="editor2" rows="10" cols="80" ref="editor2" placeholder="实验结果"  onChange={this.handleChange}></textarea>
                      </Col>
                  </FormItem>
                </Row>
                 <Row>
                  <Col span={24} style={{ textAlign: 'right' }}>
                    <Button type="primary" onClick={this.handleSubmit}>提交</Button>
                    <Button type="primary" style={btnStyle} onClick={this.props.history.goBack}>取消</Button>
                  </Col>
                </Row>
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
)(AddExp)