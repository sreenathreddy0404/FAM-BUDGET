import { motion } from "framer-motion";
import { AppLayout } from "@/components/layouts/AppLayout";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const monthlyData = [
  { month: "Jan", amount: 2400 },
  { month: "Feb", amount: 1398 },
  { month: "Mar", amount: 3800 },
  { month: "Apr", amount: 3908 },
  { month: "May", amount: 2800 },
  { month: "Jun", amount: 3200 },
  { month: "Jul", amount: 2900 },
  { month: "Aug", amount: 3100 },
  { month: "Sep", amount: 2700 },
  { month: "Oct", amount: 3400 },
  { month: "Nov", amount: 2950 },
  { month: "Dec", amount: 3600 },
];

const categoryData = [
  { name: "Shopping", value: 3500, color: "hsl(330, 65%, 70%)" },
  { name: "Food", value: 2800, color: "hsl(25, 90%, 60%)" },
  { name: "Transport", value: 1500, color: "hsl(210, 80%, 60%)" },
  { name: "Utilities", value: 1200, color: "hsl(45, 90%, 55%)" },
  { name: "Entertainment", value: 800, color: "hsl(270, 60%, 65%)" },
];

const memberData = [
  { name: "Dad", Shopping: 1200, Food: 800, Transport: 600, Utilities: 900, Entertainment: 200 },
  { name: "Mom", Shopping: 1500, Food: 1200, Transport: 400, Utilities: 300, Entertainment: 300 },
  { name: "Alex", Shopping: 500, Food: 500, Transport: 400, Utilities: 0, Entertainment: 200 },
  { name: "Emma", Shopping: 300, Food: 300, Transport: 100, Utilities: 0, Entertainment: 100 },
];

const Analytics = () => {
  const totalSpending = categoryData.reduce((sum, cat) => sum + cat.value, 0);

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="stat-card"
          >
            <p className="text-sm text-muted-foreground">Total This Year</p>
            <p className="text-3xl font-bold text-foreground mt-1">$35,158</p>
            <p className="text-sm text-success mt-2">-8% vs last year</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="stat-card"
          >
            <p className="text-sm text-muted-foreground">Monthly Average</p>
            <p className="text-3xl font-bold text-foreground mt-1">$2,930</p>
            <p className="text-sm text-muted-foreground mt-2">Across all members</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="stat-card"
          >
            <p className="text-sm text-muted-foreground">Top Category</p>
            <p className="text-3xl font-bold text-foreground mt-1">Shopping</p>
            <p className="text-sm text-warning mt-2">35% of total</p>
          </motion.div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Yearly Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="card-elevated p-6"
          >
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Yearly Spending Trend
            </h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorAmountYear" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(158, 64%, 40%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(158, 64%, 40%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 15%, 90%)" />
                  <XAxis dataKey="month" stroke="hsl(220, 10%, 45%)" fontSize={12} />
                  <YAxis stroke="hsl(220, 10%, 45%)" fontSize={12} tickFormatter={(value) => `$${value}`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0, 0%, 100%)",
                      border: "1px solid hsl(40, 15%, 90%)",
                      borderRadius: "12px",
                    }}
                    formatter={(value) => [`$${value}`, "Spent"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="hsl(158, 64%, 40%)"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorAmountYear)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
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
            <div className="h-72 flex items-center">
              <ResponsiveContainer width="50%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`$${value}`, ""]}
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
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{cat.name}</p>
                      <p className="text-xs text-muted-foreground">
                        ${cat.value} ({((cat.value / totalSpending) * 100).toFixed(0)}%)
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

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
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={memberData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 15%, 90%)" />
                <XAxis type="number" stroke="hsl(220, 10%, 45%)" fontSize={12} tickFormatter={(value) => `$${value}`} />
                <YAxis dataKey="name" type="category" stroke="hsl(220, 10%, 45%)" fontSize={12} width={60} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(40, 15%, 90%)",
                    borderRadius: "12px",
                  }}
                  formatter={(value) => [`$${value}`, ""]}
                />
                <Legend />
                <Bar dataKey="Shopping" stackId="a" fill="hsl(330, 65%, 70%)" radius={[0, 0, 0, 0]} />
                <Bar dataKey="Food" stackId="a" fill="hsl(25, 90%, 60%)" />
                <Bar dataKey="Transport" stackId="a" fill="hsl(210, 80%, 60%)" />
                <Bar dataKey="Utilities" stackId="a" fill="hsl(45, 90%, 55%)" />
                <Bar dataKey="Entertainment" stackId="a" fill="hsl(270, 60%, 65%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Analytics;
