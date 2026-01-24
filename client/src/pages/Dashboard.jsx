import React from 'react'
import { motion } from 'framer-motion';
import { CreditCard, TrendingUp, User, Wallet } from 'lucide-react';

import { AppLayout } from '../components/layouts/AppLayout';
import StatCard from '../components/dashboard/StatCard';
import { statCardsData } from '../dummyData/dashboardData';
import MonthlySpendingChart from '../components/dashboard/MontlySpendingChart';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import FamilyDetails from '../components/dashboard/FamilyDetails';

const Dashboard = () => {
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
				<div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4">
					{statCardsData.map(
						({ id, title, value, change, changeType, icon }) => (
							<StatCard
								key={id}
								title={title}
								value={value}
								change={change}
								changeType={changeType}
								icon={icon === "Wallet"? Wallet: icon === "TrendingUp"? TrendingUp: icon === "CreditCard"? CreditCard: icon === "Users"? User: null}
							/>
						),
					)}
				</div>

				{/* Chart and recent transactions can go here */}
				<div className='mt-7 grid lg:grid-cols-2 md:grid-cols-1 gap-4'>
					<MonthlySpendingChart />
					<RecentTransactions />
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