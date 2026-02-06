import {
	parseISO,
	getYear,
	getMonth,
	startOfYear,
	endOfYear,
	eachMonthOfInterval,
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