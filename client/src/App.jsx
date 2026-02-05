import React from "react";
import {Route, Routes} from "react-router-dom";

import Colors from "./pages/Colors.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import FamiliyMembers from "./pages/FamiliyMembers.jsx";
import AddExpense from "./pages/AddExpense.jsx";
import AllExpenses from "./pages/AllExpenses.jsx";
import Analytics from "./pages/Analytics.jsx";
import Auth from "./pages/Auth.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import SpendingHistory from "./pages/SpendingHistory.jsx";
import ProtectedLayout from "./components/layouts/ProtectedLayout.jsx";
import { Toaster } from "react-hot-toast";

function App() {
	return (
		<div className="App">
			<Toaster position="bottom-right" reverseOrder={false} />
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/colors" element={<Colors />} />
				<Route path="/auth" element={<Auth />} />
				
				<Route element={<ProtectedLayout/>}>
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/family" element={<FamiliyMembers />} />
					<Route path="/add-expense" element={<AddExpense />} />
					<Route path="/all-expenses" element={<AllExpenses />} />
					<Route path="/analytics" element={<Analytics />} />
					<Route path="/spending-history" element={<SpendingHistory />} />
					<Route path="*" element={<PageNotFound />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
