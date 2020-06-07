import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Header from '../../common/header/index'
import Order from './order.js'
import { Menu } from 'antd';

class Home extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div className='content'>
				<div className='l'>
					<Menu
						defaultSelectedKeys={['1']}
						defaultOpenKeys={['sub1']}
						mode="inline"
					>
						<Menu.Item key="1">订单列表</Menu.Item>
					</Menu>
				</div>
				<div className='r'>
					<Order></Order>
				</div>
			</div>
		)
	}
}
ReactDOM.render(
	<React.StrictMode>
		<Header />
		<Home />
	</React.StrictMode>,
	document.getElementById('root')
);
