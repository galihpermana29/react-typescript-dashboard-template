import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const LoadingHandler = ({
	children,
	isLoading,
}: {
	children: React.ReactNode;
	isLoading: boolean;
}) => {
	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-[150px]">
				<Spin
					indicator={
						<LoadingOutlined style={{ fontSize: 24, color: '#F76A8B' }} spin />
					}
				/>
			</div>
		);
	}
	return children;
};

export default LoadingHandler;
