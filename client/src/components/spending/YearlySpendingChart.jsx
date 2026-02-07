import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	parseISO,
	getYear,
	getMonth,
	startOfYear,
	endOfYear,
	eachMonthOfInterval,
} from "date-fns";
import { allExpenses } from "@/dummyData/allExpensesData";
import Areachart from "./Areachart";
import Piechart from "./Piechart";
import Barchart2 from "./Barchart2";
import { chartCategoryColors, getCategoryData,getYearlyData,getMemberData } from "@/utils/usefulFunctions";
import { getExpensesByYear } from "@/api/api";
import NoExpenses from "../ui/NoExpenses";
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => ({
	value: String(currentYear - i),
	label: String(currentYear - i),
}));


export const YearlySpendingChart = () => {
	const [selectedYear, setSelectedYear] = useState(String(currentYear));
	const [expenses, setExpenses] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const loadExpenses = async () => {
			try {
			setIsLoading(true);
			const res = await getExpensesByYear(Number(selectedYear));
			setExpenses(res.data.data);
			} catch (err) {
			console.error(err);
			} finally {
			setIsLoading(false);
			}
		};

		loadExpenses();
	}, [selectedYear]);

	const data = getYearlyData(selectedYear, expenses);
	const totalSpending = data.reduce((sum, d) => sum + d.amount, 0);
	const avgMonthly = data.length > 0 ? totalSpending / 12 : 0;
	const maxMonth = data.reduce((max, d) => (d.amount > max.amount ? d : max),{ amount: 0, month: "" });
	const minMonth = data.reduce((min, d) => (d.amount < min.amount && d.amount > 0 ? d : min),{ amount: Infinity, month: "" },);

	const categoryData = getCategoryData(expenses);
	const memberData = getMemberData(expenses);

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
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3, delay: 0.1 }}
					className="stat-card"
				>
					<p className="text-sm text-muted-foreground">
						Monthly Average
					</p>
					<p className="text-3xl font-bold text-foreground mt-1">
						${avgMonthly.toFixed(2)}
					</p>
					<p className="text-sm text-muted-foreground mt-2">
						Per month
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3, delay: 0.2 }}
					className="stat-card"
				>
					<p className="text-sm text-muted-foreground">
						Highest Month
					</p>
					<p className="text-3xl font-bold text-foreground mt-1">
						${maxMonth.amount.toFixed(2)}
					</p>
					<p className="text-sm text-muted-foreground mt-2">
						{maxMonth.month || "No data"}
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3, delay: 0.3 }}
					className="stat-card"
				>
					<p className="text-sm text-muted-foreground">
						Lowest Month
					</p>
					<p className="text-3xl font-bold text-foreground mt-1">
						$
						{minMonth.amount === Infinity
							? "0.00"
							: minMonth.amount.toFixed(2)}
					</p>
					<p className="text-sm text-muted-foreground mt-2">
						{minMonth.amount === Infinity
							? "No data"
							: minMonth.month}
					</p>
				</motion.div>
			</div>

			{expenses.length == 0 && (
				<NoExpenses
					selectedYear={selectedYear}
				/>
			)}

			{expenses.length > 0 && (
				<>
					{/* Monthly Spending Trend Area Chart */}
					<Areachart data={data} />

					{/* Category Breakdown */}
					<Piechart
						categoryData={categoryData}
						totalSpending={totalSpending}
						selectedYear={selectedYear}
					/>

					{/* Member Comparison */}

					<Barchart2
						memberData={memberData}
						categoryData={categoryData}
						barChartColors={chartCategoryColors}
						selectedYear={selectedYear}
					/>
				</>
			)}
		</div>
	);
};
export default YearlySpendingChart;