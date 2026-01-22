import React from "react";
import {Route, Routes} from "react-router-dom";

import Colors from "./pages/Colors.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import FamiliyMembers from "./pages/FamiliyMembers.jsx";
function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/colors" element={<Colors />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/family" element={<FamiliyMembers />} />
			</Routes>
		</div>
	);
}

export default App;
