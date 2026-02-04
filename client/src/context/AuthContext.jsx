import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(localStorage.getItem("token") || null);
	const [username, setUsername] = useState(
		JSON.parse(localStorage.getItem("user")),
	);

	//save token to localStorage and state
	const login = (newToken, newUser) => {
		localStorage.setItem("token", newToken);
		localStorage.setItem("user", JSON.stringify(newUser));
		setToken(newToken);
		setUsername(newUser);
	};

	//Clear token and user data
	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		setToken(null);
		setUsername(null);
	};

	return (
		<AuthContext.Provider value={{ token, username, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
