import { useState } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "../components/layouts/AppLayout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShoppingBag, Utensils, Car, Zap, Film, Search, Filter,HeartPulse,ShoppingCart,GraduationCap,MoreHorizontal } from "lucide-react";
import { allExpenses,familyMembers } from "@/dummyData/allExpensesData";
import { Input } from "@/components/ui/input";

export const categoryIcons = {
	Groceries: ShoppingCart,
	Dining: Utensils,
	Transport: Car,
	Utilities: Zap,
	Healthcare: HeartPulse,
	Entertainment: Film,
	Shopping: ShoppingBag,
	Education: GraduationCap,
	Other: MoreHorizontal,
};

export const categoryColors = {
	Groceries: "bg-green-100 text-green-600",
	Dining: "bg-orange-100 text-orange-600",
	Transport: "bg-blue-100 text-blue-600",
	Utilities: "bg-yellow-100 text-yellow-700",
	Healthcare: "bg-red-100 text-red-600",
	Entertainment: "bg-purple-100 text-purple-600",
	Shopping: "bg-pink-100 text-pink-600",
	Education: "bg-indigo-100 text-indigo-600",
	Other: "bg-gray-100 text-gray-600",
};



const Expenses = () => {
  const [search, setSearch] = useState("");
  const [memberFilter, setMemberFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredExpenses = allExpenses.filter((expense) => {
    const matchesSearch = expense.name.toLowerCase().includes(search.toLowerCase());
    const matchesMember = memberFilter === "all" || expense.member === memberFilter;
    const matchesCategory = categoryFilter === "all" || expense.category === categoryFilter;
    return matchesSearch && matchesMember && matchesCategory;
  });

  const totalAmount = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            All Expenses
          </h1>
          <p className="text-muted-foreground mt-1">
            View and filter all your family expenses
          </p>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="card-elevated p-4 mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search expenses..."
                className="pl-10"
              />
            </div>
            <Select value={memberFilter} onValueChange={setMemberFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Member" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Members</SelectItem>
                {
                    familyMembers.map((member) => (
                        <SelectItem key={member.name} value={member.name}>
                            {member.avatar} {member.name}
                        </SelectItem>
                    ))
                }
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {
                    Object.keys(categoryIcons).map((category) => {
                        const Icon = categoryIcons[category];
                        return (
                            <SelectItem key={category} value={category}>
                                <Icon className="w-4 h-4 mr-2" /> {category}
                            </SelectItem>
                        );
                    })
                }
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex items-center justify-between mb-6 p-4 rounded-xl bg-accent"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-accent-foreground" />
            <span className="text-sm font-medium text-accent-foreground">
              {filteredExpenses.length} expenses
            </span>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="text-lg font-bold text-accent-foreground">
              ${totalAmount.toFixed(2)}
            </p>
          </div>
        </motion.div>

        {/* Expenses List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="card-elevated divide-y divide-border"
        >
          {filteredExpenses.map((expense, index) => {
            const Icon = categoryIcons[expense.category] || ShoppingBag;
            const colorClass = categoryColors[expense.category] || "bg-muted text-muted-foreground";
            
            return (
              <motion.div
                key={expense.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * index }}
                className="flex items-center gap-4 p-4 hover:bg-accent/30 transition-colors"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClass}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">
                    {expense.name}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{expense.avatar}</span>
                    <span>{expense.member}</span>
                    <span>•</span>
                    <span>{expense.date}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-foreground">
                    -${expense.amount.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {expense.category}
                  </p>
                </div>
              </motion.div>
            );
          })}

          {filteredExpenses.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No expenses found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your filters
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Expenses;
