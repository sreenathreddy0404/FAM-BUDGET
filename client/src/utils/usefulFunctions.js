import {
	parseISO,
	getYear,
	getMonth,
	startOfYear,
	endOfYear,
	eachMonthOfInterval,
	startOfMonth,
	endOfMonth,
	eachDayOfInterval,
	format,
	isSameDay
} from "date-fns";


import { ShoppingBag, Utensils, Car, Zap, Film, ShoppingCart, HeartPulse, GraduationCap, MoreHorizontal } from "lucide-react";

export const categoryIcons = {
	Groceries: ShoppingCart,
	Dining: Utensils,
	Transport: Car,
	Utilities: Zap,
	Healthcare: HeartPulse,
	Entertainment: Film,
	Shopping: ShoppingBag,
	Education: GraduationCap,
	Other: MoreHorizontal,
};

export const categories = [
    { value: "Groceries", label: "Groceries"},
    { value: "Dining", label: "Dining"},
    { value: "Transport", label: "Transport"},
    { value: "Utilities", label: "Utilities"},
    { value: "Healthcare", label: "Healthcare"},
    { value: "Entertainment", label: "Entertainment"},
    { value: "Shopping", label: "Shopping"},
    { value: "Education", label: "Education"},
    { value: "Other", label: "Other"},
];

export const categoryColors = {
  	Groceries: "bg-green-100 text-green-600",
	Dining: "bg-orange-100 text-orange-600",
	Transport: "bg-blue-100 text-blue-600",
	Utilities: "bg-yellow-100 text-yellow-700",
	Healthcare: "bg-red-100 text-red-600",
	Entertainment: "bg-purple-100 text-purple-600",
	Shopping: "bg-pink-100 text-pink-600",
	Education: "bg-indigo-100 text-indigo-600",
	Other: "bg-gray-100 text-gray-600",
};

export const chartCategoryColors = {
  Groceries: "hsl(120, 60%, 45%)",
  Dining: "hsl(30, 80%, 50%)",
  Transport: "hsl(210, 70%, 45%)",
  Utilities: "hsl(45, 90%, 50%)",
  Healthcare: "hsl(0, 75%, 50%)",
  Entertainment: "hsl(270, 65%, 55%)",
  Shopping: "hsl(330, 70%, 55%)",
  Education: "hsl(240, 70%, 55%)",
  Other: "hsl(210, 10%, 55%)",
};

export const months = [
	{ value: "0", label: "Jan" },
	{ value: "1", label: "Feb" },
	{ value: "2", label: "Mar" },
	{ value: "3", label: "Apr" },
	{ value: "4", label: "May" },
	{ value: "5", label: "Jun" },
	{ value: "6", label: "Jul" },
	{ value: "7", label: "Aug" },
	{ value: "8", label: "Sep" },
	{ value: "9", label: "Oct" },
	{ value: "10", label: "Nov" },
	{ value: "11", label: "Dec" },
];

// Function to get monthly spending data for the selected year
export const getYearlyData = (selectedYear, expenses) => {
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
      amount: total
    };
  });

  return monthlyTotals;
};

// Function to get daily spending data for the selected month
export const getMonthlyData = (selectedMonth, selectedYear, expenses) => {
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

// Function to get member comparison data for the entire year
export const getMemberData = (expenses) => {
	const memberMap = {};

	// Get all unique categories from expenses
	const allCategories = [
		...new Set(expenses.map((expense) => expense.category)),
	];

	// Initialize all members with all categories found
	expenses.forEach((expense) => {
		if (!memberMap[expense.memberId.name]) {
			memberMap[expense.memberId.name] = {
				name: expense.memberId.name,
				...Object.fromEntries(
					allCategories.map((category) => [category, 0]),
				),
			};
		}
		memberMap[expense.memberId.name][expense.category] += Number(expense.amount);
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

// Function to get category data for pie chart for the entire year
export const getCategoryData = (expenses) => {
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
		color: chartCategoryColors[name] || "hsl(200, 70%, 50%)",
	}));
};