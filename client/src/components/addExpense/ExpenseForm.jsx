import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { categoryIcons } from '@/utils/usefulFunctions';
import { yyyyMMddFormat } from '@/utils/formatDate';

export default function ExpenseForm({ 
  initialData, 
  familyMembers, 
  categories, 
  onSubmit, 
  onCancel,
  submitButtonText = "Add Expense" 
}) {
  console.log(initialData);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [memberId, setMemberId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with extracted data
  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setAmount(initialData.amount?.toString() || '');
      setDate(yyyyMMddFormat(initialData.date) || '');
      setCategory(initialData.category || '');
      setMemberId(initialData.memberId || '');
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = {
        name: name.trim(),
        amount: parseFloat(amount),
        date,
        category,
        memberId,
      };

      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format date for input field
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    
    try {
      const dateObj = new Date(dateString);
      if (isNaN(dateObj.getTime())) return '';
      
      return dateObj.toISOString().split('T')[0];
    } catch {
      return dateString;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="store">Store Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Walmart, Shell Gas Station"
            className="mt-2"
            required
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
            required
          />
        </div>

        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formatDateForInput(date)}
            onChange={(e) => setDate(e.target.value)}
            className="mt-2"
            required
          />
        </div>

        <div>
          <Label>Category</Label>
          <Select value={category} onValueChange={setCategory} key={category}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => {
                const IconComponent = categoryIcons[cat.value] || Other;
                return (
                  <SelectItem key={cat.value} value={cat.value}>
                    <div className="flex items-center gap-2">
                      <IconComponent className="w-4 h-4" />
                      {cat.label}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Family Member</Label>
          <Select value={memberId} onValueChange={setMemberId} key={memberId}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select member" />
            </SelectTrigger>
            <SelectContent>
              {familyMembers.map((member) => (
                <SelectItem key={member.id} value={member.id}>
                  <div className="flex items-center gap-2">
                    {member.avatar && (
                      <span>{member.avatar}</span>
                    )}
                    <span>{member.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting || !name || !amount || !date || !category || !memberId}
          className="flex-1 btn-gradient-primary"
        >
          {isSubmitting ? 'Processing...' : submitButtonText}
        </Button>
      </div>
    </form>
  );
}