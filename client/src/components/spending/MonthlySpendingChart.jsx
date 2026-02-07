import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { allExpenses } from "@/dummyData/allExpensesData";
import Barchart1 from "./Barchart1";
import Piechart from "./Piechart";
import Barchart2 from "./Barchart2";
import {months,chartCategoryColors,getCategoryData,getMemberData,getMonthlyData} from "@/utils/usefulFunctions";
import { getExpensesByYearAndMonth } from "@/api/api";
import NoExpenses from "../ui/NoExpenses";

const currentYear = new Date().getFullYear();
export const years = Array.from({ length: 5 }, (_, i) => ({
	value: String(currentYear - i),
	label: String(currentYear - i),
}));

export const MonthlySpendingChart = () => {
	const [selectedMonth, setSelectedMonth] = useState(String(new Date().getMonth()),);
	const [selectedYear, setSelectedYear] = useState(String(currentYear));
	const [expenses, setExpenses] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	// Fetch expenses when month or year changes
	useEffect(() => {
		const loadExpenses = async () => {
			try {
				setIsLoading(true);
				const res = await getExpensesByYearAndMonth(Number(selectedYear),Number(selectedMonth));
				setExpenses(res.data.data);
			} catch (err) {
				console.error(err);
			} finally {
				setIsLoading(false);
			}
		};

		loadExpenses();
	}, [selectedMonth,selectedYear]);

	
	const data = getMonthlyData(selectedMonth, selectedYear, expenses);
	const totalSpending = data.reduce((sum, d) => sum + d.amount, 0);
	const avgDaily = data.length > 0 ? totalSpending / data.length : 0;
	const maxDay = data.reduce((max, d) => (d.amount > max.amount ? d : max), {amount: 0,date: "",});
	const categoryData = getCategoryData(expenses);
	const memberData = getMemberData(expenses);
	const monthShortForm = months[parseInt(selectedMonth)].label;
	if (isLoading) {
		return (
			<div className="card-elevated p-6">
				<div className="animate-pulse space-y-4">
					<div className="h-6 bg-muted rounded w-1/3"></div>
					<div className="h-72 bg-muted rounded"></div>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Filters */}
			<div className="flex flex-wrap gap-4">
				<Select value={selectedMonth} onValueChange={setSelectedMonth}>
					<SelectTrigger className="w-40">
						<SelectValue placeholder="Select month" />
					</SelectTrigger>
					<SelectContent>
						{months.map((month) => (
							<SelectItem key={month.value} value={month.value}>
								{month.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<Select value={selectedYear} onValueChange={setSelectedYear}>
					<SelectTrigger className="w-32">
						<SelectValue placeholder="Select year" />
					</SelectTrigger>
					<SelectContent>
						{years.map((year) => (
							<SelectItem key={year.value} value={year.value}>
								{year.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			{/* Summary Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}
					className="stat-card"
				>
					<p className="text-sm text-muted-foreground">
						Total Spending
					</p>
					<p className="text-3xl font-bold text-foreground mt-1">
						${totalSpending.toFixed(2)}
					</p>
					<p className="text-sm text-muted-foreground mt-2">
						{months[parseInt(selectedMonth)].label} {selectedYear}
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3, delay: 0.1 }}
					className="stat-card"
				>
					<p className="text-sm text-muted-foreground">
						Daily Average
					</p>
					<p className="text-3xl font-bold text-foreground mt-1">
						${avgDaily.toFixed(2)}
					</p>
					<p className="text-sm text-muted-foreground mt-2">
						Per day
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3, delay: 0.2 }}
					className="stat-card"
				>
					<p className="text-sm text-muted-foreground">
						Highest Spending Day
					</p>
					<p className="text-3xl font-bold text-foreground mt-1">
						${maxDay.amount.toFixed(2)}
					</p>
					<p className="text-sm text-muted-foreground mt-2">
						{maxDay.date || "No data"}
					</p>
				</motion.div>
			</div>

			{expenses.length == 0 && (
				<NoExpenses
					selectedYear={selectedYear}
					selectedMonth={monthShortForm}
				/>
			)}

			{expenses.length > 0 && (
				<>
					{/* Daily Spending Chart */}
					<Barchart1
						data={data}
						selectedYear={selectedYear}
						selectedMonth={monthShortForm}
					/>

					{/* Category Breakdown */}
					<Piechart
						categoryData={categoryData}
						totalSpending={totalSpending}
						selectedYear={selectedYear}
						selectedMonth={monthShortForm}
					/>

					{/* Member Comparison */}
					<Barchart2
						memberData={memberData}
						categoryData={categoryData}
						barChartColors={chartCategoryColors}
						selectedYear={selectedYear}
						selectedMonth={monthShortForm}
					/>
				</>
			)}
		</div>
	);
};