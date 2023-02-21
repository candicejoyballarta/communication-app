import { useLocation, Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
	const user = JSON.parse(localStorage.getItem('loggedIn'));
	const location = useLocation();

	return user ? (
		<Outlet />
	) : (
		<Navigate to='/welcome' state={{ from: location }} replace />
	);
};

export default ProtectedRoutes;
