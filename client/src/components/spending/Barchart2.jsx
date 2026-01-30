import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
const Barchart2 = ({ memberData, categoryData, barChartColors }) => {
  return (
		<div className="h-90 flex flex-col gap-4">
			<ResponsiveContainer width="100%" height="90%">
				<BarChart data={memberData} layout="vertical">
					<CartesianGrid
						strokeDasharray="3 3"
						stroke="hsl(40, 15%, 90%)"
					/>
					<XAxis
						type="number"
						stroke="hsl(var(--muted-foreground))"
						fontSize={12}
						tickFormatter={(value) => `$${value}`}
					/>
					<YAxis
						dataKey="name"
						type="category"
						stroke="hsl(var(--muted-foreground))"
						fontSize={12}
						width={60}
					/>
					<Tooltip
						contentStyle={{
							backgroundColor: "hsl(0, 0%, 100%)",
							border: "1px solid hsl(40, 15%, 90%)",
							borderRadius: "12px",
							boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
						}}
						formatter={(value, cat) => [ `$${value.toFixed(2)}`, cat, ]}
					/>
					{/* Dynamically render bars for each category */}
					{categoryData.map((cat, index) => (
						<Bar
							key={cat.name}
							dataKey={cat.name}
							stackId="a"
							fill={barChartColors[cat.name] || `hsl(${index * 40}, 70%, 60%)`}
							radius={index === categoryData.length - 1? [0, 4, 4, 0]: [0, 0, 0, 0]}
						/>
					))}
				</BarChart>
			</ResponsiveContainer>
			<div className="flex flex-wrap gap-4 justify-center">
				{categoryData.map((cat) => (
					<div key={cat.name} className="flex items-center gap-3">
						<div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
						<div className="flex-1">
							<p className="text-sm font-medium text-foreground">
								{cat.name}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
  );
}

export default Barchart2;

// const memberData = [
// 	{name: "Dad", Food: 4500, Rent: 12000, Travel: 2300, Shopping: 1800,},
// 	{name: "Mom", Food: 3800, Rent: 12000, Travel: 1500, Shopping: 2200,},
// 	{name: "Me", Food: 5200, Rent: 0, Travel: 3200, Shopping: 2600,},
// ];

// const categoryData = [
// 	{ name: "Food" },
// 	{ name: "Rent" },
// 	{ name: "Travel" },
// 	{ name: "Shopping" },
// ];

