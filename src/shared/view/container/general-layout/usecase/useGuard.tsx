import { Navigate } from 'react-router-dom';

interface useGuardI {
	children: React.ReactNode;
}
const GuardRoute = ({ children }: useGuardI) => {
	const token = JSON.parse(localStorage.getItem('token')!);

	if (token) {
		return children;
	}

	return <Navigate to={'/login'} />;
};

export default GuardRoute;
