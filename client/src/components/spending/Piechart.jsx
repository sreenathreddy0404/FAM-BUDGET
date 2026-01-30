import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const Piechart = ({ categoryData, totalSpending }) => {
return (
    <div className="h-90 flex items-center justify-center gap-8">
        <ResponsiveContainer width="50%" height="100%">
            <PieChart>
                <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={0}
                    outerRadius={80}
                    paddingAngle={0}
                    dataKey="value"
                >
                {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
                </Pie>
                <Tooltip
                    formatter={(value) => [`$${value}`, "spent"]}
                    contentStyle={{
                        backgroundColor: "hsl(0, 0%, 100%)",
                        border: "1px solid hsl(40, 15%, 90%)",
                        borderRadius: "12px",
                    }}
                />
            </PieChart>
        </ResponsiveContainer>
        <div className="flex-1 space-y-3">
            {categoryData.map((cat) => (
                <div key={cat.name} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                    <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">
                            {cat.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            ${Math.round(cat.value)} (
                            {totalSpending > 0 ? Math.round((cat.value / totalSpending) * 100) : "0"}%)
                        </p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
}

export default Piechart