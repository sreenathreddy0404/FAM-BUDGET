import React from "react";
import Colors from "./pages/Colors.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import {Route, Routes} from "react-router-dom";
function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/colors" element={<Colors />} />
			</Routes>
		</div>
	);
}

export default App;
