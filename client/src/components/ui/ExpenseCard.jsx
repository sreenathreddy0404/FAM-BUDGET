import React from 'react'
import { motion } from 'framer-motion';
import { formatDate }  from '../../utils/formatDate';
import { categoryColors,categoryIcons } from '@/utils/usefulFunctions';
import { ShoppingBag } from 'lucide-react';
  
const ExpenseCard = ({ expense, index }) => {
	const Icon = categoryIcons[expense.category] || ShoppingBag;
	const colorClass = categoryColors[expense.category] || "bg-muted text-muted-foreground";
    return (
            <motion.div
                key={expense.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className="flex items-center gap-4 p-3  hover:bg-accent/50 transition-colors border-border border-t-1"
            >
                <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClass}`}
                >
                    <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                        {expense.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {expense.memberId.name} • {formatDate(expense.date)}
                    </p>
                </div>
                <p className="font-semibold text-foreground">
                    -${expense.amount.toFixed(2)}
                </p>
            </motion.div>
    );
}

export default ExpenseCard