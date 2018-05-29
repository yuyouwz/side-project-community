import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
const FormItem = Form.Item;
import '../../assets/css/common/index.less';
import './Login.less';
class Login extends Component {
	constructor(props) {
		super(props)
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				axios.get('http://localhost:3000/?name=1').then((res)=>{
					console.log(res)
					message.success('登录成功');
				})
				
			}
		});
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
								{getFieldDecorator('username', {
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
const WrappedNormalLoginForm = Form.create(
	{
		onFieldsChange(props, changedFields) {
			props.upDateLoginForm(changedFields)
		},
		mapPropsToFields(props) {
			const { fields } = props.login
			return {
				username: Form.createFormField({
					...fields.username
				}),
				password: Form.createFormField({
					...fields.password
				}),
			}
		}
	}
)(Login);

export default WrappedNormalLoginForm;