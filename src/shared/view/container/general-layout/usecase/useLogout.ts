import { useNavigate } from 'react-router-dom';

const useLogout = () => {
	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.clear();
		navigate('/login');
	};

	return handleLogout;
};

export default useLogout;
