import { useState } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layouts/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MonthlySpendingChart } from "@/components/spending/MonthlySpendingChart";
import { YearlySpendingChart } from "@/components/spending/YearlySpendingChart";
import { Calendar, TrendingUp } from "lucide-react";

const SpendingHistory = () => {
	const [activeTab, setActiveTab] = useState("monthly");

	return (
		<AppLayout>
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-2xl lg:text-3xl font-bold text-foreground">
						Spending History
					</h1>
					<p className="text-muted-foreground mt-1">
						Track your spending patterns over time
					</p>
				</div>

				{/* Tabs */}
				<Tabs
					value={activeTab}
					onValueChange={setActiveTab}
					className="w-full"
				>
					<TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
						<TabsTrigger
							value="monthly"
							className="flex items-center gap-2"
						>
							<Calendar className="w-4 h-4" />
							Monthly
						</TabsTrigger>
						<TabsTrigger
							value="yearly"
							className="flex items-center gap-2"
						>
							<TrendingUp className="w-4 h-4" />
							Yearly
						</TabsTrigger>
					</TabsList>

					<TabsContent value="monthly">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
						>
							<MonthlySpendingChart />
						</motion.div>
					</TabsContent>

					<TabsContent value="yearly">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
						>
							<YearlySpendingChart />
						</motion.div>
					</TabsContent>
				</Tabs>
			</div>
		</AppLayout>
	);
};

export default SpendingHistory;
