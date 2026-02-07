import React from 'react'
import Navbar from '../components/ui/Navbar'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ChevronRight,Users,Receipt,BarChart3,CheckCircle,Wallet } from 'lucide-react';
import { Button } from '../components/ui/button.jsx';
import { benefits } from '../dummyData/dashboardData.js';

const features = [
  {
    icon: Users,
    title: "Family-Centric",
    description: "Track expenses for each family member under one account",
  },
  {
    icon: Receipt,
    title: "Invoice Extraction",
    description: "Upload invoices and auto-extract expense details with OCR",
  },
  {
    icon: BarChart3,
    title: "Smart Analytics",
    description: "Visualize spending patterns with beautiful charts",
  },
];
const LandingPage = () => {
  return (
		<div className="min-h-screen bg-background overflow-hidden">
			<Navbar />

			{/* Hero Section */}
			<section className="relative pt-32 pb-20 px-6">
				{/* Background decorations */}
				<div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
				<div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

				<div className="max-w-6xl mx-auto relative">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center max-w-3xl mx-auto"
					>
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
							Track Your Family's{" "}
							<span className="text-primary">Expenses</span>{" "}
							Together
						</h1>
						<p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
							One account for your entire family. Add expenses
							manually or snap a photo of your invoice. Get
							insights that help you save.
						</p>
						<div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
							<Link to="/dashboard">
								<Button className="btn-gradient-primary">
									Start Tracking Free
									<ChevronRight className="w-5 h-5 ml-2" />
								</Button>
							</Link>
							<Link to="/dashboard">
								<Button variant="outline">
									See Demo Analytics
								</Button>
							</Link>
						</div>
					</motion.div>

					{/* Dashboard Preview */}
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
						className="mt-16 relative"
					>
						<div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
						<div className="card-elevated p-4 md:p-6 overflow-hidden">
							<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
								{[
									{
										label: "This Month",
										value: "$2,700",
										color: "text-primary",
									},
									{
										label: "Avg Daily",
										value: "$89.50",
										color: "text-foreground",
									},
									{
										label: "Transactions",
										value: "47",
										color: "text-foreground",
									},
									{
										label: "Members",
										value: "4",
										color: "text-foreground",
									},
								].map((stat, i) => (
									<motion.div
										key={stat.label}
										initial={{
											opacity: 0,
											x: -20,
											scale: 0.95,
										}}
										animate={{ opacity: 1, x: 0, scale: 1 }}
										transition={{
											duration: 0.4,
											delay: 0.5 + i * 0.1,
										}}
										className="bg-accent/50 rounded-xl p-4 text-center"
									>
										<p className="text-xs text-muted-foreground">
											{stat.label}
										</p>
										<p
											className={`text-xl md:text-2xl font-bold ${stat.color}`}
										>
											{stat.value}
										</p>
									</motion.div>
								))}
							</div>
							<div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
								{["👨 Dad", "👩 Mom", "👦 Alex", "👧 Emma"].map(
									(member, i) => (
										<motion.div
											key={member}
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{
												duration: 0.4,
												delay: 0.7 + i * 0.1,
											}}
											className="bg-card rounded-xl p-4 border border-border text-center"
										>
											<div className="text-2xl mb-2">
												{member.split(" ")[0]}
											</div>
											<p className="text-sm font-medium text-foreground">
												{member.split(" ")[1]}
											</p>
										</motion.div>
									),
								)}
							</div>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-20 px-6 bg-muted/30">
				<div className="max-w-6xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="text-center mb-12"
					>
						<h2 className="text-3xl md:text-4xl font-bold text-foreground">
							Everything You Need
						</h2>
						<p className="mt-4 text-muted-foreground max-w-xl mx-auto">
							A complete expense tracking solution designed for
							families
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{features.map((feature, i) => (
							<motion.div
								key={feature.title}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: i * 0.1 }}
								className="card-interactive p-6 text-center"
							>
								<div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
									<feature.icon className="w-7 h-7 text-primary" />
								</div>
								<h3 className="text-xl font-semibold text-foreground mb-2">
									{feature.title}
								</h3>
								<p className="text-muted-foreground">
									{feature.description}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Benefits Section */}
			<section className="py-20 px-6">
				<div className="max-w-6xl mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5 }}
						>
							<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
								Why Families Love FamBudget
							</h2>
							<div className="space-y-4">
								{benefits.map((benefit, i) => (
									<motion.div
										key={benefit}
										initial={{ opacity: 0, x: -20 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										transition={{
											duration: 0.4,
											delay: i * 0.1,
										}}
										className="flex items-center gap-3"
									>
										<CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
										<span className="text-foreground">
											{benefit}
										</span>
									</motion.div>
								))}
							</div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: 30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="relative"
						>
							<div className="card-elevated p-6">
								<div className="flex items-center gap-4 mb-6">
									<div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center text-3xl">
										👨‍👩‍👧‍👦
									</div>
									<div>
										<h3 className="text-xl font-semibold text-foreground">
											The Johnson Family
										</h3>
										<p className="text-sm text-muted-foreground">
											4 members tracking expenses
										</p>
									</div>
								</div>
								<div className="space-y-3">
									<div className="flex justify-between items-center p-3 rounded-lg bg-accent/50">
										<span className="text-sm text-foreground">
											Monthly Budget
										</span>
										<span className="font-semibold text-foreground">
											$3,500
										</span>
									</div>
									<div className="flex justify-between items-center p-3 rounded-lg bg-accent/50">
										<span className="text-sm text-foreground">
											Spent This Month
										</span>
										<span className="font-semibold text-primary">
											$2,180
										</span>
									</div>
									<div className="flex justify-between items-center p-3 rounded-lg bg-success/10">
										<span className="text-sm text-foreground">
											Remaining
										</span>
										<span className="font-semibold text-success">
											$1,320
										</span>
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 px-6">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="max-w-4xl mx-auto text-center"
				>
					<div className="card-elevated p-12 relative overflow-hidden">
						<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-secondary/5" />
						<div className="relative">
							<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
								Ready to Take Control?
							</h2>
							<p className="text-muted-foreground mb-8 max-w-xl mx-auto">
								Start tracking your family's expenses today.
								It's free, simple, and private.
							</p>
							<Link to="/dashboard">
								<Button
									size="lg"
									className="btn-gradient-primary text-lg px-10 py-6"
								>
									Get Started Now
									<ChevronRight className="w-5 h-5 ml-2" />
								</Button>
							</Link>
						</div>
					</div>
				</motion.div>
			</section>

			{/* Footer */}
			<footer className="py-8 px-6 border-t border-border">
				<div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
					<div className="flex items-center gap-3">
						<div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
							<Wallet className="w-4 h-4 text-primary-foreground" />
						</div>
						<span className="font-semibold text-foreground">
							FamBudget
						</span>
					</div>
					<p className="text-sm text-muted-foreground">
						© 2024 FamBudget. Built for families.
					</p>
				</div>
			</footer>
		</div>
  );
}

export default LandingPage