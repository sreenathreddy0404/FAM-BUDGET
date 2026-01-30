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
import { months, categoryColors } from "@/utils/usefulFunctions";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => ({
	value: String(currentYear - i),
	label: String(currentYear - i),
}));

// Function to fetch expenses for a specific year
const fetchExpensesForYear = async (year) => {
	try {
		// Filter the mock data based on year
		const filteredData = allExpenses.filter((expense) => {
			const expenseDate = parseISO(expense.date);
			return expenseDate.getFullYear() === year;
		});

		// Simulate API delay
		await new Promise((resolve) => setTimeout(resolve, 300));

		return filteredData;
	} catch (error) {
		console.error("Error fetching expenses:", error);
		return [];
	}
};

// Function to get category data for pie chart for the entire year
const getCategoryData = (expenses) => {
	const categoryMap = {};

	expenses.forEach((expense) => {
		if (!categoryMap[expense.category]) {
			categoryMap[expense.category] = 0;
		}
		categoryMap[expense.category] += Number(expense.amount);
	});

	return Object.entries(categoryMap).map(([name, value]) => ({
		name,
		value: parseFloat(value.toFixed(2)),
		color: categoryColors[name] || "hsl(200, 70%, 50%)",
	}));
};

// Function to get member comparison data for the entire year
const getMemberData = (expenses) => {
	const memberMap = {};

	// Get all unique categories from expenses
	const allCategories = [
		...new Set(expenses.map((expense) => expense.category)),
	];

	// Initialize all members with all categories found
	expenses.forEach((expense) => {
		if (!memberMap[expense.member]) {
			memberMap[expense.member] = {
				name: expense.member,
				...Object.fromEntries(
					allCategories.map((category) => [category, 0]),
				),
			};
		}
		memberMap[expense.member][expense.category] += Number(expense.amount);
	});

	// Convert to array and format numbers
	return Object.values(memberMap).map((member) => {
		const formattedMember = { name: member.name };
		allCategories.forEach((category) => {
			formattedMember[category] = parseFloat(
				(member[category] || 0).toFixed(2),
			);
		});
		return formattedMember;
	});
};

// Function to get monthly spending data for the selected year
const getYearlyData = (selectedYear, expenses) => {
	const year = parseInt(selectedYear);
	const startDate = startOfYear(new Date(year, 0));
	const endDate = endOfYear(new Date(year, 11));
	const allMonths = eachMonthOfInterval({ start: startDate, end: endDate });

	const monthlyTotals = allMonths.map((month, index) => {
		const monthExpenses = expenses.filter((expense) => {
			const expenseDate = parseISO(expense.date);
			return (
				getYear(expenseDate) === year && getMonth(expenseDate) === index
			);
		});

		const total = monthExpenses.reduce(
			(sum, exp) => sum + Number(exp.amount),
			0,
		);

		return {
			month: months[index].label,
			monthIndex: index,
			amount: total,
			date: months[index].label, // For consistency
		};
	});

	return monthlyTotals;
};

// Function to get previous year total for comparison
const getPreviousYearTotal = (selectedYear, expenses) => {
	const prevYear = parseInt(selectedYear) - 1;
	const prevYearExpenses = expenses.filter((expense) => {
		const expenseDate = parseISO(expense.date);
		return getYear(expenseDate) === prevYear;
	});

	return prevYearExpenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
};

export const YearlySpendingChart = () => {
	const [selectedYear, setSelectedYear] = useState(String(currentYear));
	const [expenses, setExpenses] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	// Fetch expenses when year changes
	useEffect(() => {
		const loadExpenses = async () => {
			setIsLoading(true);
			const year = parseInt(selectedYear);
			const data = await fetchExpensesForYear(year);
			setExpenses(data);
			setIsLoading(false);
		};

		loadExpenses();
	}, [selectedYear]);

	const data = getYearlyData(selectedYear, expenses);
	const totalSpending = data.reduce((sum, d) => sum + d.amount, 0);
	const avgMonthly = data.length > 0 ? totalSpending / 12 : 0;
	const maxMonth = data.reduce(
		(max, d) => (d.amount > max.amount ? d : max),
		{ amount: 0, month: "" },
	);

	const minMonth = data.reduce(
		(min, d) => (d.amount < min.amount && d.amount > 0 ? d : min),
		{ amount: Infinity, month: "" },
	);

	const prevYearTotal = getPreviousYearTotal(selectedYear, expenses);
	const yearOverYearChange =
		prevYearTotal > 0
			? (((totalSpending - prevYearTotal) / prevYearTotal) * 100).toFixed(
					1,
				)
			: null;

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
					{yearOverYearChange !== null && (
						<p
							className={`text-sm mt-2 ${Number(yearOverYearChange) > 0 ? "text-destructive" : "text-success"}`}
						>
							{Number(yearOverYearChange) > 0 ? "+" : ""}
							{yearOverYearChange}% vs{" "}
							{parseInt(selectedYear) - 1}
						</p>
					)}
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

			{/* Monthly Spending Trend Area Chart */}
			<Areachart data={data} />

			{/* Category Breakdown */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4, delay: 0.4 }}
				className="card-elevated p-6"
			>
				<h2 className="text-lg font-semibold text-foreground mb-6">
					Spending by Category - {selectedYear}
				</h2>
				<Piechart
					categoryData={categoryData}
					totalSpending={totalSpending}
				/>
			</motion.div>

			{/* Member Comparison */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4, delay: 0.5 }}
				className="card-elevated p-6"
			>
				<h2 className="text-lg font-semibold text-foreground mb-6">
					Spending by Family Member - {selectedYear}
				</h2>
				<Barchart2
					memberData={memberData}
					categoryData={categoryData}
					barChartColors={categoryColors}
					year={selectedYear}
				/>
			</motion.div>
		</div>
	);
};
export default YearlySpendingChart;