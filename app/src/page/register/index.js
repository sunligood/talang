import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Form, Row, Col, Input, Button } from 'antd';
import "antd/dist/antd.css";
import Header from '../../common/header/index'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      name: '1'
    }
  }
  render() {
    const onFinish = values => {
      console.log('Success:', values);
    };
    return (
      <div className='content'>
        <div className='login-form'>
          <Form onFinish={onFinish}>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input placeholder="username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password visibilityToggle={false} placeholder="password" />
            </Form.Item>
            <Row gutter={6}>
              <Col span={14}>
                <Form.Item
                  name="code"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your code!',
                    },
                  ]}
                  rules={[{ required: true, message: 'Please input your code' }]}
                >
                  <Input placeholder="code" />
                </Form.Item>
              </Col>
              <Col span={10}>
                <img src={require('../../../public/logo.png')} width='100%' height='32px' />
              </Col>
            </Row>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>注册</Button>
            </Form.Item>
          </Form>

        </div>
      </div>
    )
  }
}
ReactDOM.render(
  <React.StrictMode>
    <Header />
    <Register />
  </React.StrictMode>,
  document.getElementById('root')
);
