import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layouts/AppLayout";
import { getYearlyData, getMemberData, getCategoryData, chartCategoryColors } from "@/utils/usefulFunctions";
import Areachart from "@/components/spending/Areachart";
import Piechart from "@/components/spending/Piechart";
import Barchart2 from "@/components/spending/Barchart2";
import { getExpensesByYear } from "@/api/api"

const Analytics = () => {
    const [expenses, setExpenses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        const loadExpenses = async () => {
            try {
            setIsLoading(true);
            const res = await getExpensesByYear(currentYear);
            setExpenses(res.data.data);
            } catch (err) {
            console.error(err);
            } finally {
            setIsLoading(false);
            }
        };

        loadExpenses();
    }, []);

    const data = getYearlyData(currentYear, expenses);
    const totalSpending = data.reduce((sum, d) => sum + d.amount, 0);
    const avgMonthly = data.length > 0 ? totalSpending / 12 : 0;
    const maxMonth = data.reduce((max, d) => (d.amount > max.amount ? d : max),{ amount: 0, month: "" });
    const minMonth = data.reduce((min, d) => (d.amount < min.amount && d.amount > 0 ? d : min),{ amount: Infinity, month: "" },);
    const categoryData = getCategoryData(expenses);
    const memberData = getMemberData(expenses);

    if (isLoading) {
		return (
			<AppLayout>
				<div className="card-elevated p-6">
					<div className="animate-pulse space-y-4">
						<div className="h-6 bg-muted rounded w-1/3"></div>
						<div className="h-72 bg-muted rounded"></div>
					</div>
				</div>
			</AppLayout>
		);
	}

    return (
		<AppLayout>
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-2xl lg:text-3xl font-bold text-foreground">
						Analytics
					</h1>
					<p className="text-muted-foreground mt-1">
						Visualize your family's spending patterns
					</p>
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

				<Areachart data={data} />

				{/* Category Breakdown */}
				<Piechart
					categoryData={categoryData}
					totalSpending={totalSpending}
					selectedYear={currentYear}
				/>

				{/* Member Comparison */}

				<Barchart2
					memberData={memberData}
					categoryData={categoryData}
					barChartColors={chartCategoryColors}
					selectedYear={currentYear}
				/>
			</div>
		</AppLayout>
	);
};

export default Analytics;
