import React from 'react'
import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';

const color = {
    positive:"text-primary",
    negative:"text-red-500",
};
const StatCard = (props) => {
  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-card border border-border rounded-xl p-4 shadow-sm"
    >
        <div className="flex justify-between items-center mb-2">
            <div>
                <h3 className="text-md font-semibold text-foreground">{props.title}</h3>
                <p className="text-xl font-bold mt-2">{props.value}</p>
            </div>
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center mt-4">
                <props.icon className="w-5 h-5 text-primary" />
            </div>
        </div>
        <div className={`text-sm mt-2 ${color[props.changeType] || 'text-muted-foreground'}`}>
            {props.change}
        </div>
    </motion.div>
  )
}

export default StatCard