import {
	parseISO,
	getYear,
	getMonth,
	startOfYear,
	endOfYear,
	eachMonthOfInterval,
} from "date-fns";

export const categoryColors = {
  Groceries: "hsl(120, 55%, 55%)",
  Food: "hsl(25, 85%, 55%)",
  Transport: "hsl(210, 70%, 45%)",
  Utilities: "hsl(45, 90%, 50%)",
  Entertainment: "hsl(270, 65%, 60%)",
  Shopping: "hsl(330, 70%, 60%)",
  Education: "hsl(200, 80%, 50%)",
  Healthcare: "hsl(0, 65%, 55%)",
  Other: "hsl(30, 40%, 65%)"
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