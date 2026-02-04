import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = () => {
	const token = localStorage.getItem("token");

	// If no token, bounce them to login
	if (!token) {
		return <Navigate to="/auth" replace />;
	}

	// If token exists, render the child routes
	return (
        <main>
            <Outlet />
        </main>
	);
};
export default ProtectedLayout;