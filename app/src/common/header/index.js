import React, { Component } from 'react';
import { Menu } from "antd";
import "antd/dist/antd.css";
import './index.scss'
const { SubMenu } = Menu
class Header extends Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     current: 'mail'
  //   }
  // }
  state = {
    current: 'home'
  }
  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };
  render() {
    return (
      <div className="comm-header">
        <div className='wrap'>
          <div className='l'>
            踏浪汽车-后台管理
          </div>
          <div className='r'>
          </div>
        </div>
      </div>
    )
  }
}
export default Header;
