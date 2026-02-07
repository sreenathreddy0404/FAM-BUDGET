import React from 'react'
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const FamilyMemberCard = ({ member}) => {
  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-card card-elevated p-4"
        key={member.id}
    >
        <div className="flex items-center gap-4 border-border border-b-2">
            <div className='flex items-center gap-2 p-2 '>
                <div className='w-12 h-12 flex items-center justify-center bg-accent rounded-full'>
                    <span className='text-[25px]'>{member.avatar}</span>
                </div>
                <div>
                    <h2 className="text-md font-semibold text-foreground mt-2">{member.name}</h2>
                    <p className='text-muted-foreground text-sm'>{member.lastExpense}</p>
                </div>
            </div>
        </div>
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm text-muted-foreground mt-4">This Month</p>
                <h2 className="text-xl font-bold text-foreground">${member.totalSpent}</h2>
            </div>
            <div className='flex items-center justify-center gap-2'>
                <p>{member.trend == "up" ? <TrendingUp className='w-5 h-5 text-red-600'/>:<TrendingDown className='w-5 h-5 text-green-600'/>}</p>
                <p className= {"font-medium flex items-center" + `${member.trend == "down" ? " text-green-600" : " text-red-600"}`}>
                    {member.trendValue}
                </p>
            </div>
        </div>
    </motion.div>
  )
}

export default FamilyMemberCard