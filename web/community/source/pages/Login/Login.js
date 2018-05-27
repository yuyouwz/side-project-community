import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
import '../../assets/css/common/index.less';
import './Login.less';
class Login extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="ant-row login-container">
				<div className="login-wrap">
					<div className="title">
						<i className="iconfont icon-expressionicon logo" />
						<span className="name">yuyou社区</span>
						<Form onSubmit={this.handleSubmit} className="login-form">
							<FormItem>
								{getFieldDecorator('userName', {
									rules: [{ required: true, message: 'Please input your username!' }],
								})(
									<Input prefix={<Icon type="user" autoComplete="off" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
								)}
							</FormItem>
							<FormItem>
								{getFieldDecorator('password', {
									rules: [{ required: true, message: 'Please input your Password!' }],
								})(
									<Input prefix={<Icon type="lock" autoComplete="off" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
								)}
							</FormItem>
							<FormItem>
								<Button type="primary" htmlType="submit" className="login-form-button">
									登录
              </Button>
							</FormItem>
						</Form>
					</div>
				</div>

			</div>
		)
	}
}
const WrappedNormalLoginForm = Form.create()(Login);

export default WrappedNormalLoginForm;