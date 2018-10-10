import React from 'react'
import PropTypes from 'prop-types'
import {
  Link
} from 'react-router-dom'
import {
  Menu
} from 'antd';
let i = 1;
const SubMenu = Menu.SubMenu;

class Sider extends React.Component {
  static propTypes = {
    menu: PropTypes.arrayOf(PropTypes.object).isRequired
  }
  state = {
    current: '1',
    openKeys: [],
  }
  handleClick = (e) => {
    console.log('Clicked: ', e);
    this.setState({
      current: e.key
    });
  }
  onOpenChange = (openKeys) => {
    const state = this.state;
    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    this.setState({
      openKeys: nextOpenKeys
    });
  }
  getAncestorKeys = (key) => {
    const map = {

    };
    return map[key] || [];
  }
  render() {
    return (
      <Menu
        mode="inline"
        openKeys={this.state.openKeys}
        selectedKeys={[this.state.current]}
        style={{ height:'100%'}}
        onOpenChange={this.onOpenChange}
        onClick={this.handleClick}
      >
       {this.props.menu.map((item, index) => (
          <SubMenu key={'sub'+(index+1)} title={<span><span>{item.fistMenu.title}</span></span>}>
              {
                item.secondMenu.map((v, k) => {
                  i++
                  return (
                  <Menu.Item key={i}><Link to={v.path}>{v.title}</Link></Menu.Item>
                )
                })
              }
            </SubMenu>
        ))
      }
      </Menu>
    );
  }
}
export default Sider