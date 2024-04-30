import React, { useState } from 'react';

import { Layout, Menu, theme } from 'antd';
import UseGenerateItems from '../usecase/useGenerateItems';
import { Outlet } from 'react-router-dom';
import CustomHeader from './presentation/CustomHeader/CustomHeader';
import CustomLogoSidebar from './presentation/CustomLogoSidebar/CustomLogoSidebar';

const { Content, Footer, Sider } = Layout;

const RootLayout: React.FC = () => {
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	/**
	 * Generating items menu to rendered
	 * only show: true will be rendered
	 */
	const { items, handleClickMenu } = UseGenerateItems();

	return (
		// INFO: Can guard this layout or whatever routes use this layout by using <GuardRoute/>
		<Layout style={{ minHeight: '100vh' }}>
			<Sider
				theme="light"
				className=""
				collapsible
				collapsed={collapsed}
				onCollapse={(value) => setCollapsed(value)}>
				{/*
					    INFO: this is logo sidebar
          */}
				<CustomLogoSidebar />
				<Menu
					className="min-h-screen"
					theme="light"
					defaultSelectedKeys={['/home']}
					mode="inline"
					items={items}
					onClick={({ key }) => handleClickMenu(key)}
				/>
			</Sider>
			<Layout>
				{/* 
            INFO: This is the header/navigation bar
          */}
				<CustomHeader />
				<Content style={{ margin: '0 16px' }}>
					<div
						style={{
							padding: 24,
							minHeight: '100vh',
							borderRadius: borderRadiusLG,
							marginTop: 20,
							marginBottom: 20,
						}}>
						<Outlet />
					</div>
				</Content>
				<Footer style={{ textAlign: 'center', background: colorBgContainer }}>
					Template React Dashboard
				</Footer>
			</Layout>
		</Layout>
	);
};

export default RootLayout;
