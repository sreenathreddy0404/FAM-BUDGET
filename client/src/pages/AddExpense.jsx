import { useState } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Receipt, Upload, PenLine } from "lucide-react";
import  toast  from "react-hot-toast";
import { categories, categoryIcons } from "@/utils/usefulFunctions";
import { familyMembers as members } from "@/dummyData/allExpensesData";
import { useFamily } from "@/context/FamilyContext";
import { addExpense } from "@/api/api";
import { UploadInvoice } from "@/components/addExpense/UploadInvoice";

const AddExpense = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [category, setCategory] = useState("");
  const [memberId, setMemberId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { familyMembers, fetchFamilyMembers } = useFamily();

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !amount || !category || !memberId) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    const newExpense = {
      name,
      amount: parseFloat(amount),
      date,
      category,
      memberId
    };

    await addExpense(newExpense);
    await fetchFamilyMembers();
    
    toast.success("Expense added successfully!");
    setName("");
    setAmount("");
    setCategory("");
    setMemberId("");
    setIsSubmitting(false);
  };

  const handleInvoiceUpload = () => {
    toast("Invoice upload feature coming soon! This will use OCR to extract expense data automatically.");
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            Add Expense
          </h1>
          <p className="text-muted-foreground mt-1">
            Record a new expense manually or upload an invoice
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="card-elevated p-6"
        >
          <Tabs defaultValue="manual" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="manual" className="flex items-center gap-2">
                <PenLine className="w-4 h-4" />
                Manual Entry
              </TabsTrigger>
              <TabsTrigger value="invoice" className="flex items-center gap-2">
                <Receipt className="w-4 h-4" />
                Invoice Upload
              </TabsTrigger>
            </TabsList>

            <TabsContent value="manual">
              <form onSubmit={handleManualSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="store">Store Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Walmart, Shell Gas Station"
                      className="mt-2"
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
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="mt-2">
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
                      <SelectTrigger className="mt-2">
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
                  disabled={isSubmitting}
                  className="w-full btn-gradient-primary"
                >
                  {isSubmitting ? "Adding..." : "Add Expense"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="invoice">
              <UploadInvoice/>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default AddExpense;
