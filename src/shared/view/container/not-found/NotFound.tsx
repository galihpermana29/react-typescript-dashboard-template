import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
	const navigate = useNavigate();
	return (
		<div className="border-2 h-screen flex flex-col justify-center px-[40px]">
			<div className="text-[30px]">Ouch!</div>
			<div className="text-[80px] font-extrabold">404: Not Found</div>
			<Button
				className="button-black h-[40px] w-[200px] mt-[20px]"
				onClick={() => navigate('/home')}>
				Go Back
			</Button>
		</div>
	);
};

export default NotFound;
