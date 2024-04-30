import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Header } from 'antd/es/layout/layout';
import { useState } from 'react';
import useLogout from '../../../usecase/useLogout';

export default function CustomHeader() {
	{
		/**
		 * TODO:
		 *  Get user data if its stored on localstorage
		 */
	}
	// const admin = JSON.parse(localStorage.getItem('admin')!);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const handleLogout = useLogout();

	return (
		<div>
			<Header className="bg-white flex justify-end relative">
				<div
					className="flex gap-[10px] items-center cursor-pointer"
					onClick={() => setIsOpen(!isOpen)}>
					{/**
					 * TODO:
					 *  User name on header/navigation bar
					 */}
					{/* <h1 className="capitalize">{admin ? admin.name : '...'}</h1> */}

					<h1 className="capitalize">Template admin</h1>
					{isOpen ? <UpOutlined /> : <DownOutlined />}
				</div>
				{isOpen && (
					<div className="absolute top-[60px] z-[20] right-[2%] bg-white shadow-lg rounded-lg min-w-[150px] flex flex-col px-[10px]">
						<p
							className=" h-[50px] flex items-center cursor-pointer hover:text-blue-500"
							onClick={handleLogout}>
							Logout
						</p>
					</div>
				)}
			</Header>
		</div>
	);
}
