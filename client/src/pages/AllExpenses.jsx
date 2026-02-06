import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "../components/layouts/AppLayout";
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ShoppingBag, Search, Filter, Trash2, Edit2 } from "lucide-react";
import { allExpenses,familyMembers } from "@/dummyData/allExpensesData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { categories,categoryColors,categoryIcons } from "@/utils/usefulFunctions";
import { getExpenses, updateExpense, deleteExpense } from "@/api/api";
import { useFamily } from "@/context/FamilyContext";
import { formatDate, yyyyMMddFormat } from "../utils/formatDate";
import toast from "react-hot-toast";

const Expenses = () => {
  const [search, setSearch] = useState("");
  const [memberFilter, setMemberFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [allExpenses, setAllExpenses] = useState([]);

  //Edit
  const [isEditOpen,setIsEditOpen] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [memberId,setMemberId] = useState("");
  const [expenseId,setExpenseId] = useState("");

  const { familyMembers } = useFamily();
  useEffect(()=>{
    const fetchData = async ()=>{
      const res = await getExpenses();
      setAllExpenses(res.data.data);
    }
    fetchData();
  },[]);
  const filteredExpenses = allExpenses?.filter((expense) => {
    const matchesSearch = expense.name.toLowerCase().includes(search.toLowerCase());
    const matchesMember = memberFilter === "all" || expense.memberId._id === memberFilter;
    const matchesCategory = categoryFilter === "all" || expense.category === categoryFilter;
    return matchesSearch && matchesMember && matchesCategory;
  }) || [];
  const totalAmount = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  const openEditDialog = (expense)=>{
    setName(expense.name);
    setAmount(expense.amount);
    setCategory(expense.category);
    setDate(yyyyMMddFormat(expense.date));
    setMemberId(expense.memberId._id);
    setExpenseId(expense._id);
    setIsEditOpen(true);
  }
  const handleUpdateExpense = async ()=>{
    if(!name.trim() || !amount || !category || !memberId || !date){
      return toast.error("All Fields are required");
    }

    await updateExpense(expenseId,{name,amount,category,date,memberId});

    toast.success("Expense updated Successfully");
    setIsEditOpen(false);
    return;
  }

  const handleDeleteExpense = async(id)=>{
      if(!confirm("Are you Sure to Delete the expense"))return;
      
      try{
        await deleteExpense(id);
        window.location.reload();
        toast.success("Expense deleted successfully");
      }catch(e){
        toast.error("Failed to delete Expense");
      }
  }

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
                        <SelectItem key={member.name} value={member.id}>
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
            
            return <motion.div
              key={expense._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.05 * index }}
              className="group flex items-center gap-4 p-4 hover:bg-accent transition-colors"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClass}`}>
                <Icon className="w-6 h-6" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">
                  {expense.name}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{expense.memberId.avatar}</span>
                  <span>{expense.memberId.name}</span>
                  <span>•</span>
                  <span>{formatDate(expense.date)}</span>
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

              {/* Hover Actions */}
              <div className="hidden group-hover:flex gap-5 items-center ml-10 transition-all duration-500">
                <Trash2 className="w-5 h-5 text-destructive cursor-pointer" onClick={()=>{handleDeleteExpense(expense._id)}}/>
                <Edit2 className="w-5 h-5 text-gray-500 cursor-pointer" onClick={()=>{openEditDialog(expense)}}/>
              </div>
            </motion.div>
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

        {/* Edit Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Expense</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleUpdateExpense} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="store" className="my-3">Store Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Walmart, Shell Gas Station"
                      className="my-3"
                    />
                  </div>

                  <div>
                    <Label htmlFor="amount">Amount ($)</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      min="0"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="my-3"
                    />
                  </div>

                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="my-3"
                    />
                  </div>

                  <div>
                    <Label>Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="my-3">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => {
                            const IconComponent = categoryIcons[cat.value]
                            return <SelectItem key={cat.value} value={cat.value}>
                                <div className="flex items-center gap-2">
                                  <IconComponent className="w-4 h-4" />
                                  {cat.label}
                                </div>
                            </SelectItem>
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Family Member</Label>
                    <Select value={memberId} onValueChange={setMemberId}>
                      <SelectTrigger className="my-3">
                        <SelectValue placeholder="Select member" />
                      </SelectTrigger>
                      <SelectContent>
                        {familyMembers.map((m) => (
                          <SelectItem key={m.id} value={m.id}>
                            <div className="flex items-center gap-2">
                              <span>{m.avatar}</span>
                              {m.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full btn-gradient-primary"
                >
                  Update Expense
                </Button>
              </form>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default Expenses;
