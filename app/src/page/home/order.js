import React, { Component } from 'react';
import './index.scss';
import { Table, Button, Input, Select, DatePicker, Modal, Form, Popconfirm, message } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment'
import 'moment/locale/zh-cn';
import axios from 'axios'
const { Option } = Select;
class Order extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      nameD: '',
      done: '',
      doneD: '',
      work: '',
      workD: '',
      visible: false,
      isEdit: false,
      editKey: null,
      orderList: []
    }
    this.formRef = React.createRef();
  }
  componentDidMount() {
    this.queryOrder()
  }
  // 查询列表
  queryOrder(params = '') {
    if (!params) {
      this.setState({
        name: '',
        nameD: '',
        done: '',
        doneD: '',
        work: '',
        workD: ''
      })
    }
    axios.post('/order/query', params)
      .then(res => {
        this.setState({
          orderList: res.data.data
        })
        message.success(res.data.msg);
      })
      .catch(err => {
        message.success(err.data.msg);
      })
  }
  onFinish(params) {
    if (this.state.isEdit) {
      if (!this.formRef.current.getFieldValue().done) {
        params.done = moment(new Date()).format('YYYY-MM-DD')
      } else {
        params.done = params.done.format('YYYY-MM-DD')
      }
      // 提交数据
      axios.post('/order/update', Object.assign(params, { orderID: this.state.editKey }))
        .then(res => {
          message.success(res.data.msg);
          this.queryOrder()
        })
        .catch(err => {
          message.success(err.data.msg);
        })
      this.setState({
        isEdit: false,
      });
    } else {
      if (!this.formRef.current.getFieldValue().done) {
        params.done = moment(new Date()).format('YYYY-MM-DD')
      } else {
        params.done = params.done.format('YYYY-MM-DD')
      }
      params.price = Number(params.price).toFixed(2)
      // 提交数据
      axios.post('/order/add', params)
        .then(res => {
          message.success(res.data.msg);
          this.queryOrder()
        })
        .catch(err => {
          message.success(err.data.msg);
        })
    }
    this.hideModal()
  }
  deleteOrd(key) {
    // 提交数据
    axios.post('/order/dalete', { orderID: key })
      .then(res => {
        message.success(res.data.msg);
        this.queryOrder()
      })
      .catch(err => {
        message.success(err.data.msg);
      })
  }
  // 新增订单
  addOrd() {
    this.setState({
      visible: true,
    });
  }
  // 编辑订单
  editOrd(text, record) {
    this.setState({
      visible: true,
      isEdit: true,
      editKey: text.orderID
    });
    setTimeout(() => {
      console.log(moment(text.done).format('YYYY-MM-DD'))
      this.formRef.current.setFieldsValue({
        name: text.name,
        work: text.work,
        done: moment(text.done),
        detail: text.detail,
        price: text.price
      })
    }, 200);
  }
  // 查询
  query() {
    let params = {
      name: this.state.name,
      done: this.state.done,
      work: this.state.work,
    }
    this.queryOrder(params)
  }
  // 重置
  reset() {
    this.setState({
      name: '',
      nameD: '',
      done: '',
      doneD: '',
      work: '',
      workD: ''
    })
    this.queryOrder()
  }

  hideModal = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
    const columns = [
      { title: '车牌号', dataIndex: 'name', orderID: 'name', width: '10%' },
      { title: '事项', dataIndex: 'work', orderID: 'work', width: '10%' },
      { title: '完成日期', dataIndex: 'done', orderID: 'done', width: '13%' },
      { title: '工作详情', dataIndex: 'detail', orderID: 'detail', width: '57%' },
      {
        title: '操作',
        dataIndex: '',
        orderID: 'x',
        width: '10%',
        render: (text, record) =>
          <div>
            <a onClick={() => this.editOrd(text, record)} style={{ marginRight: 10 }}>编辑</a>
            <Popconfirm title="确认删除该订单?" onConfirm={() => this.deleteOrd(record.orderID)}>
              <a>删除</a>
            </Popconfirm>
          </div>,
      },
    ];
    return (
      <div className='order-content'>
        <div className='order-header'>
          <div className='item'>
            <Input value={this.state.nameD} placeholder="车牌号" onChange={(e) => this.setState({ name: e.target.value, nameD: e.target.value })} />
            <DatePicker value={this.state.doneD} onChange={(e, dateString) => this.setState({ done: dateString, doneD: moment(dateString) })} locale={locale} placeholder="日期" style={{ marginRight: 10, width: 150 }} />
            <Select value={this.state.workD} onChange={(work) => this.setState({ work: work, workD: work, })} placeholder="custom dropdown render" style={{ width: 150 }}>
              <Option value="">请选择</Option>
              <Option value="保养">保养</Option>
              <Option value="维修">维修</Option>
              <Option value="做漆">做漆</Option>
            </Select>
            <Button onClick={() => this.query()} type="primary" style={{ marginLeft: 10 }}>查询</Button>
            <Button onClick={() => this.reset()} type="primary" style={{ marginLeft: 10 }}>重置</Button>
          </div>
          <div className='item'>
            <Button onClick={() => this.addOrd()} type="primary" style={{ marginLeft: 10, background: '#7cb305', borderColor: '#7cb305' }}>添加</Button>
          </div>
        </div>

        <Table
          columns={columns}
          expandable={{
            // expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
            rowExpandable: record => record.name !== 'Not Expandable',
          }}
          dataSource={this.state.orderList}
        />
        <Modal
          title="添加订单"
          visible={this.state.visible}
          onCancel={this.hideModal}
          destroyOnClose={true}
          footer={null}
        >
          <Form ref={this.formRef} name="control-ref" onFinish={(params) => this.onFinish(params)}>
            <Form.Item name="name">
              <Input placeholder="车牌号" style={{ marginBottom: 20 }} />
            </Form.Item>
            <Form.Item name="price">
              <Input placeholder="金额" style={{ marginBottom: 20 }} />
            </Form.Item>
            <Form.Item name="done">
              <DatePicker defaultValue={moment()} locale={locale} placeholder="日期" style={{ marginBottom: 20, width: '100%' }} />
            </Form.Item>
            <Form.Item name="work">
              <Select placeholder="工作事项" style={{ marginBottom: 20, width: '100%' }}>
                <Option value="保养">保养</Option>
                <Option value="维修">维修</Option>
                <Option value="做漆">做漆</Option>
              </Select>
            </Form.Item>
            <Form.Item name="detail">
              <Input.TextArea placeholder="工作详情" />
            </Form.Item>
            <Form.Item style={{ textAlign: 'right' }}>
              <Button htmlType="button" onClick={() => this.hideModal()}>
                取消
              </Button>
              <Button type="primary" htmlType="submit" style={{ marginLeft: 20 }}>
                确认
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div >
    )
  }
}

export default Order
