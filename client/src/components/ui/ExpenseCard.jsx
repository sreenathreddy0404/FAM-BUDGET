import React from 'react'
import { motion } from 'framer-motion';
import {
	ShoppingCart,
	Utensils,
	Car,
	Zap,
	HeartPulse,
	Film,
	ShoppingBag,
	GraduationCap,
	MoreHorizontal,
} from "lucide-react";

import  formatDate  from '../../utils/formatDate';


export const categoryIcons = {
	GROCERIES: ShoppingCart,
	DINING: Utensils,
	TRANSPORT: Car,
	UTILITIES: Zap,
	HEALTHCARE: HeartPulse,
	ENTERTAINMENT: Film,
	SHOPPING: ShoppingBag,
	EDUCATION: GraduationCap,
	OTHER: MoreHorizontal,
};


export const categoryColors = {
	GROCERIES: "bg-green-100 text-green-600",
	DINING: "bg-orange-100 text-orange-600",
	TRANSPORT: "bg-blue-100 text-blue-600",
	UTILITIES: "bg-yellow-100 text-yellow-700",
	HEALTHCARE: "bg-red-100 text-red-600",
	ENTERTAINMENT: "bg-purple-100 text-purple-600",
	SHOPPING: "bg-pink-100 text-pink-600",
	EDUCATION: "bg-indigo-100 text-indigo-600",
	OTHER: "bg-gray-100 text-gray-600",
};

  
const ExpenseCard = ({ expense, index }) => {
	const Icon = categoryIcons[expense.category.toUpperCase()] || ShoppingBag;
	const colorClass = categoryColors[expense.category.toUpperCase()] || "bg-muted text-muted-foreground";
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