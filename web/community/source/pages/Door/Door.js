import React, { Component } from 'react';
import { Layout, Row, Col, Menu } from 'antd';
const { Header, Content, Footer } = Layout;
import '../../assets/css/common/index.less';
import './Door.less';
class Door extends Component {
	constructor(props) {
		super(props);
	}
	render() {
	
		return (
			<div className="g-door">
				<Layout>
					<Header className="g-door-header">
						<Row type="flex" justify="center">
							<Col span={16}>
								<Menu
									theme="light"
									mode="horizontal"
									defaultSelectedKeys={['1']}
									className="g-door-nav"
								>
									<Menu.Item key="1">首页</Menu.Item>
									<Menu.Item key="2">技术栈</Menu.Item>
									<Menu.Item key="3">博客</Menu.Item>
									<Menu.Item key="4">游戏</Menu.Item>
									<Menu.Item key="5">论坛</Menu.Item>
								</Menu>
							</Col>
						</Row>
					</Header>
					<Content className="g-door-content">
						<Row>
							<Col xs={0} sm={0} md={0} lg={4} xl={4} xxl={3}>
								<div className="g-door-sider">
									侧边
									</div>
							</Col>
							<Col xs={24} sm={24} md={24} lg={16} xl={16} xxl={18}>
								<div className="g-door-center">
								</div>
							</Col>
							<Col xs={0} sm={0} md={0} lg={4} xl={4} xxl={3}>
								<div className="g-door-sider">
								</div>
							</Col>
						</Row>
					</Content>
					<Footer className="g-door-footer">
						create by octopusccc1@github
					</Footer>
				</Layout>
			</div>
		)
	}
}

export default Door;