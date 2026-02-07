import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const Barchart1 = ({data, selectedYear,selectedMonth}) => {
  return (
	<motion.div
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.4, delay: 0.3 }}
		className="card-elevated p-6 mt-5"
	>
		<h2 className="text-lg font-semibold text-foreground mb-6">
			Daily Spending - {selectedMonth} {selectedYear}
		</h2>
		<div className="h-72">
			<ResponsiveContainer width="100%" height="100%">
				<BarChart data={data}>
					<defs>
						<linearGradient id="colorAmount" x1="0" y1="0"x2="0"y2="1">
							<stop offset="5%" stopColor="hsl(158, 64%, 40%)" stopOpacity={0.3} />
							<stop offset="95%" stopColor="hsl(158, 64%, 40%)" stopOpacity={0.1} />
						</linearGradient>
					</defs>
					<CartesianGrid
						strokeDasharray="3 3"
						stroke="hsl(40, 15%, 90%)"
					/>
					<XAxis
						dataKey="day"
						stroke="hsl(220, 10%, 45%)"
						fontSize={11}
						tickLine={false}
						axisLine={false}
					/>
					<YAxis
						stroke="hsl(var(--muted-foreground))"
						fontSize={12}
						tickLine={false}
						axisLine={false}
						tickFormatter={(value, name) => `$${value}`}
					/>
					<Tooltip
						contentStyle={{
							backgroundColor: "hsl(0, 0%, 100%)",
							border: "1px solid hsl(40, 15%, 90%)",
							borderRadius: "12px",
							boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
						}}
						formatter={(value) => [`$${value}`, "Spent"]}
					/>
					<Bar
						dataKey="amount"
						stroke="hsl(158, 64%, 40%)"
						strokeWidth={3}
						fillOpacity={1}
						fill="hsl(158, 64%, 40%)"
						radius={[2, 2, 0, 0]}
					/>
				</BarChart>
			</ResponsiveContainer>
		</div>
	</motion.div>
  );
}

export default Barchart1