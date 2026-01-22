import React from 'react'
import { AppLayout } from '../components/layouts/AppLayout';

const Dashboard = () => {
  return (
		<AppLayout>
			<div>
				<h2>Welcome back! 👋</h2>
				<p>
					Here's your family's spending overview for{" "}
					{Date.now().toLocaleString()}
				</p>
			</div>
		</AppLayout>
  );
}

export default Dashboard