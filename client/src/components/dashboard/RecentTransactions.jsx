import React from 'react'
import { motion } from 'framer-motion';
import ExpenseCard from '../ui/ExpenseCard';
import { recentExpensesData as expenses } from '../../dummyData/dashboardData';
import { Link } from 'react-router-dom';

const RecentTransactions = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="card-elevated p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Recent Expenses</h2>
        <Link to="/all-expenses" className="text-sm text-primary font-medium hover:underline">
          View All
        </Link>
      </div>
      <div className="space-y-4">
        {expenses.map((expense, index) => {
          return <ExpenseCard key={expense.id} expense={expense} index={index} />
        })}
      </div>
    </motion.div>
  )
}

export default RecentTransactions