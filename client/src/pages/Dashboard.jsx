import React, { useEffect,useState } from 'react'
import { motion } from 'framer-motion';
import { AppLayout } from '../components/layouts/AppLayout';
import StatCard from '../components/dashboard/StatCard';
import { statCardsData } from '../dummyData/dashboardData';
import MonthlySpendingChart from '../components/dashboard/MontlySpendingChart';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import FamilyDetails from '../components/dashboard/FamilyDetails';
import { getDashboardData, getExpensesByYear } from '@/api/api';
import {
	Wallet,
	CalendarDays,
	TrendingUp,
	History,
	Zap,
	BarChart3,
	Receipt,
	Users,
} from "lucide-react";

const Dashboard = () => {
	const [dashboardData, setDashboardData] = useState(null);
	const [expensesData,setExpensesData] = useState([]);

	useEffect(() => {
	const fetchData = async () => {
		const res = await getDashboardData();
		setDashboardData(res.data.data);

		const res2 = await getExpensesByYear(new Date().getFullYear());
		setExpensesData(res2.data.data);
	};
	fetchData();
	}, []);

	const statCardsData = dashboardData? [
		{ id: 1, label: "This Month Expenses", value: dashboardData["This Month Expenses"], icon: Wallet },
		{ id: 2, label: "Previous Month Expenses", value: dashboardData["Previous Month Expenses"], icon: History },
		{ id: 3, label: "This Year Expenses", value: dashboardData["This Year Expenses"], icon: TrendingUp },
		{ id: 4, label: "Previous Year Expenses", value: dashboardData["Previous Year Expenses"], icon: CalendarDays },
		{ id: 5, label: "Daily Average Expenses", value: dashboardData["Daily Average Expenses"], icon: Zap },
		{ id: 6, label: "Monthly Average Expenses", value: dashboardData["Monthly Average Expenses"], icon: BarChart3 },
		{ id: 7, label: "Total Transactions", value: dashboardData["Total Transactions"], icon: Receipt },
		{ id: 8, label: "Total Members", value: dashboardData["Total Members"], icon: Users },
		]
	: [];

	const recentExpenses = dashboardData?.recentExpenses || [];
	
  	return (
		<AppLayout>
			<div className="min-h-screen pt-10 lg:pt-0">
				<div className="mb-7">
					<motion.h2
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5,delay:0.5 }}
						className="text-2xl font-bold"
					>
						Welcome back! 👋
					</motion.h2>
					<p className="text-muted-foreground">
						Here's your family's spending overview for{" "}
						{new Date().toLocaleString("en-US", {
							month: "short",
							year: "numeric",
						})}
					</p>
				</div>

				{/* stats data can go here*/}
				<div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
					{statCardsData.map(
						({ id, label, value, icon }) => (
							<StatCard
								key={id}
								title={label}
								value={value}
								icon={icon}
							/>
						),
					)}
				</div>

				{/* Chart and recent transactions can go here */}
				<div className='mt-7 grid lg:grid-cols-2 md:grid-cols-1 gap-4'>
					<MonthlySpendingChart expensesData = {expensesData}/>
					<RecentTransactions expenses = {recentExpenses}/>
				</div>

				{/* Family Details */}
				<div className="mt-7">
					<FamilyDetails />
				</div>
			</div>
		</AppLayout>
  	);
}

export default Dashboard