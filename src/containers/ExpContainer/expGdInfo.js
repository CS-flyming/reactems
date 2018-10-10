import React from 'react'
import {
  connect
} from 'react-redux'
import {
  bindActionCreators
} from 'redux'
import {
  Layout,
  Breadcrumb,
  Tabs,
  Row,
  Col,
  Spin
} from 'antd'
import ExpForm from 'components/ExpForm'
import RecordTable from 'components/RecordTable'
import {
  infoFormfield,
  expTableColumns
} from 'constants/constant'
import {
  getYwcExpDetail
} from 'actions/exp'
import {
  rowStyle,
  colStyle
} from './constant'
const {
  Content
} = Layout
const TabPane = Tabs.TabPane

function mapStateToProps(state) {
  let {
    userInfo,
    expreducer
  } = state
  return {
    userInfo: userInfo,
    expInfo: expreducer.expDetail
  }
}

const expGdUrl = '/xssyController.do?getgdList'

class ExpGdInfo extends React.Component {
  constructor(props) {
    super(props)
    this.getYwcExpDetail = bindActionCreators(getYwcExpDetail, this.props.dispatch)
  }

  componentWillMount() {
    let {
      id: userId
    } = this.props.userInfo
    let {
      id
    } = this.props.match.params
    let data = {
      id: id,
      userid: userId
    }
    this.getYwcExpDetail(expGdUrl, data)
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
      expInfo
    } = this.props
    if (expInfo.fqsy) {
      return (
        <Layout style={{minHeight:'100%'}}>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '12px 0' }}>
              <Breadcrumb.Item>已完成实验</Breadcrumb.Item>
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
                                  <div dangerouslySetInnerHTML={{__html:expInfo.fqsy.synr}} />
                            </Col>
                        </Row>
                         <Row style={rowStyle}>
                            <Col span={2}>
                                  <div>预期结果：</div>
                            </Col>
                            <Col span={22} style={colStyle}>
                                  <div dangerouslySetInnerHTML={{__html:expInfo.fqsy.yqjg}} />
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="实验准备" key="2">
                      <RecordTable data={expInfo.syzb} columns={expTableColumns} handleRowRender={this.handleRowRender.bind(this,'syzb')}/>
                    </TabPane>
                    <TabPane tab="实验记录" key="3">
                      <RecordTable data={expInfo.syjl} columns={expTableColumns} handleRowRender={this.handleRowRender.bind(this,'syjl')}/>
                    </TabPane>
                  </Tabs>
            </div>
          </Content>
      </Layout>
      )
    }
    return (
      <Layout style={{minHeight:'100%'}}>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '12px 0' }}>
              <Breadcrumb.Item>已完成实验</Breadcrumb.Item>
            </Breadcrumb>
            <div style=
                {{
                  padding: 24,
                  background: '#fff',
                  textAlign:'center',
                }}>
              <Spin tip="加载中..."/>
            </div>
          </Content>
      </Layout>
    )
  }
}
export default connect(
  mapStateToProps,
  // Implement map dispatch to props
)(ExpGdInfo)