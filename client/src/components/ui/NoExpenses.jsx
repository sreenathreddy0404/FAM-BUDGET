import React from 'react'
import { NotepadText } from 'lucide-react';
import { motion } from 'framer-motion';

const NoExpenses = ({selectedMonth,selectedYear}) => {
  return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			className="card-elevated p-12 flex flex-col items-center justify-center text-center"
		>
			<div className="text-muted-foreground mb-4">
				<NotepadText className="w-10 h-10" />
			</div>
			<h3 className="text-xl font-semibold mb-2">No Expenses Found</h3>
			<p className="text-muted-foreground max-w-md">
				There are no expenses recorded for{" "}
				{selectedMonth} {selectedYear}. Try
				selecting a different month or year.
			</p>
		</motion.div>
  );
}

export default NoExpenses