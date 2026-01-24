import React from 'react'
import { AppLayout } from '../components/layouts/AppLayout'
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Edit2, Trash2, TrendingUp, TrendingDown } from "lucide-react";
import { toast } from "react-hot-toast";
import { familyMembersData } from '../dummyData/dashboardData';

const avatarOptions = ["👨", "👩", "👦", "👧", "👴", "👵", "🧑", "👶"];

const FamilyMembers = () => {
  const [members, setMembers] = useState(familyMembersData);
  const [isOpen, setIsOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("👨");

  const handleAddMember = () => {
    if (!newName.trim()) {
      toast.error("Please enter a name");
      return;
    }

    const newMember = {
      id: Date.now().toString(),
      name: newName,
      avatar: selectedAvatar,
      totalSpent: 0,
      trend: "down",
      trendValue: "0%",
    };

    setMembers([...members, newMember]);
    setNewName("");
    setSelectedAvatar("👨");
    setIsOpen(false);
    toast.success(`${newName} has been added to your family!`);
  };

  const handleDeleteMember = (id, name) => {
    const member = members.find((m) => m.id === id);
    if (member && member.totalSpent > 0) {
      toast.error(`Cannot delete ${name} - they have existing expenses`);
      return;
    }
    setMembers(members.filter((m) => m.id !== id));
    toast.success(`${name} has been removed`);
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              Family Members
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your family members and their spending
            </p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <button className="btn-gradient-primary">
                <Plus className="w-4 h-4 mr-2" />
                Add Member
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add Family Member</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 pt-4">
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Enter name"
                    className="mt-2"
                  />
                </div>
                <div>
                  <p>Choose Avatar</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {avatarOptions.map((avatar) => (
                      <button
                        key={avatar}
                        onClick={() => setSelectedAvatar(avatar)}
                        className={`w-12 h-12 rounded-xl text-2xl flex items-center justify-center transition-all ${
                          selectedAvatar === avatar
                            ? "bg-primary ring-2 ring-primary ring-offset-2"
                            : "bg-accent hover:bg-accent/80"
                        }`}
                      >
                        {avatar}
                      </button>
                    ))}
                  </div>
                </div>
                <button onClick={handleAddMember} className="w-full btn-gradient-primary">
                  Add Member
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="card-elevated p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center text-3xl">
                    {member.avatar}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Family Member
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg hover:bg-accent transition-colors">
                    <Edit2 className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button
                    onClick={() => handleDeleteMember(member.id, member.name)}
                    className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </button>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-border grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Total Spent</p>
                  <p className="text-xl font-bold text-foreground">
                    ${member.totalSpent.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Trend</p>
                  <div
                    className={`flex items-center justify-end gap-1 text-lg font-semibold ${
                      member.trend === "up" ? "text-destructive" : "text-success"
                    }`}
                  >
                    {member.trend === "up" ? (
                      <TrendingUp className="w-5 h-5" />
                    ) : (
                      <TrendingDown className="w-5 h-5" />
                    )}
                    {member.trendValue}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {members.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No family members yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Add your first family member to start tracking expenses
            </p>
            <Button onClick={() => setIsOpen(true)} className="btn-gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Member
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default FamilyMembers;
