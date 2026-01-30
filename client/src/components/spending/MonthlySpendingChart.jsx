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
	format,
	parseISO,
	startOfMonth,
	endOfMonth,
	eachDayOfInterval,
	isSameDay,
} from "date-fns";
import { allExpenses } from "@/dummyData/allExpensesData";
import Barchart1 from "./Barchart1";
import Piechart from "./Piechart";
import Barchart2 from "./Barchart2";
import {months,categoryColors} from "@/utils/usefulFunctions";

const currentYear = new Date().getFullYear();
export const years = Array.from({ length: 5 }, (_, i) => ({
	value: String(currentYear - i),
	label: String(currentYear - i),
}));


// Function to fetch expenses for a specific month and year
const fetchExpensesForMonth = async (month, year) => {
	try {
		// For now, filter the mock data based on month and year
		const filteredData = allExpenses.filter((expense) => {
			const expenseDate = parseISO(expense.date);
			return (
				expenseDate.getMonth() === month &&
				expenseDate.getFullYear() === year
			);
		});

		// Simulate API delay
		await new Promise((resolve) => setTimeout(resolve, 300));

		return filteredData;
	} catch (error) {
		console.error("Error fetching expenses:", error);
		return [];
	}
};

// Function to get category data for pie chart
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

// Function to get member comparison data
const getMemberData = (expenses) => {
	const memberMap = {};
	
	// Get all unique categories from expenses
	const allCategories = [...new Set(expenses.map(expense => expense.category))];

	// Initialize all members with all categories found
	expenses.forEach((expense) => {
		if (!memberMap[expense.member]) {
			memberMap[expense.member] = {
				name: expense.member,
				...Object.fromEntries(allCategories.map(category => [category, 0]))
			};
		}
		memberMap[expense.member][expense.category] += Number(expense.amount);
	});

	// Convert to array and format numbers
	return Object.values(memberMap).map((member) => {
		const formattedMember = { name: member.name };
		allCategories.forEach(category => {
			formattedMember[category] = parseFloat((member[category] || 0).toFixed(2));
		});
		return formattedMember;
	});
};

// Function to get daily spending data for the selected month
const getMonthlyData = (selectedMonth, selectedYear, expenses) => {
	const month = parseInt(selectedMonth);
	const year = parseInt(selectedYear);
	const startDate = startOfMonth(new Date(year, month));
	const endDate = endOfMonth(new Date(year, month));
	const allDays = eachDayOfInterval({ start: startDate, end: endDate });

	const dailyTotals = allDays.map((day) => {
		const dayExpenses = expenses.filter((expense) => {
			const expenseDate = parseISO(expense.date); 
			return isSameDay(expenseDate, day);
		});

		const total = dayExpenses.reduce(
			(sum, exp) => sum + Number(exp.amount),
			0,
		);

		return {
			day: format(day, "d"),
			date: format(day, "MMM d"),
			amount: total,
		};
	});

	return dailyTotals;
};


export const MonthlySpendingChart = () => {
	const [selectedMonth, setSelectedMonth] = useState(String(new Date().getMonth()),);
	const [selectedYear, setSelectedYear] = useState(String(currentYear));
	const [expenses, setExpenses] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	// Fetch expenses when month or year changes
	useEffect(() => {
		const loadExpenses = async () => {
			setIsLoading(true);
			const month = parseInt(selectedMonth);
			const year = parseInt(selectedYear);
			const data = await fetchExpensesForMonth(month, year);
			setExpenses(data);
			setIsLoading(false);
		};

		loadExpenses();
	}, [selectedMonth, selectedYear]);

	
	const data = getMonthlyData(selectedMonth, selectedYear, expenses);
	const totalSpending = data.reduce((sum, d) => sum + d.amount, 0);
	const avgDaily = data.length > 0 ? totalSpending / data.length : 0;
	const maxDay = data.reduce((max, d) => (d.amount > max.amount ? d : max), {amount: 0,date: "",});
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

			{/* Daily Spending Chart */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4, delay: 0.3 }}
				className="card-elevated p-6"
			>
				<h2 className="text-lg font-semibold text-foreground mb-6">
					Daily Spending - {months[parseInt(selectedMonth)].label}{" "}
					{selectedYear}
				</h2>
				<Barchart1 data={data} />
			</motion.div>

			{/* Category Breakdown */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4, delay: 0.3 }}
				className="card-elevated p-6"
			>
				<h2 className="text-lg font-semibold text-foreground mb-6">
					Spending by Category
				</h2>
				<Piechart categoryData={categoryData} totalSpending={totalSpending} />
			</motion.div>

			{/* Member Comparison */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4, delay: 0.4 }}
				className="card-elevated p-6"
			>
				<h2 className="text-lg font-semibold text-foreground mb-6">
					Spending by Family Member
				</h2>
				<Barchart2 memberData={memberData} categoryData={categoryData} barChartColors={categoryColors} />
			</motion.div>
		</div>
	);
};